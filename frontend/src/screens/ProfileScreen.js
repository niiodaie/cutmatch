import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Switch 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';

const ProfileScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState({
    skinTone: 'medium',
    hairType: 'wavy',
    preferredLength: 'medium',
    culturalBackground: 'mixed',
    genderExpression: 'neutral',
    language: 'en',
  });
  const [affirmationsEnabled, setAffirmationsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const skinToneOptions = [
    { key: 'light', label: t('profile.skinTone.light'), emoji: '🏻' },
    { key: 'medium-light', label: t('profile.skinTone.mediumLight'), emoji: '🏼' },
    { key: 'medium', label: t('profile.skinTone.medium'), emoji: '🏽' },
    { key: 'medium-dark', label: t('profile.skinTone.mediumDark'), emoji: '🏾' },
    { key: 'dark', label: t('profile.skinTone.dark'), emoji: '🏿' },
  ];

  const hairTypeOptions = [
    { key: 'straight', label: t('profile.hairType.straight'), emoji: '📏' },
    { key: 'wavy', label: t('profile.hairType.wavy'), emoji: '〰️' },
    { key: 'curly', label: t('profile.hairType.curly'), emoji: '🌀' },
    { key: 'coily', label: t('profile.hairType.coily'), emoji: '🔄' },
    { key: 'kinky', label: t('profile.hairType.kinky'), emoji: '🌪️' },
  ];

  const lengthOptions = [
    { key: 'very-short', label: t('profile.length.veryShort'), emoji: '✂️' },
    { key: 'short', label: t('profile.length.short'), emoji: '💇‍♂️' },
    { key: 'medium', label: t('profile.length.medium'), emoji: '💇‍♀️' },
    { key: 'long', label: t('profile.length.long'), emoji: '👩‍🦱' },
    { key: 'very-long', label: t('profile.length.veryLong'), emoji: '👸' },
  ];

  const culturalOptions = [
    { key: 'african', label: t('profile.cultural.african'), emoji: '🌍' },
    { key: 'asian', label: t('profile.cultural.asian'), emoji: '🌏' },
    { key: 'european', label: t('profile.cultural.european'), emoji: '🌎' },
    { key: 'latino', label: t('profile.cultural.latino'), emoji: '🌎' },
    { key: 'middle-eastern', label: t('profile.cultural.middleEastern'), emoji: '🌍' },
    { key: 'mixed', label: t('profile.cultural.mixed'), emoji: '🌐' },
    { key: 'other', label: t('profile.cultural.other'), emoji: '✨' },
  ];

  const genderOptions = [
    { key: 'masculine', label: t('profile.gender.masculine'), emoji: '♂️' },
    { key: 'feminine', label: t('profile.gender.feminine'), emoji: '♀️' },
    { key: 'neutral', label: t('profile.gender.neutral'), emoji: '⚧️' },
    { key: 'fluid', label: t('profile.gender.fluid'), emoji: '🌈' },
  ];

  const languageOptions = [
    { key: 'en', label: 'English', emoji: '🇺🇸' },
    { key: 'es', label: 'Español', emoji: '🇪🇸' },
    { key: 'fr', label: 'Français', emoji: '🇫🇷' },
  ];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profileData = await AsyncStorage.getItem('userProfile');
      const affirmationsData = await AsyncStorage.getItem('affirmationsEnabled');
      
      if (profileData) {
        setProfile(JSON.parse(profileData));
      }
      
      if (affirmationsData !== null) {
        setAffirmationsEnabled(JSON.parse(affirmationsData));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      await AsyncStorage.setItem('affirmationsEnabled', JSON.stringify(affirmationsEnabled));
      
      // Change app language if needed
      if (profile.language !== i18n.language) {
        i18n.changeLanguage(profile.language);
      }
      
      Alert.alert(
        t('profile.saveSuccess'),
        t('profile.saveSuccessMessage')
      );
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert(
        t('profile.saveError'),
        t('profile.saveErrorMessage')
      );
    }
  };

  const updateProfile = (key, value) => {
    setProfile(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetProfile = () => {
    Alert.alert(
      t('profile.resetTitle'),
      t('profile.resetMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.reset'),
          style: 'destructive',
          onPress: () => {
            setProfile({
              skinTone: 'medium',
              hairType: 'wavy',
              preferredLength: 'medium',
              culturalBackground: 'mixed',
              genderExpression: 'neutral',
              language: 'en',
            });
            setAffirmationsEnabled(true);
          },
        },
      ]
    );
  };

  const renderOptionSelector = (title, options, selectedValue, onSelect) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.optionsContainer}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.option,
              selectedValue === option.key && styles.optionSelected
            ]}
            onPress={() => onSelect(option.key)}
          >
            <Text style={styles.optionEmoji}>{option.emoji}</Text>
            <Text style={[
              styles.optionLabel,
              selectedValue === option.key && styles.optionLabelSelected
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('profile.title')}</Text>
        <Text style={styles.subtitle}>{t('profile.subtitle')}</Text>
      </View>

      {/* Profile Sections */}
      {renderOptionSelector(
        t('profile.skinToneTitle'),
        skinToneOptions,
        profile.skinTone,
        (value) => updateProfile('skinTone', value)
      )}

      {renderOptionSelector(
        t('profile.hairTypeTitle'),
        hairTypeOptions,
        profile.hairType,
        (value) => updateProfile('hairType', value)
      )}

      {renderOptionSelector(
        t('profile.lengthTitle'),
        lengthOptions,
        profile.preferredLength,
        (value) => updateProfile('preferredLength', value)
      )}

      {renderOptionSelector(
        t('profile.culturalTitle'),
        culturalOptions,
        profile.culturalBackground,
        (value) => updateProfile('culturalBackground', value)
      )}

      {renderOptionSelector(
        t('profile.genderTitle'),
        genderOptions,
        profile.genderExpression,
        (value) => updateProfile('genderExpression', value)
      )}

      {renderOptionSelector(
        t('profile.languageTitle'),
        languageOptions,
        profile.language,
        (value) => updateProfile('language', value)
      )}

      {/* Affirmations Toggle */}
      <View style={styles.sectionContainer}>
        <View style={styles.toggleContainer}>
          <View style={styles.toggleInfo}>
            <Text style={styles.sectionTitle}>{t('profile.affirmationsTitle')}</Text>
            <Text style={styles.toggleDescription}>{t('profile.affirmationsDescription')}</Text>
          </View>
          <Switch
            value={affirmationsEnabled}
            onValueChange={setAffirmationsEnabled}
            trackColor={{ false: '#E5E5EA', true: '#6A0DAD' }}
            thumbColor={affirmationsEnabled ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title={t('profile.saveProfile')}
          onPress={saveProfile}
          style={styles.saveButton}
          icon="💾"
        />
        
        <Button
          title={t('profile.resetProfile')}
          onPress={resetProfile}
          style={[styles.actionButton, styles.resetButton]}
          textStyle={styles.resetButtonText}
          icon="🔄"
        />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>{t('profile.infoTitle')}</Text>
        <Text style={styles.infoText}>{t('profile.infoText')}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
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
  loadingText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2E',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  option: {
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 80,
  },
  optionSelected: {
    backgroundColor: '#6A0DAD',
  },
  optionEmoji: {
    fontSize: 20,
    marginBottom: 5,
  },
  optionLabel: {
    fontSize: 12,
    color: '#2C2C2E',
    fontWeight: '500',
    textAlign: 'center',
  },
  optionLabelSelected: {
    color: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleInfo: {
    flex: 1,
    marginRight: 15,
  },
  toggleDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 18,
  },
  actionButtons: {
    marginBottom: 25,
  },
  saveButton: {
    backgroundColor: '#34C759',
    marginBottom: 15,
  },
  actionButton: {
    paddingVertical: 12,
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  resetButtonText: {
    color: '#FF3B30',
  },
  infoContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
});

export default ProfileScreen;

