import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const AnalyzingScreen = ({ navigation, route }) => {
  const { imageUri } = route.params;

  useEffect(() => {
    // Simulate analysis time
    const timer = setTimeout(() => {
      navigation.replace('Suggestions', { imageUri });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, imageUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analyzing Your Face Shape</Text>
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#6A0DAD" />
        </View>
      </View>

      <View style={styles.analysisContainer}>
        <Text style={styles.analysisText}>🔍 Detecting face shape...</Text>
        <Text style={styles.analysisText}>💇 Analyzing hair type...</Text>
        <Text style={styles.analysisText}>🎨 Finding perfect styles...</Text>
      </View>

      <Text style={styles.subtitle}>
        Our AI is analyzing your features to find the perfect hairstyles for you
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(106, 13, 173, 0.3)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysisContainer: {
    marginBottom: 30,
  },
  analysisText: {
    fontSize: 16,
    color: '#6A0DAD',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AnalyzingScreen;

