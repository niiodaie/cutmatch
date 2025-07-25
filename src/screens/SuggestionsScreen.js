import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getStyleSuggestions } from '../utils/mock-style-engine';
import StyleCard from '../components/StyleCard';

const SuggestionsScreen = ({ navigation, route }) => {
  const { imageUri } = route.params;
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    // Get mock style suggestions
    const mockSuggestions = getStyleSuggestions(imageUri);
    setSuggestions(mockSuggestions);
  }, [imageUri]);

  const selectStyle = (style) => {
    setSelectedStyle(style);
  };

  const viewStyleDetail = () => {
    if (selectedStyle) {
      navigation.navigate('Detail', { style: selectedStyle, imageUri });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRY ON HAIRSTYLES</Text>
      
      <View style={styles.userImageContainer}>
        <Image source={{ uri: imageUri }} style={styles.userImage} />
      </View>

      <ScrollView style={styles.suggestionsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.suggestionsGrid}>
          {suggestions.map((style, index) => (
            <StyleCard
              key={style.id}
              style={style}
              onPress={selectStyle}
              selected={selectedStyle?.id === style.id}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.selectButton, !selectedStyle && styles.disabledButton]} 
        onPress={viewStyleDetail}
        disabled={!selectedStyle}
      >
        <Text style={styles.selectButtonText}>
          {selectedStyle ? 'VIEW STYLE DETAILS' : 'SELECT HAIRSTYLE'}
        </Text>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✂️</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  userImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  suggestionsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectButton: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 18,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
});

export default SuggestionsScreen;

