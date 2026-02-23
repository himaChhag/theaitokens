'use client';

import { useReportWebVitals } from 'next/web-vitals';

export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
    }
    
    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // You can send to Google Analytics, Vercel Analytics, etc.
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          custom_map: { metric_id: 'web_vitals' },
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }
    }
  });

  return null;
}