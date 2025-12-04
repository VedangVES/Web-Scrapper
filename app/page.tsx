'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState<'basic' | 'nerd'>('basic');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, mode }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to scrape website');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">WebScraper AI</span>
            </motion.div>
            <Link href="/stats">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm border border-white/20"
              >
                View Stats
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            Intelligent Web Scraping
          </h1>
          <p className="text-xl text-gray-300">
            Powered by Gemini AI for advanced content analysis
          </p>
        </motion.div>

        {/* Scraper Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
          {/* Mode Selection */}
          <div className="flex justify-center space-x-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMode('basic')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                mode === 'basic'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Basic Scrape
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMode('nerd')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                mode === 'nerd'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Nerd Scrape</span>
            </motion.button>
          </div>

          {/* URL Input */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g., https://example.com)"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleScrape()}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrape}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                'Scrape'
              )}
            </motion.button>
          </div>

          {/* Mode Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <p className="text-gray-300 text-sm">
                {mode === 'basic' ? (
                  '📊 Basic mode extracts fundamental information: title, description, text content, and basic metadata.'
                ) : (
                  '🚀 Nerd mode includes AI-powered analysis with Gemini, extracting structured data, performing sentiment analysis, and providing deep insights.'
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mt-6 p-6 bg-red-500/20 border border-red-500/50 rounded-xl backdrop-blur-xl"
            >
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-400 font-semibold mb-1">Error</h3>
                  <p className="text-gray-300">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Display */}
        <AnimatePresence>
          {result && result.status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 space-y-6"
            >
              {/* Success Header */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-green-500/20 border border-green-500/50 rounded-xl backdrop-blur-xl"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-green-400 font-semibold">
                    Successfully scraped website!
                  </h3>
                </div>
              </motion.div>

              {/* Basic Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-4">{result.title}</h2>
                <p className="text-gray-300 mb-6">{result.description}</p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Word Count</p>
                    <p className="text-2xl font-bold text-white">
                      {result.metadata.wordCount.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Images</p>
                    <p className="text-2xl font-bold text-white">
                      {result.metadata.imageCount}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Links</p>
                    <p className="text-2xl font-bold text-white">
                      {result.metadata.linkCount}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Duration</p>
                    <p className="text-2xl font-bold text-white">
                      {(result.metadata.scrapeDuration / 1000).toFixed(2)}s
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Content Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-4">Content Preview</h3>
                <div className="bg-white/5 p-4 rounded-lg max-h-64 overflow-y-auto">
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {result.content.substring(0, 1000)}
                    {result.content.length > 1000 && '...'}
                  </p>
                </div>
              </motion.div>

              {/* AI Analysis - Nerd Mode Only */}
              {mode === 'nerd' && result.aiAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-xl p-6 border border-purple-500/50"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">AI Analysis</h3>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-300 whitespace-pre-wrap">{result.aiAnalysis}</p>
                  </div>
                </motion.div>
              )}

              {/* Extracted Data - Nerd Mode Only */}
              {mode === 'nerd' && result.extractedData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Extracted Data</h3>
                  
                  {/* Headings */}
                  {result.extractedData.headings?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">
                        Headings
                      </h4>
                      <div className="space-y-2">
                        {result.extractedData.headings.slice(0, 10).map((heading: string, i: number) => (
                          <div key={i} className="bg-white/5 p-3 rounded-lg">
                            <p className="text-gray-300">{heading}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Images */}
                  {result.extractedData.images?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">
                        Images ({result.extractedData.images.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {result.extractedData.images.slice(0, 6).map((img: any, i: number) => (
                          <div key={i} className="bg-white/5 p-3 rounded-lg">
                            <p className="text-gray-400 text-sm mb-1">Alt: {img.alt || 'N/A'}</p>
                            <p className="text-gray-300 text-xs truncate">{img.src}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
