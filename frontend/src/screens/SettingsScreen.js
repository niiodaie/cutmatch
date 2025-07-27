import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Switch,
  Linking 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';

const SettingsScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    notifications: true,
    analytics: true,
    autoSave: true,
    highQuality: false,
    darkMode: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settingsData = await AsyncStorage.getItem('appSettings');
      if (settingsData) {
        setSettings(JSON.parse(settingsData));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('appSettings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  const clearAllData = () => {
    Alert.alert(
      t('settings.clearDataTitle'),
      t('settings.clearDataMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.clear'),
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([
                'favorites',
                'styleNotes',
                'userProfile',
                'appSettings',
              ]);
              Alert.alert(
                t('settings.dataCleared'),
                t('settings.dataClearedMessage')
              );
            } catch (error) {
              console.error('Error clearing data:', error);
            }
          },
        },
      ]
    );
  };

  const exportData = async () => {
    try {
      const keys = ['favorites', 'styleNotes', 'userProfile'];
      const data = await AsyncStorage.multiGet(keys);
      const exportData = {};
      
      data.forEach(([key, value]) => {
        if (value) {
          exportData[key] = JSON.parse(value);
        }
      });

      // In a real app, this would use expo-sharing or similar
      Alert.alert(
        t('settings.exportSuccess'),
        JSON.stringify(exportData, null, 2)
      );
    } catch (error) {
      console.error('Error exporting data:', error);
      Alert.alert(
        t('settings.exportError'),
        t('settings.exportErrorMessage')
      );
    }
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://cutmatch.app/privacy');
  };

  const openTermsOfService = () => {
    Linking.openURL('https://cutmatch.app/terms');
  };

  const openSupport = () => {
    Linking.openURL('mailto:support@cutmatch.app');
  };

  const shareApp = () => {
    // In a real app, this would use expo-sharing
    Alert.alert(
      t('settings.shareApp'),
      'https://cutmatch.app'
    );
  };

  const rateApp = () => {
    // In a real app, this would open the app store
    Alert.alert(
      t('settings.rateApp'),
      t('settings.rateAppMessage')
    );
  };

  const renderSettingItem = (title, description, value, onToggle, icon = '⚙️') => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <View style={styles.settingHeader}>
          <Text style={styles.settingIcon}>{icon}</Text>
          <Text style={styles.settingTitle}>{title}</Text>
        </View>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E5E5EA', true: '#6A0DAD' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
      />
    </View>
  );

  const renderActionItem = (title, description, onPress, icon = '📱', style = {}) => (
    <TouchableOpacity style={[styles.actionItem, style]} onPress={onPress}>
      <View style={styles.actionInfo}>
        <View style={styles.actionHeader}>
          <Text style={styles.actionIcon}>{icon}</Text>
          <Text style={styles.actionTitle}>{title}</Text>
        </View>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
      <Text style={styles.actionArrow}>›</Text>
    </TouchableOpacity>
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
        <Text style={styles.title}>{t('settings.title')}</Text>
        <Text style={styles.subtitle}>{t('settings.subtitle')}</Text>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.appSettings')}</Text>
        
        {renderSettingItem(
          t('settings.notifications'),
          t('settings.notificationsDesc'),
          settings.notifications,
          (value) => updateSetting('notifications', value),
          '🔔'
        )}

        {renderSettingItem(
          t('settings.analytics'),
          t('settings.analyticsDesc'),
          settings.analytics,
          (value) => updateSetting('analytics', value),
          '📊'
        )}

        {renderSettingItem(
          t('settings.autoSave'),
          t('settings.autoSaveDesc'),
          settings.autoSave,
          (value) => updateSetting('autoSave', value),
          '💾'
        )}

        {renderSettingItem(
          t('settings.highQuality'),
          t('settings.highQualityDesc'),
          settings.highQuality,
          (value) => updateSetting('highQuality', value),
          '🎨'
        )}
      </View>

      {/* Language Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
        
        {renderActionItem(
          t('settings.changeLanguage'),
          t('settings.changeLanguageDesc', { current: i18n.language.toUpperCase() }),
          () => navigation.navigate('Profile'),
          '🌐'
        )}
      </View>

      {/* Data Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.dataManagement')}</Text>
        
        {renderActionItem(
          t('settings.exportData'),
          t('settings.exportDataDesc'),
          exportData,
          '📤'
        )}

        {renderActionItem(
          t('settings.clearData'),
          t('settings.clearDataDesc'),
          clearAllData,
          '🗑️',
          styles.dangerAction
        )}
      </View>

      {/* Support & Legal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.supportLegal')}</Text>
        
        {renderActionItem(
          t('settings.privacyPolicy'),
          t('settings.privacyPolicyDesc'),
          openPrivacyPolicy,
          '🔒'
        )}

        {renderActionItem(
          t('settings.termsOfService'),
          t('settings.termsOfServiceDesc'),
          openTermsOfService,
          '📄'
        )}

        {renderActionItem(
          t('settings.contactSupport'),
          t('settings.contactSupportDesc'),
          openSupport,
          '💬'
        )}
      </View>

      {/* App Promotion */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.shareRate')}</Text>
        
        {renderActionItem(
          t('settings.shareApp'),
          t('settings.shareAppDesc'),
          shareApp,
          '📱'
        )}

        {renderActionItem(
          t('settings.rateApp'),
          t('settings.rateAppDesc'),
          rateApp,
          '⭐'
        )}
      </View>

      {/* App Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.appName}>CutMatch</Text>
        <Text style={styles.appVersion}>{t('settings.version')} 1.0.0</Text>
        <Text style={styles.appTagline}>{t('settings.tagline')}</Text>
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
  section: {
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  settingIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2E',
  },
  settingDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 18,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  actionInfo: {
    flex: 1,
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2E',
  },
  actionDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 18,
  },
  actionArrow: {
    fontSize: 20,
    color: '#C7C7CC',
    fontWeight: '300',
  },
  dangerAction: {
    backgroundColor: '#FFF5F5',
  },
  infoContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 10,
  },
  appTagline: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SettingsScreen;

