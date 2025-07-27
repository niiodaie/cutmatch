import React, { useEffect, useRef } from 'react';
import { loadAd, AD_SLOTS, ANALYTICS_CONFIG } from '../utils/analytics';

const AdBanner = ({ 
  slot = 'BANNER_TOP', 
  className = '',
  style = {},
  testMode = false 
}) => {
  const adRef = useRef(null);
  const adSlot = AD_SLOTS[slot] || AD_SLOTS.BANNER_TOP;

  useEffect(() => {
    // Only load ads in production or when explicitly testing
    if (ANALYTICS_CONFIG.DEBUG_MODE && !testMode) {
      return;
    }

    const timer = setTimeout(() => {
      if (adRef.current) {
        loadAd(adSlot);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [adSlot, testMode]);

  // In development mode, show placeholder unless testMode is enabled
  if (ANALYTICS_CONFIG.DEBUG_MODE && !testMode) {
    return (
      <div 
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
        style={{ minHeight: '90px', ...style }}
      >
        <div className="text-center text-gray-500">
          <div className="text-sm font-medium">Ad Placeholder</div>
          <div className="text-xs">Slot: {slot}</div>
          <div className="text-xs mt-1">
            Ads disabled in development
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: adSlot.style.display,
          ...adSlot.style
        }}
        data-ad-client={ANALYTICS_CONFIG.ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot.slot}
        data-ad-format={adSlot.format}
        data-ad-layout-key={adSlot.layoutKey}
        data-full-width-responsive={adSlot.responsive ? 'true' : 'false'}
      />
    </div>
  );
};

// Specific ad components for different placements
export const TopBannerAd = ({ className, style, testMode }) => (
  <AdBanner 
    slot="BANNER_TOP" 
    className={`w-full ${className || ''}`}
    style={style}
    testMode={testMode}
  />
);

export const SidebarAd = ({ className, style, testMode }) => (
  <AdBanner 
    slot="SIDEBAR" 
    className={`w-full ${className || ''}`}
    style={style}
    testMode={testMode}
  />
);

export const MobileBannerAd = ({ className, style, testMode }) => (
  <AdBanner 
    slot="MOBILE_BANNER" 
    className={`w-full md:hidden ${className || ''}`}
    style={style}
    testMode={testMode}
  />
);

export const InFeedAd = ({ className, style, testMode }) => (
  <AdBanner 
    slot="IN_FEED" 
    className={`w-full ${className || ''}`}
    style={style}
    testMode={testMode}
  />
);

export default AdBanner;

