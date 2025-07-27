import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Animated, 
  Dimensions 
} from 'react-native';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../components/LoadingSpinner';

const { width } = Dimensions.get('window');

const AnalyzingScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { image } = route.params;
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const progressAnim = new Animated.Value(0);
  const pulseAnim = new Animated.Value(1);

  const analysisSteps = [
    t('analyzing.step1'),
    t('analyzing.step2'),
    t('analyzing.step3'),
    t('analyzing.step4'),
    t('analyzing.step5'),
  ];

  useEffect(() => {
    // Simulate AI analysis process
    const analysisTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 20;
        
        // Update current step
        const stepIndex = Math.floor(newProgress / 20) - 1;
        if (stepIndex >= 0 && stepIndex < analysisSteps.length) {
          setCurrentStep(stepIndex);
        }
        
        // Animate progress bar
        Animated.timing(progressAnim, {
          toValue: newProgress / 100,
          duration: 800,
          useNativeDriver: false,
        }).start();
        
        // Complete analysis
        if (newProgress >= 100) {
          clearInterval(analysisTimer);
          setTimeout(() => {
            // Navigate to suggestions with mock data
            navigation.replace('Suggestions', { 
              image,
              analysisData: {
                faceShape: 'oval',
                hairType: 'wavy',
                skinTone: 'medium',
                confidence: 0.92,
              }
            });
          }, 1000);
        }
        
        return newProgress;
      });
    }, 1500);

    // Pulse animation for the image
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => {
      clearInterval(analysisTimer);
      pulseAnimation.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('analyzing.title')}</Text>
        <Text style={styles.subtitle}>{t('analyzing.subtitle')}</Text>
      </View>

      {/* Image with pulse animation */}
      <View style={styles.imageContainer}>
        <Animated.View 
          style={[
            styles.imageWrapper,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <Image source={{ uri: image.uri }} style={styles.analysisImage} />
          <View style={styles.scanOverlay}>
            <LoadingSpinner size="large" color="#FFFFFF" />
          </View>
        </Animated.View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {t('analyzing.progress', { percent: progress })}
        </Text>
        
        <View style={styles.progressBarContainer}>
          <Animated.View 
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        {/* Current Step */}
        <View style={styles.stepContainer}>
          <Text style={styles.stepLabel}>{t('analyzing.currentStep')}</Text>
          <Text style={styles.stepText}>
            {analysisSteps[currentStep] || t('analyzing.step1')}
          </Text>
        </View>
      </View>

      {/* Analysis Features */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>{t('analyzing.featuresTitle')}</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👤</Text>
            <Text style={styles.featureText}>{t('analyzing.feature1')}</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💇</Text>
            <Text style={styles.featureText}>{t('analyzing.feature2')}</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎨</Text>
            <Text style={styles.featureText}>{t('analyzing.feature3')}</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🌍</Text>
            <Text style={styles.featureText}>{t('analyzing.feature4')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2C2E',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  imageWrapper: {
    position: 'relative',
  },
  analysisImage: {
    width: width - 120,
    height: width - 120,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#6A0DAD',
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(106, 13, 173, 0.3)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2E',
    textAlign: 'center',
    marginBottom: 15,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6A0DAD',
    borderRadius: 4,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 5,
  },
  stepText: {
    fontSize: 16,
    color: '#2C2C2E',
    textAlign: 'center',
    fontWeight: '500',
  },
  featuresContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2E',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
  },
});

export default AnalyzingScreen;

