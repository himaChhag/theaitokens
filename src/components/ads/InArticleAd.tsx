'use client';

import { useEffect } from 'react';

interface InArticleAdProps {
  slot: string;
  className?: string;
}

export default function InArticleAd({ slot, className = '' }: InArticleAdProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_ID) {
    return null;
  }

  return (
    <div className={`ad-container my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout="in-article"
      />
    </div>
  );
}