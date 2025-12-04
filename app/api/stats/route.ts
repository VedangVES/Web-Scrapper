import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { ScrapeStats } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const scrapesRef = collection(db, 'scrapes');
    const q = query(scrapesRef, orderBy('timestamp', 'desc'), limit(100));
    const querySnapshot = await getDocs(q);

    const scrapes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[];

    const successfulScrapes = scrapes.filter((s) => s.status === 'success');
    const failedScrapes = scrapes.filter((s) => s.status === 'error');

    const totalDuration = scrapes.reduce(
      (sum, s) => sum + (s.metadata?.scrapeDuration || 0),
      0
    );

    const totalDataScraped = successfulScrapes.reduce(
      (sum, s) => sum + (s.metadata?.wordCount || 0),
      0
    );

    const stats: ScrapeStats = {
      totalScrapes: scrapes.length,
      successfulScrapes: successfulScrapes.length,
      failedScrapes: failedScrapes.length,
      averageDuration: scrapes.length > 0 ? totalDuration / scrapes.length : 0,
      totalDataScraped,
      recentScrapes: scrapes.slice(0, 10),
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    
    // Return mock data if Firebase is not configured
    const mockStats: ScrapeStats = {
      totalScrapes: 0,
      successfulScrapes: 0,
      failedScrapes: 0,
      averageDuration: 0,
      totalDataScraped: 0,
      recentScrapes: [],
    };

    return NextResponse.json(mockStats);
  }
}
