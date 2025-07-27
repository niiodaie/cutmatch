import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, ActivityIndicator, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Prevent multiple navigation calls
    if (hasNavigated) return;

    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Initialize app and check authentication
    const initializeApp = async () => {
      try {
        // Simulate app initialization
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check if user has completed onboarding
        const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        
        // For now, always navigate to main app
        // In future, could check authentication status here
        
        setIsLoading(false);
        
        // Add small delay before navigation to ensure smooth transition
        setTimeout(() => {
          if (!hasNavigated) {
            setHasNavigated(true);
            navigation.replace('Main');
          }
        }, 500);
        
      } catch (error) {
        console.warn('Splash screen initialization error:', error);
        setIsLoading(false);
        
        // Navigate anyway to prevent infinite loading
        setTimeout(() => {
          if (!hasNavigated) {
            setHasNavigated(true);
            navigation.replace('Main');
          }
        }, 500);
      }
    };

    initializeApp();

    // Fallback navigation after 5 seconds to prevent infinite loading
    const fallbackTimer = setTimeout(() => {
      if (!hasNavigated) {
        console.warn('Fallback navigation triggered');
        setHasNavigated(true);
        navigation.replace('Main');
      }
    }, 5000);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [navigation, hasNavigated]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* App Logo - will be replaced with actual icon */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoEmoji}>✂️</Text>
        </View>
        
        <Text style={styles.appName}>CutMatch</Text>
        <Text style={styles.tagline}>{t('splash.tagline')}</Text>
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size="small" 
              color="#FFFFFF" 
              style={styles.loadingSpinner}
            />
            <Text style={styles.loadingText}>{t('splash.loading')}</Text>
          </View>
        )}
      </Animated.View>

      <Animated.View style={[styles.bottomContainer, { opacity: fadeAnim }]}>
        <Text style={styles.manifesto}>
          {t('splash.manifesto')}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A0DAD',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 50,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#E6E6FA',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingSpinner: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#E6E6FA',
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    paddingHorizontal: 20,
  },
  manifesto: {
    fontSize: 14,
    color: '#E6E6FA',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default SplashScreen;

