import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StyleCard from '../components/StyleCard';
import Button from '../components/Button';

const FavoritesScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favorites');
      const notesData = await AsyncStorage.getItem('styleNotes');
      
      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
      
      if (notesData) {
        setNotes(JSON.parse(notesData));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (styleId) => {
    Alert.alert(
      t('favorites.removeTitle'),
      t('favorites.removeMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.remove'),
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedFavorites = favorites.filter(style => style.id !== styleId);
              setFavorites(updatedFavorites);
              await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
              
              // Remove associated notes
              const updatedNotes = { ...notes };
              delete updatedNotes[styleId];
              setNotes(updatedNotes);
              await AsyncStorage.setItem('styleNotes', JSON.stringify(updatedNotes));
            } catch (error) {
              console.error('Error removing favorite:', error);
            }
          },
        },
      ]
    );
  };

  const viewStyleDetail = (style) => {
    navigation.navigate('StyleDetail', { 
      style,
      fromFavorites: true,
    });
  };

  const clearAllFavorites = () => {
    Alert.alert(
      t('favorites.clearAllTitle'),
      t('favorites.clearAllMessage'),
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
              setFavorites([]);
              setNotes({});
              await AsyncStorage.removeItem('favorites');
              await AsyncStorage.removeItem('styleNotes');
            } catch (error) {
              console.error('Error clearing favorites:', error);
            }
          },
        },
      ]
    );
  };

  const shareAllFavorites = () => {
    // This would generate a shareable link with all favorites
    Alert.alert(
      t('favorites.shareTitle'),
      t('favorites.shareMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('favorites.generateLink'),
          onPress: () => {
            // Mock sharing functionality
            Alert.alert(
              t('favorites.linkGenerated'),
              'https://cutmatch.app/shared/abc123'
            );
          },
        },
      ]
    );
  };

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
        <Text style={styles.title}>{t('favorites.title')}</Text>
        <Text style={styles.subtitle}>
          {t('favorites.subtitle', { count: favorites.length })}
        </Text>
      </View>

      {favorites.length > 0 ? (
        <>
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              title={t('favorites.shareAll')}
              onPress={shareAllFavorites}
              style={[styles.actionButton, styles.shareButton]}
              icon="🔗"
            />
            <Button
              title={t('favorites.clearAll')}
              onPress={clearAllFavorites}
              style={[styles.actionButton, styles.clearButton]}
              textStyle={styles.clearButtonText}
              icon="🗑️"
            />
          </View>

          {/* Favorites Grid */}
          <View style={styles.favoritesContainer}>
            <View style={styles.stylesGrid}>
              {favorites.map((style, index) => (
                <View key={`${style.id}-${index}`} style={styles.favoriteItem}>
                  <StyleCard
                    style={style}
                    onPress={() => viewStyleDetail(style)}
                    showFavoriteButton={true}
                    isFavorite={true}
                    onFavoritePress={() => removeFavorite(style.id)}
                  />
                  
                  {/* Show note if exists */}
                  {notes[style.id] && (
                    <View style={styles.noteContainer}>
                      <Text style={styles.noteIcon}>📝</Text>
                      <Text style={styles.noteText} numberOfLines={2}>
                        {notes[style.id]}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Tips Section */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>{t('favorites.tipsTitle')}</Text>
            <View style={styles.tipsList}>
              <Text style={styles.tipItem}>• {t('favorites.tip1')}</Text>
              <Text style={styles.tipItem}>• {t('favorites.tip2')}</Text>
              <Text style={styles.tipItem}>• {t('favorites.tip3')}</Text>
            </View>
          </View>
        </>
      ) : (
        /* Empty State */
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>💔</Text>
          <Text style={styles.emptyTitle}>{t('favorites.emptyTitle')}</Text>
          <Text style={styles.emptyMessage}>{t('favorites.emptyMessage')}</Text>
          
          <Button
            title={t('favorites.startExploring')}
            onPress={() => navigation.navigate('Upload')}
            style={styles.exploreButton}
            icon="🔍"
          />
        </View>
      )}
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
    marginBottom: 25,
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
  },
  loadingText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
  },
  shareButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  clearButtonText: {
    color: '#FF3B30',
  },
  favoritesContainer: {
    marginBottom: 25,
  },
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  favoriteItem: {
    width: '48%',
    marginBottom: 15,
  },
  noteContainer: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noteIcon: {
    fontSize: 14,
    marginRight: 6,
    marginTop: 1,
  },
  noteText: {
    fontSize: 12,
    color: '#856404',
    flex: 1,
    lineHeight: 16,
  },
  tipsContainer: {
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
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2E',
    marginBottom: 15,
  },
  tipsList: {
    marginLeft: 10,
  },
  tipItem: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2C2E',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  exploreButton: {
    paddingHorizontal: 40,
    backgroundColor: '#6A0DAD',
  },
});

export default FavoritesScreen;

