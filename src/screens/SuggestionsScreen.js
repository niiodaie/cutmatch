import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Alert 
} from 'react-native';
import { useTranslation } from 'react-i18next';

import StyleCard from '../components/StyleCard';
import Button from '../components/Button';
import { mockStyleEngine } from '../utils/mock-style-engine';

const { width } = Dimensions.get('window');

const SuggestionsScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { image, analysisData } = route.params;
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    mood: null,
    event: null,
    season: null,
    hairType: null,
  });

  const filterOptions = {
    mood: [
      { key: 'professional', label: t('filters.mood.professional'), emoji: '💼' },
      { key: 'casual', label: t('filters.mood.casual'), emoji: '😊' },
      { key: 'edgy', label: t('filters.mood.edgy'), emoji: '🔥' },
      { key: 'romantic', label: t('filters.mood.romantic'), emoji: '💕' },
    ],
    event: [
      { key: 'everyday', label: t('filters.event.everyday'), emoji: '🌟' },
      { key: 'wedding', label: t('filters.event.wedding'), emoji: '💒' },
      { key: 'party', label: t('filters.event.party'), emoji: '🎉' },
      { key: 'formal', label: t('filters.event.formal'), emoji: '🎭' },
    ],
    season: [
      { key: 'spring', label: t('filters.season.spring'), emoji: '🌸' },
      { key: 'summer', label: t('filters.season.summer'), emoji: '☀️' },
      { key: 'fall', label: t('filters.season.fall'), emoji: '🍂' },
      { key: 'winter', label: t('filters.season.winter'), emoji: '❄️' },
    ],
    hairType: [
      { key: 'straight', label: t('filters.hairType.straight'), emoji: '📏' },
      { key: 'wavy', label: t('filters.hairType.wavy'), emoji: '〰️' },
      { key: 'curly', label: t('filters.hairType.curly'), emoji: '🌀' },
      { key: 'coily', label: t('filters.hairType.coily'), emoji: '🔄' },
    ],
  };

  useEffect(() => {
    // Get initial suggestions based on analysis data
    const initialSuggestions = mockStyleEngine.getSuggestions(analysisData);
    setSuggestions(initialSuggestions);
  }, [analysisData]);

  const applyFilters = () => {
    const filteredSuggestions = mockStyleEngine.getSuggestionsWithFilters(
      analysisData,
      selectedFilters
    );
    setSuggestions(filteredSuggestions);
  };

  const clearFilters = () => {
    setSelectedFilters({
      mood: null,
      event: null,
      season: null,
      hairType: null,
    });
    const initialSuggestions = mockStyleEngine.getSuggestions(analysisData);
    setSuggestions(initialSuggestions);
  };

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? null : value,
    }));
  };

  const viewStyleDetail = (style) => {
    navigation.navigate('StyleDetail', { 
      style, 
      image, 
      analysisData 
    });
  };

  const regenerateSuggestions = () => {
    const newSuggestions = mockStyleEngine.getRandomSuggestions(analysisData, 5);
    setSuggestions(newSuggestions);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('suggestions.title')}</Text>
        <Text style={styles.subtitle}>
          {t('suggestions.subtitle', { 
            faceShape: analysisData.faceShape,
            confidence: Math.round(analysisData.confidence * 100)
          })}
        </Text>
      </View>

      {/* Filters Section */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>{t('suggestions.filtersTitle')}</Text>
        
        {Object.entries(filterOptions).map(([category, options]) => (
          <View key={category} style={styles.filterCategory}>
            <Text style={styles.filterCategoryTitle}>
              {t(`filters.${category}.title`)}
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.filterOptionsContainer}
            >
              {options.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.filterOption,
                    selectedFilters[category] === option.key && styles.filterOptionSelected
                  ]}
                  onPress={() => toggleFilter(category, option.key)}
                >
                  <Text style={styles.filterEmoji}>{option.emoji}</Text>
                  <Text style={[
                    styles.filterLabel,
                    selectedFilters[category] === option.key && styles.filterLabelSelected
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}

        <View style={styles.filterActions}>
          <Button
            title={t('suggestions.applyFilters')}
            onPress={applyFilters}
            style={styles.filterButton}
          />
          <Button
            title={t('suggestions.clearFilters')}
            onPress={clearFilters}
            style={[styles.filterButton, styles.clearButton]}
            textStyle={styles.clearButtonText}
          />
        </View>
      </View>

      {/* Suggestions Grid */}
      <View style={styles.suggestionsContainer}>
        <View style={styles.suggestionsHeader}>
          <Text style={styles.suggestionsTitle}>
            {t('suggestions.resultsTitle', { count: suggestions.length })}
          </Text>
          <TouchableOpacity onPress={regenerateSuggestions} style={styles.regenerateButton}>
            <Text style={styles.regenerateText}>🔄 {t('suggestions.regenerate')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stylesGrid}>
          {suggestions.map((style, index) => (
            <StyleCard
              key={`${style.id}-${index}`}
              style={style}
              onPress={() => viewStyleDetail(style)}
              showConfidence={true}
            />
          ))}
        </View>

        {suggestions.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsEmoji}>🤔</Text>
            <Text style={styles.noResultsText}>{t('suggestions.noResults')}</Text>
            <Button
              title={t('suggestions.tryDifferentFilters')}
              onPress={clearFilters}
              style={styles.tryAgainButton}
            />
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title={t('suggestions.tryNewPhoto')}
          onPress={() => navigation.navigate('Upload')}
          style={[styles.actionButton, styles.secondaryButton]}
          textStyle={styles.secondaryButtonText}
          icon="📷"
        />
        
        <Button
          title={t('suggestions.viewFavorites')}
          onPress={() => navigation.navigate('Favorites')}
          style={styles.actionButton}
          icon="❤️"
        />
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
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2C2E',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2E',
    marginBottom: 15,
  },
  filterCategory: {
    marginBottom: 15,
  },
  filterCategoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 8,
  },
  filterOptionsContainer: {
    flexDirection: 'row',
  },
  filterOption: {
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  filterOptionSelected: {
    backgroundColor: '#6A0DAD',
  },
  filterEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  filterLabel: {
    fontSize: 12,
    color: '#2C2C2E',
    fontWeight: '500',
  },
  filterLabelSelected: {
    color: '#FFFFFF',
  },
  filterActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
  },
  clearButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  clearButtonText: {
    color: '#8E8E93',
  },
  suggestionsContainer: {
    marginBottom: 25,
  },
  suggestionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2E',
  },
  regenerateButton: {
    padding: 8,
  },
  regenerateText: {
    fontSize: 14,
    color: '#6A0DAD',
    fontWeight: '500',
  },
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  noResultsContainer: {
    alignItems: 'center',
    padding: 40,
  },
  noResultsEmoji: {
    fontSize: 48,
    marginBottom: 15,
  },
  noResultsText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 20,
  },
  tryAgainButton: {
    paddingHorizontal: 30,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6A0DAD',
  },
  secondaryButtonText: {
    color: '#6A0DAD',
  },
});

export default SuggestionsScreen;

