import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

// AdMob configuration for CutMatch
const ADMOB_CONFIG = {
  enabled: process.env.EXPO_PUBLIC_ENABLE_ADS !== 'false',
  testMode: process.env.EXPO_PUBLIC_ADMOB_TEST_MODE === 'true' || __DEV__,
  showInDev: process.env.EXPO_PUBLIC_SHOW_ADS_IN_DEV === 'true',
  debug: __DEV__,
};

// AdSense placeholder component for CutMatch
// This will be replaced with actual ad implementation when ready
export default function AdBanner({ 
  size = 'banner', 
  style = {}, 
  onAdLoaded = () => {}, 
  onAdFailedToLoad = () => {},
  testMode = null // Allow override via props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Determine if we should show ads
  const shouldShowAds = ADMOB_CONFIG.enabled && (__DEV__ ? ADMOB_CONFIG.showInDev : true);
  const isTestMode = testMode !== null ? testMode : ADMOB_CONFIG.testMode;

  // Ad sizes configuration
  const adSizes = {
    banner: { width: 320, height: 50 },
    largeBanner: { width: 320, height: 100 },
    mediumRectangle: { width: 300, height: 250 },
    fullBanner: { width: 468, height: 60 },
    leaderboard: { width: 728, height: 90 },
    smartBanner: { width: width - 20, height: 50 },
  };

  const currentSize = adSizes[size] || adSizes.banner;

  useEffect(() => {
    // Log ad configuration in debug mode
    if (ADMOB_CONFIG.debug) {
      console.log('[AdMob] Configuration:', {
        enabled: ADMOB_CONFIG.enabled,
        testMode: isTestMode,
        showInDev: ADMOB_CONFIG.showInDev,
        shouldShowAds,
        isDev: __DEV__,
      });
    }

    // Don't load ads if they shouldn't be shown
    if (!shouldShowAds) {
      return;
    }

    // Simulate ad loading
    const loadAd = () => {
      const loadTime = isTestMode ? 500 : (1000 + Math.random() * 2000);
      
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate for simulation
          setIsLoaded(true);
          onAdLoaded();
          
          if (ADMOB_CONFIG.debug) {
            console.log('[AdMob] Ad loaded successfully');
          }
        } else {
          setHasError(true);
          onAdFailedToLoad('Simulated ad load failure');
          
          if (ADMOB_CONFIG.debug) {
            console.warn('[AdMob] Ad failed to load');
          }
        }
      }, loadTime);
    };

    loadAd();
  }, [shouldShowAds, isTestMode, onAdLoaded, onAdFailedToLoad]);

  const handleAdClick = () => {
    // Simulate ad click tracking
    if (ADMOB_CONFIG.debug) {
      console.log('[AdMob] Ad clicked - tracking event');
    }
    
    // In real implementation, this would:
    // 1. Track the click event with analytics
    // 2. Open the advertiser's content
    // 3. Generate revenue
  };

  // Don't render anything if ads are disabled
  if (!shouldShowAds) {
    return null;
  }

  if (hasError) {
    return (
      <View style={[styles.adContainer, { 
        width: currentSize.width, 
        height: currentSize.height 
      }, style]}>
        <Text style={styles.errorText}>
          {isTestMode ? 'Test ad failed to load' : 'Ad failed to load'}
        </Text>
      </View>
    );
  }

  if (!isLoaded) {
    return (
      <View style={[styles.adContainer, styles.loadingContainer, { 
        width: currentSize.width, 
        height: currentSize.height 
      }, style]}>
        <Text style={styles.loadingText}>
          {isTestMode ? 'Loading test ad...' : 'Loading ad...'}
        </Text>
      </View>
    );
  }

  // Placeholder ad content for testing
  const placeholderAds = [
    {
      title: "Premium Hair Care",
      description: "Professional styling products",
      cta: "Shop Now",
      color: "#FF6B6B"
    },
    {
      title: "Local Hair Salon",
      description: "Book your appointment today",
      cta: "Book Now",
      color: "#4ECDC4"
    },
    {
      title: "Hair Styling Tools",
      description: "Professional grade equipment",
      cta: "Learn More",
      color: "#45B7D1"
    },
    {
      title: "Hair Growth Serum",
      description: "Natural ingredients, proven results",
      cta: "Try Now",
      color: "#96CEB4"
    }
  ];

  const randomAd = placeholderAds[Math.floor(Math.random() * placeholderAds.length)];

  return (
    <TouchableOpacity 
      style={[styles.adContainer, styles.adContent, { 
        width: currentSize.width, 
        height: currentSize.height,
        backgroundColor: randomAd.color 
      }, style]}
      onPress={handleAdClick}
      activeOpacity={0.8}
    >
      <View style={styles.adTextContainer}>
        <Text style={styles.adTitle} numberOfLines={1}>
          {isTestMode ? `[TEST] ${randomAd.title}` : randomAd.title}
        </Text>
        <Text style={styles.adDescription} numberOfLines={2}>
          {randomAd.description}
        </Text>
        <View style={styles.adFooter}>
          <Text style={styles.adCta}>{randomAd.cta}</Text>
          <Text style={styles.adLabel}>
            {isTestMode ? 'Test Ad' : 'Ad'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Higher-order component to conditionally show ads based on user preferences
export function withAdSupport(WrappedComponent, adConfig = {}) {
  return function AdSupportedComponent(props) {
    const [showAds, setShowAds] = useState(true);
    const [userPreferences, setUserPreferences] = useState({});

    useEffect(() => {
      // Load user preferences for ad display
      loadUserAdPreferences();
    }, []);

    const loadUserAdPreferences = async () => {
      try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        const preferences = await AsyncStorage.getItem('userAdPreferences');
        if (preferences) {
          const parsed = JSON.parse(preferences);
          setUserPreferences(parsed);
          setShowAds(parsed.enableAds !== false); // Default to true
        }
      } catch (error) {
        console.warn('Error loading ad preferences:', error);
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <WrappedComponent {...props} />
        {showAds && adConfig.position && (
          <View style={[
            styles.adWrapper,
            adConfig.position === 'top' && styles.adTop,
            adConfig.position === 'bottom' && styles.adBottom,
          ]}>
            <AdBanner 
              size={adConfig.size || 'smartBanner'}
              testMode={ADMOB_CONFIG.testMode}
            />
          </View>
        )}
      </View>
    );
  };
}

// AdMob utility functions
export const AdMobUtils = {
  // Check if ads are enabled
  isEnabled: () => ADMOB_CONFIG.enabled,
  
  // Check if in test mode
  isTestMode: () => ADMOB_CONFIG.testMode,
  
  // Check if ads should show in development
  shouldShowInDev: () => ADMOB_CONFIG.showInDev,
  
  // Disable ads completely
  disable: () => {
    ADMOB_CONFIG.enabled = false;
    if (ADMOB_CONFIG.debug) {
      console.log('[AdMob] Ads disabled');
    }
  },
  
  // Enable test mode (for development)
  enableTestMode: () => {
    ADMOB_CONFIG.testMode = true;
    if (ADMOB_CONFIG.debug) {
      console.log('[AdMob] Test mode enabled');
    }
  },
  
  // Disable test mode (for production)
  disableTestMode: () => {
    ADMOB_CONFIG.testMode = false;
    if (ADMOB_CONFIG.debug) {
      console.log('[AdMob] Test mode disabled');
    }
  },
  
  // Get current configuration
  getConfig: () => ({ ...ADMOB_CONFIG }),
};

const styles = StyleSheet.create({
  adContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    overflow: 'hidden',
    marginVertical: 5,
  },
  loadingContainer: {
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#8E8E93',
    fontSize: 12,
    fontStyle: 'italic',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    textAlign: 'center',
    padding: 10,
  },
  adContent: {
    justifyContent: 'center',
    padding: 10,
  },
  adTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  adTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  adDescription: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
    flex: 1,
  },
  adFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  adCta: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  adLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.7,
    fontWeight: '500',
  },
  adWrapper: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  adTop: {
    paddingTop: 10,
  },
  adBottom: {
    paddingBottom: 10,
  },
});

