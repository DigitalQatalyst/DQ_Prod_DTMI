import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const isAdmin = localStorage.getItem('admin_mode') === 'true';
    if (isDev || isAdmin) {
      setIsVisible(true);
      measurePerformance();
    }
  }, []);

  const measurePerformance = () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const m: PerformanceMetrics = {
          pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstContentfulPaint: 0,
          largestContentfulPaint: 0,
          cumulativeLayoutShift: 0,
          firstInputDelay: 0,
        };
        if ('PerformanceObserver' in window) {
          new PerformanceObserver((list) => {
            list.getEntries().forEach((e) => { if (e.name === 'first-contentful-paint') m.firstContentfulPaint = e.startTime; });
          }).observe({ entryTypes: ['paint'] });
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            m.largestContentfulPaint = entries[entries.length - 1].startTime;
          }).observe({ entryTypes: ['largest-contentful-paint'] });
          new PerformanceObserver((list) => {
            let cls = 0;
            list.getEntries().forEach((e: any) => { if (!e.hadRecentInput) cls += e.value; });
            m.cumulativeLayoutShift = cls;
          }).observe({ entryTypes: ['layout-shift'] });
          new PerformanceObserver((list) => {
            list.getEntries().forEach((e: any) => { m.firstInputDelay = e.processingStart - e.startTime; });
          }).observe({ entryTypes: ['first-input'] });
        }
        setMetrics(m);
      }, 1000);
    });
  };

  const getScoreColor = (metric: string, value: number) => {
    const t: Record<string, { good: number; poor: number }> = {
      lcp: { good: 2500, poor: 4000 }, fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 }, fcp: { good: 1800, poor: 3000 },
    };
    if (!t[metric]) return 'text-gray-600';
    return value <= t[metric].good ? 'text-green-600' : value <= t[metric].poor ? 'text-yellow-600' : 'text-red-600';
  };

  if (!isVisible || !metrics) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-xs max-w-xs z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">Performance Metrics</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700">×</button>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between"><span>Page Load:</span><span className="font-mono">{metrics.pageLoadTime.toFixed(0)}ms</span></div>
        <div className="flex justify-between"><span>DOM Ready:</span><span className="font-mono">{metrics.domContentLoaded.toFixed(0)}ms</span></div>
        {metrics.firstContentfulPaint > 0 && <div className="flex justify-between"><span>FCP:</span><span className={`font-mono ${getScoreColor('fcp', metrics.firstContentfulPaint)}`}>{metrics.firstContentfulPaint.toFixed(0)}ms</span></div>}
        {metrics.largestContentfulPaint > 0 && <div className="flex justify-between"><span>LCP:</span><span className={`font-mono ${getScoreColor('lcp', metrics.largestContentfulPaint)}`}>{metrics.largestContentfulPaint.toFixed(0)}ms</span></div>}
        {metrics.cumulativeLayoutShift > 0 && <div className="flex justify-between"><span>CLS:</span><span className={`font-mono ${getScoreColor('cls', metrics.cumulativeLayoutShift)}`}>{metrics.cumulativeLayoutShift.toFixed(3)}</span></div>}
        {metrics.firstInputDelay > 0 && <div className="flex justify-between"><span>FID:</span><span className={`font-mono ${getScoreColor('fid', metrics.firstInputDelay)}`}>{metrics.firstInputDelay.toFixed(0)}ms</span></div>}
      </div>
    </div>
  );
};
