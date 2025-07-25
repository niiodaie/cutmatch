import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';

const DetailScreen = ({ navigation, route }) => {
  const { style, imageUri } = route.params;

  const saveStyle = () => {
    Alert.alert('Style Saved', 'This hairstyle has been saved to your favorites!');
  };

  const shareStyle = () => {
    Alert.alert('Share Style', 'Sharing functionality would be implemented here.');
  };

  const findBarber = () => {
    navigation.navigate('BarberList', { selectedStyle: style });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.userImage} />
        <Image source={{ uri: style.thumbnail }} style={styles.styleImage} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.styleName}>{style.name}</Text>
        <Text style={styles.styleType}>{style.hairType}</Text>
        
        <Text style={styles.description}>{style.description}</Text>

        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Face Shape: Oval</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Hair Type: {style.hairType}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Maintenance: Medium</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={saveStyle}>
            <Text style={styles.actionButtonText}>💾 Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={shareStyle}>
            <Text style={styles.actionButtonText}>📤 Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.primaryButton} onPress={findBarber}>
            <Text style={styles.primaryButtonText}>Find Barber</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Try Another Style</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  styleImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  contentContainer: {
    padding: 20,
  },
  styleName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 5,
  },
  styleType: {
    fontSize: 16,
    color: '#6A0DAD',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 25,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    margin: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 0.3,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 0.35,
  },
  primaryButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6A0DAD',
    paddingVertical: 15,
    borderRadius: 25,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6A0DAD',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DetailScreen;

