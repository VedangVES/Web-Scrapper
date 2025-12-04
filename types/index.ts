export interface ScrapeResult {
  id: string;
  url: string;
  title: string;
  description: string;
  content: string;
  extractedData: any;
  aiAnalysis?: string;
  timestamp: number;
  status: 'success' | 'error';
  errorMessage?: string;
  metadata: {
    wordCount: number;
    imageCount: number;
    linkCount: number;
    paragraphCount: number;
    scrapeDuration: number;
  };
}

export interface ScrapeRequest {
  url: string;
  mode: 'basic' | 'nerd';
  customPrompt?: string;
}

export interface ScrapeStats {
  totalScrapes: number;
  successfulScrapes: number;
  failedScrapes: number;
  averageDuration: number;
  totalDataScraped: number;
  recentScrapes: ScrapeResult[];
}
