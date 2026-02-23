"use client";

import { useEffect } from 'react';

// Extend Window interface for our custom properties
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    adsbygoogle?: any[];
    adsbygoogle_initialized?: boolean;
  }
}

export default function ClientScripts() {
  useEffect(() => {
    // Google Analytics
    if (process.env.NEXT_PUBLIC_GA_ID && !window.gtag) {
      // Load GA script
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      document.head.appendChild(gaScript);

      // Initialize GA
      const gaInitScript = document.createElement('script');
      gaInitScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
          page_title: document.title,
          page_location: window.location.href,
        });
      `;
      document.head.appendChild(gaInitScript);
    }

    // Google AdSense - only initialize once
    if (process.env.NEXT_PUBLIC_ADSENSE_ID && !window.adsbygoogle_initialized) {
      // Load AdSense script
      const adsenseScript = document.createElement('script');
      adsenseScript.async = true;
      adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`;
      adsenseScript.crossOrigin = 'anonymous';
      document.head.appendChild(adsenseScript);

      // Initialize AdSense only once
      adsenseScript.onload = () => {
        if (!window.adsbygoogle_initialized) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: process.env.NEXT_PUBLIC_ADSENSE_ID,
              enable_page_level_ads: true
            });
            window.adsbygoogle_initialized = true;
          } catch (error) {
            console.warn('AdSense initialization error:', error);
          }
        }
      };
    }
  }, []);

  return null;
}