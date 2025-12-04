'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  TrendingUp,
  Activity,
  Clock,
  Database,
  CheckCircle,
  XCircle,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { ScrapeStats } from '@/types';

export default function StatsPage() {
  const [stats, setStats] = useState<ScrapeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'basic' | 'nerd'>('basic');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const successRate = stats
    ? stats.totalScrapes > 0
      ? ((stats.successfulScrapes / stats.totalScrapes) * 100).toFixed(1)
      : 0
    : 0;

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
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm border border-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Scraper</span>
              </motion.button>
            </Link>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Activity className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">Scrape Statistics</span>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center space-x-4 mb-8"
        >
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
            Basic Stats
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
            <span>Nerd Stats</span>
          </motion.button>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-400" />
                    <span className="text-3xl font-bold text-white">
                      {stats?.totalScrapes || 0}
                    </span>
                  </div>
                  <h3 className="text-gray-300 font-semibold">Total Scrapes</h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <span className="text-3xl font-bold text-white">
                      {successRate}%
                    </span>
                  </div>
                  <h3 className="text-gray-300 font-semibold">Success Rate</h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-8 h-8 text-yellow-400" />
                    <span className="text-3xl font-bold text-white">
                      {stats?.averageDuration
                        ? (stats.averageDuration / 1000).toFixed(2)
                        : 0}
                      s
                    </span>
                  </div>
                  <h3 className="text-gray-300 font-semibold">Avg Duration</h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Database className="w-8 h-8 text-purple-400" />
                    <span className="text-3xl font-bold text-white">
                      {stats?.totalDataScraped
                        ? (stats.totalDataScraped / 1000).toFixed(0)
                        : 0}
                      k
                    </span>
                  </div>
                  <h3 className="text-gray-300 font-semibold">Words Scraped</h3>
                </motion.div>
              </div>

              {/* Detailed Stats - Basic Mode */}
              {mode === 'basic' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Quick Overview
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <h3 className="text-lg font-semibold text-white">
                          Successful Scrapes
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-green-400">
                        {stats?.successfulScrapes || 0}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <h3 className="text-lg font-semibold text-white">
                          Failed Scrapes
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-red-400">
                        {stats?.failedScrapes || 0}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Detailed Stats - Nerd Mode */}
              {mode === 'nerd' && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-xl p-6 border border-purple-500/50"
                  >
                    <div className="flex items-center space-x-2 mb-6">
                      <Sparkles className="w-6 h-6 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">
                        Advanced Analytics
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <h3 className="text-gray-300 mb-2">Performance</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">
                              Fastest Scrape
                            </span>
                            <span className="text-white font-semibold">
                              {stats?.recentScrapes.length
                                ? (
                                    Math.min(
                                      ...stats.recentScrapes
                                        .filter((s) => s.status === 'success')
                                        .map((s) => s.metadata.scrapeDuration)
                                    ) / 1000
                                  ).toFixed(2)
                                : 0}
                              s
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">
                              Slowest Scrape
                            </span>
                            <span className="text-white font-semibold">
                              {stats?.recentScrapes.length
                                ? (
                                    Math.max(
                                      ...stats.recentScrapes
                                        .filter((s) => s.status === 'success')
                                        .map((s) => s.metadata.scrapeDuration)
                                    ) / 1000
                                  ).toFixed(2)
                                : 0}
                              s
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 p-4 rounded-lg">
                        <h3 className="text-gray-300 mb-2">Content Stats</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">
                              Total Images
                            </span>
                            <span className="text-white font-semibold">
                              {stats?.recentScrapes
                                .filter((s) => s.status === 'success')
                                .reduce((sum, s) => sum + s.metadata.imageCount, 0) || 0}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">
                              Total Links
                            </span>
                            <span className="text-white font-semibold">
                              {stats?.recentScrapes
                                .filter((s) => s.status === 'success')
                                .reduce((sum, s) => sum + s.metadata.linkCount, 0) || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 p-4 rounded-lg">
                        <h3 className="text-gray-300 mb-2">Reliability</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Uptime</span>
                            <span className="text-green-400 font-semibold">
                              {successRate}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">
                              Error Rate
                            </span>
                            <span className="text-red-400 font-semibold">
                              {stats?.totalScrapes
                                ? (
                                    (stats.failedScrapes / stats.totalScrapes) *
                                    100
                                  ).toFixed(1)
                                : 0}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Recent Scrapes Table */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Recent Scrapes
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">
                              URL
                            </th>
                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">
                              Status
                            </th>
                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">
                              Words
                            </th>
                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">
                              Duration
                            </th>
                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats?.recentScrapes.slice(0, 5).map((scrape, i) => (
                            <motion.tr
                              key={scrape.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                              <td className="py-3 px-4 text-gray-300 truncate max-w-xs">
                                {scrape.url || 'N/A'}
                              </td>
                              <td className="py-3 px-4">
                                {scrape.status === 'success' ? (
                                  <span className="flex items-center space-x-1 text-green-400">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Success</span>
                                  </span>
                                ) : (
                                  <span className="flex items-center space-x-1 text-red-400">
                                    <XCircle className="w-4 h-4" />
                                    <span>Failed</span>
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-gray-300">
                                {scrape.metadata?.wordCount?.toLocaleString() || 0}
                              </td>
                              <td className="py-3 px-4 text-gray-300">
                                {scrape.metadata?.scrapeDuration
                                  ? (scrape.metadata.scrapeDuration / 1000).toFixed(2)
                                  : 0}
                                s
                              </td>
                              <td className="py-3 px-4 text-gray-300">
                                {scrape.timestamp
                                  ? new Date(scrape.timestamp).toLocaleTimeString()
                                  : 'N/A'}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </>
              )}

              {/* Recent Activity - Both Modes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mode === 'nerd' ? 0.4 : 0.2 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Recent Activity
                </h2>
                {stats?.recentScrapes.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    No scrapes yet. Start scraping to see statistics!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {stats?.recentScrapes.slice(0, mode === 'basic' ? 5 : 3).map((scrape, i) => (
                      <motion.div
                        key={scrape.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold mb-1">
                              {scrape.title || 'Untitled'}
                            </h3>
                            <p className="text-gray-400 text-sm truncate">
                              {scrape.url || 'No URL'}
                            </p>
                          </div>
                          <div className="ml-4">
                            {scrape.status === 'success' ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
