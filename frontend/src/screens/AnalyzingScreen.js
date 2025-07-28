import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Animated, 
  Dimensions,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useTranslation } from 'react-i18next';
import aiService from '../utils/ai-service';
import LoadingSpinner from '../components/LoadingSpinner';

const { width } = Dimensions.get('window');

const AnalyzingScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { image, preferences = {} } = route.params;
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canCancel, setCanCancel] = useState(true);
  
  const progressAnim = new Animated.Value(0);
  const pulseAnim = new Animated.Value(1);

  const analysisSteps = [
    t('analyzing.step1') || 'Uploading your photo...',
    t('analyzing.step2') || 'Analyzing face shape and features...',
    t('analyzing.step3') || 'Generating AI hairstyle recommendations...',
    t('analyzing.step4') || 'Applying cultural and style preferences...',
    t('analyzing.step5') || 'Finalizing your personalized styles...',
  ];

  useEffect(() => {
    startAIGeneration();
    
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
      pulseAnimation.stop();
    };
  }, []);

  const startAIGeneration = async () => {
    setIsGenerating(true);
    setCanCancel(true);

    try {
      // Simulate progress through steps
      let currentStepIndex = 0;
      const progressInterval = setInterval(() => {
        if (currentStepIndex < analysisSteps.length) {
          setCurrentStep(currentStepIndex);
          const newProgress = ((currentStepIndex + 1) / analysisSteps.length) * 100;
          setProgress(newProgress);
          
          // Animate progress bar
          Animated.timing(progressAnim, {
            toValue: newProgress / 100,
            duration: 800,
            useNativeDriver: false,
          }).start();
          
          if (currentStepIndex === 2) { // generating step
            setCanCancel(false); // Don't allow cancel during AI generation
          }
          
          currentStepIndex++;
        } else {
          clearInterval(progressInterval);
        }
      }, 1500);

      // Convert image URI to blob for AI service
      const response = await fetch(image.uri);
      const blob = await response.blob();
      
      // Create file object from blob
      const imageFile = new File([blob], 'user-photo.jpg', { type: 'image/jpeg' });

      // Start AI generation
      const aiResult = await aiService.generateHairstyles(imageFile, preferences);

      clearInterval(progressInterval);
      setProgress(100);
      setIsGenerating(false);

      // Navigate to suggestions with AI results
      setTimeout(() => {
        navigation.replace('Suggestions', {
          image,
          suggestions: aiResult.styles,
          aiGenerated: true,
          metadata: aiResult.metadata,
          analysisData: {
            faceShape: 'oval', // This would come from AI analysis
            hairType: preferences.hairType || 'wavy',
            skinTone: 'medium',
            confidence: 0.92,
          }
        });
      }, 1000);

    } catch (error) {
      setIsGenerating(false);
      console.error('AI Generation failed:', error);
      
      // Show error and fallback to mock suggestions
      Alert.alert(
        t('error.aiGenerationFailed') || 'AI Generation Failed',
        t('error.usingMockSuggestions') || 'Using mock suggestions instead. You can try again later.',
        [
          {
            text: t('common.retry') || 'Retry',
            onPress: () => startAIGeneration()
          },
          {
            text: t('common.continue') || 'Continue',
            onPress: () => {
              // Fallback to mock suggestions
              const mockSuggestions = generateMockSuggestions();
              navigation.replace('Suggestions', {
                image,
                suggestions: mockSuggestions,
                aiGenerated: false,
                analysisData: {
                  faceShape: 'oval',
                  hairType: preferences.hairType || 'wavy',
                  skinTone: 'medium',
                  confidence: 0.85,
                }
              });
            }
          }
        ]
      );
    }
  };

  const generateMockSuggestions = () => {
    // Fallback mock suggestions if AI fails
    return [
      {
        id: 'mock_1',
        name: t('styles.shortAfroFade') || 'Short Afro Fade',
        description: t('styles.shortAfroFadeDesc') || 'A modern take on the classic afro with a clean fade',
        image: 'https://via.placeholder.com/300x300/6A0DAD/FFFFFF?text=Short+Afro+Fade',
        confidence: 0.85,
        category: 'Short',
        maintenance: 'Medium',
        aiGenerated: false
      },
      {
        id: 'mock_2',
        name: t('styles.layeredWaves') || 'Layered Waves',
        description: t('styles.layeredWavesDesc') || 'Flowing waves with layers that add movement',
        image: 'https://via.placeholder.com/300x300/6A0DAD/FFFFFF?text=Layered+Waves',
        confidence: 0.78,
        category: 'Medium',
        maintenance: 'Medium',
        aiGenerated: false
      },
      {
        id: 'mock_3',
        name: t('styles.curlyBob') || 'Curly Bob',
        description: t('styles.curlyBobDesc') || 'A bob cut that celebrates your natural curl pattern',
        image: 'https://via.placeholder.com/300x300/6A0DAD/FFFFFF?text=Curly+Bob',
        confidence: 0.82,
        category: 'Medium',
        maintenance: 'Medium',
        aiGenerated: false
      }
    ];
  };

  const handleCancel = () => {
    if (!canCancel) return;

    Alert.alert(
      t('analyzing.cancelTitle') || 'Cancel Analysis?',
      t('analyzing.cancelMessage') || 'Are you sure you want to cancel the hairstyle analysis?',
      [
        { text: t('common.no') || 'No', style: 'cancel' },
        {
          text: t('common.yes') || 'Yes',
          style: 'destructive',
          onPress: () => {
            aiService.cancelGeneration();
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('analyzing.title') || 'Analyzing Your Photo'}</Text>
        <Text style={styles.subtitle}>{t('analyzing.subtitle') || 'Our AI is creating personalized hairstyle recommendations just for you'}</Text>
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
            <Text style={styles.aiLabel}>CutMatch AI</Text>
          </View>
        </Animated.View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {t('analyzing.progress', { percent: Math.round(progress) }) || `${Math.round(progress)}% Complete`}
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
          <Text style={styles.stepLabel}>{t('analyzing.currentStep') || 'Current Step:'}</Text>
          <Text style={styles.stepText}>
            {analysisSteps[currentStep] || analysisSteps[0]}
          </Text>
        </View>
      </View>

      {/* Analysis Features */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>{t('analyzing.featuresTitle') || 'AI Analysis Features'}</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👤</Text>
            <Text style={styles.featureText}>{t('analyzing.feature1') || 'Face shape detection'}</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💇</Text>
            <Text style={styles.featureText}>{t('analyzing.feature2') || 'Hair type analysis'}</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎨</Text>
            <Text style={styles.featureText}>{t('analyzing.feature3') || 'Style personalization'}</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🌍</Text>
            <Text style={styles.featureText}>{t('analyzing.feature4') || 'Cultural awareness'}</Text>
          </View>
        </View>
      </View>

      {/* Cancel Button */}
      {canCancel && (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>{t('common.cancel') || 'Cancel'}</Text>
        </TouchableOpacity>
      )}
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
  aiLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
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
    marginBottom: 20,
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
  cancelButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AnalyzingScreen;

