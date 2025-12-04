import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { analyzeContent } from '@/lib/gemini';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ScrapeResult } from '@/types';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { url, mode, customPrompt } = await request.json();

    // Validate URL
    if (!url || !isValidUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid URL provided' },
        { status: 400 }
      );
    }

    // Fetch the webpage
    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove script and style elements
    $('script, style, noscript, iframe').remove();

    // Extract basic information
    const title = $('title').text() || $('h1').first().text() || 'No title found';
    const description =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      'No description available';

    // Extract text content
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
    const paragraphs = $('p').map((_, el) => $(el).text().trim()).get();

    // Extract metadata
    const images = $('img').length;
    const links = $('a').length;
    const headings = $('h1, h2, h3, h4, h5, h6')
      .map((_, el) => $(el).text().trim())
      .get();

    // Extract structured data for nerd mode
    let extractedData: any = {
      headings: headings.slice(0, 20),
      links: $('a')
        .map((_, el) => ({
          text: $(el).text().trim(),
          href: $(el).attr('href'),
        }))
        .get()
        .slice(0, 50),
      images: $('img')
        .map((_, el) => ({
          src: $(el).attr('src'),
          alt: $(el).attr('alt'),
        }))
        .get()
        .slice(0, 30),
    };

    let aiAnalysis = undefined;

    // Use Gemini AI for analysis
    if (mode === 'nerd') {
      const analysisPrompt =
        customPrompt ||
        `Analyze this webpage content and provide:
1. Main topic and purpose
2. Key information and insights
3. Content quality assessment
4. Notable patterns or structure
5. Sentiment analysis

Keep the analysis concise but comprehensive.`;

      try {
        aiAnalysis = await analyzeContent(
          bodyText.substring(0, 10000), // Limit content size
          analysisPrompt
        );
      } catch (aiError) {
        console.error('AI analysis failed:', aiError);
        aiAnalysis = 'AI analysis unavailable';
      }
    }

    const scrapeDuration = Date.now() - startTime;

    const scrapeResult: Omit<ScrapeResult, 'id'> = {
      url,
      title,
      description,
      content: bodyText.substring(0, 5000), // Store first 5000 chars
      extractedData,
      aiAnalysis,
      timestamp: Date.now(),
      status: 'success',
      metadata: {
        wordCount: bodyText.split(/\s+/).length,
        imageCount: images,
        linkCount: links,
        paragraphCount: paragraphs.length,
        scrapeDuration,
      },
    };

    // Save to Firebase
    try {
      const docRef = await addDoc(collection(db, 'scrapes'), {
        ...scrapeResult,
        createdAt: serverTimestamp(),
      });

      return NextResponse.json({
        ...scrapeResult,
        id: docRef.id,
      });
    } catch (firebaseError) {
      console.error('Firebase save failed:', firebaseError);
      // Return result even if Firebase fails
      return NextResponse.json({
        ...scrapeResult,
        id: `local-${Date.now()}`,
      });
    }
  } catch (error: any) {
    const scrapeDuration = Date.now() - startTime;

    const errorResult = {
      status: 'error',
      errorMessage: error.message || 'Failed to scrape website',
      timestamp: Date.now(),
      metadata: {
        scrapeDuration,
        wordCount: 0,
        imageCount: 0,
        linkCount: 0,
        paragraphCount: 0,
      },
    };

    // Log error to Firebase
    try {
      await addDoc(collection(db, 'scrapes'), {
        ...errorResult,
        createdAt: serverTimestamp(),
      });
    } catch (firebaseError) {
      console.error('Firebase error logging failed:', firebaseError);
    }

    return NextResponse.json(errorResult, { status: 500 });
  }
}

function isValidUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}
