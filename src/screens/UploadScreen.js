import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert,
  ScrollView,
  Dimensions 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import Button from '../components/Button';

const { width } = Dimensions.get('window');

const UploadScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  // Request camera permissions
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === 'granted');
    return status === 'granted';
  };

  // Take photo with camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        t('upload.permissionTitle'),
        t('upload.cameraPermissionMessage')
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  // Pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        t('upload.permissionTitle'),
        t('upload.galleryPermissionMessage')
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  // Analyze the selected image
  const analyzeImage = () => {
    if (!selectedImage) {
      Alert.alert(t('upload.noImageTitle'), t('upload.noImageMessage'));
      return;
    }

    // Navigate to analyzing screen with the image
    navigation.navigate('Analyzing', { image: selectedImage });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('upload.title')}</Text>
        <Text style={styles.subtitle}>{t('upload.subtitle')}</Text>
      </View>

      {/* Image Preview */}
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderEmoji}>📸</Text>
            <Text style={styles.placeholderText}>{t('upload.placeholder')}</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title={t('upload.takePhoto')}
          onPress={takePhoto}
          style={styles.actionButton}
          icon="📷"
        />
        
        <Button
          title={t('upload.chooseFromGallery')}
          onPress={pickImage}
          style={[styles.actionButton, styles.secondaryButton]}
          textStyle={styles.secondaryButtonText}
          icon="🖼️"
        />
      </View>

      {/* Tips Section */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>{t('upload.tipsTitle')}</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• {t('upload.tip1')}</Text>
          <Text style={styles.tipItem}>• {t('upload.tip2')}</Text>
          <Text style={styles.tipItem}>• {t('upload.tip3')}</Text>
          <Text style={styles.tipItem}>• {t('upload.tip4')}</Text>
        </View>
      </View>

      {/* Analyze Button */}
      {selectedImage && (
        <Button
          title={t('upload.analyzeButton')}
          onPress={analyzeImage}
          style={styles.analyzeButton}
          icon="🧠"
        />
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  previewImage: {
    width: width - 80,
    height: width - 80,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#6A0DAD',
  },
  imagePlaceholder: {
    width: width - 80,
    height: width - 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  placeholderText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  actionButton: {
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6A0DAD',
  },
  secondaryButtonText: {
    color: '#6A0DAD',
  },
  tipsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
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
  analyzeButton: {
    backgroundColor: '#34C759',
    shadowColor: '#34C759',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default UploadScreen;

