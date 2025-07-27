import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Share,
  Dimensions,
  Switch 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import Button from '../components/Button';

const { width } = Dimensions.get('window');

const StyleDetailScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { style, image, analysisData, fromFavorites } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  
  // Sample pricing data
  const samplePricing = [
    { id: 1, salon: 'Elite Hair Studio', price: '$65-85', distance: '0.3 mi', rating: 4.8 },
    { id: 2, salon: 'Modern Cuts', price: '$45-60', distance: '0.7 mi', rating: 4.5 },
    { id: 3, salon: 'Style Masters', price: '$70-95', distance: '1.2 mi', rating: 4.7 },
  ];
  
  const [productRecommendations] = useState([
    {
      id: 1,
      name: 'Premium Hair Styling Cream',
      price: '$24.99',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Professional Hair Scissors',
      price: '$89.99',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Nourishing Hair Oil',
      price: '$18.99',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
    },
  ]);

  useEffect(() => {
    checkIfFavorite();
    loadNote();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favorites');
      if (favoritesData) {
        const favorites = JSON.parse(favoritesData);
        const isFav = favorites.some(fav => fav.id === style.id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const loadNote = async () => {
    try {
      const notesData = await AsyncStorage.getItem('styleNotes');
      if (notesData) {
        const notes = JSON.parse(notesData);
        if (notes[style.id]) {
          setNote(notes[style.id]);
        }
      }
    } catch (error) {
      console.error('Error loading note:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favorites');
      let favorites = favoritesData ? JSON.parse(favoritesData) : [];

      if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter(fav => fav.id !== style.id);
        setIsFavorite(false);
      } else {
        // Add to favorites
        favorites.push(style);
        setIsFavorite(true);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const saveNote = async () => {
    try {
      const notesData = await AsyncStorage.getItem('styleNotes');
      const notes = notesData ? JSON.parse(notesData) : {};
      
      if (note.trim()) {
        notes[style.id] = note.trim();
      } else {
        delete notes[style.id];
      }
      
      await AsyncStorage.setItem('styleNotes', JSON.stringify(notes));
      setShowNoteInput(false);
      
      Alert.alert(
        t('styleDetail.noteSaved'),
        t('styleDetail.noteSavedMessage')
      );
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const generateShareLink = async () => {
    try {
      // Create a more robust share data structure
      const shareData = {
        styleId: style.id,
        styleName: style.name,
        category: style.category,
        confidence: style.confidence,
        note: note.trim(),
        timestamp: Date.now(),
        version: '1.0',
      };
      
      // Validate share data
      if (!shareData.styleId || !shareData.styleName) {
        throw new Error('Invalid style data for sharing');
      }
      
      // Generate a more secure and readable share link
      const encodedData = btoa(JSON.stringify(shareData));
      const shareId = `${style.id}-${Date.now().toString(36)}`;
      const shareLink = `https://cutmatch.app/style/${shareId}?data=${encodedData}`;
      
      // Validate URL format
      try {
        new URL(shareLink);
      } catch (urlError) {
        throw new Error('Invalid share URL format');
      }
      
      // Track sharing event
      Analytics.styleShared(style.id, style.name, 'link');
      
      const shareMessage = t('styleDetail.shareMessage', { 
        styleName: style.name,
        link: shareLink 
      });
      
      await Share.share({
        message: shareMessage,
        url: shareLink,
        title: t('styleDetail.shareTitle'),
      });
      
      // Log successful share
      console.log('[Share] Link generated successfully:', shareLink);
      
    } catch (error) {
      console.error('Error generating share link:', error);
      
      // Track error
      Analytics.errorOccurred('share_link_generation', error.message, 'StyleDetail');
      
      Alert.alert(
        'Share Error',
        'Unable to generate share link. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const generateQRCode = async () => {
    try {
      // Create QR data with validation
      const qrData = {
        styleId: style.id,
        styleName: style.name,
        category: style.category,
        note: note.trim(),
        instructions: style.stylingTips || [],
        timestamp: Date.now(),
        type: 'cutmatch_style',
      };

      // Validate QR data
      if (!qrData.styleId || !qrData.styleName) {
        throw new Error('Invalid style data for QR generation');
      }

      // Generate QR code URL with proper encoding
      const qrDataString = JSON.stringify(qrData);
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://cutmatch.app/scan/${style.id}?data=${btoa(qrDataString)}`)}`;

      const htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CutMatch Style Reference - ${style.name}</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                padding: 20px; 
                max-width: 600px; 
                margin: 0 auto;
                line-height: 1.6;
              }
              .header { 
                text-align: center; 
                margin-bottom: 30px; 
                border-bottom: 2px solid #6A0DAD;
                padding-bottom: 20px;
              }
              .logo { 
                color: #6A0DAD; 
                font-size: 24px; 
                font-weight: bold; 
                margin-bottom: 10px;
              }
              .style-info { 
                margin-bottom: 20px; 
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
              }
              .qr-container {
                text-align: center;
                margin: 30px 0;
                padding: 20px;
                border: 2px dashed #6A0DAD;
                border-radius: 12px;
              }
              .qr-code { 
                width: 200px; 
                height: 200px; 
                margin: 20px auto; 
                display: block;
              }
              .qr-placeholder { 
                width: 200px; 
                height: 200px; 
                border: 2px solid #6A0DAD; 
                margin: 20px auto; 
                display: flex; 
                align-items: center; 
                justify-content: center;
                font-size: 14px;
                color: #6A0DAD;
                border-radius: 8px;
              }
              .instructions { 
                margin-top: 20px; 
                background: #fff;
                padding: 15px;
                border-left: 4px solid #6A0DAD;
              }
              .note { 
                background: #e8f4fd; 
                padding: 15px; 
                border-radius: 8px; 
                margin-top: 15px;
                border-left: 4px solid #2196F3;
              }
              .detail-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin: 20px 0;
              }
              .detail-item {
                background: #fff;
                padding: 10px;
                border-radius: 6px;
                border: 1px solid #e0e0e0;
              }
              .detail-label {
                font-weight: bold;
                color: #666;
                font-size: 12px;
                text-transform: uppercase;
              }
              .detail-value {
                color: #333;
                font-size: 14px;
                margin-top: 2px;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                color: #666;
                font-size: 12px;
              }
              @media print {
                body { padding: 10px; }
                .qr-container { border: 1px solid #6A0DAD; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">CutMatch</div>
              <h1>${style.name}</h1>
              <p>Style Reference & Instructions</p>
            </div>
            
            <div class="style-info">
              <div class="detail-grid">
                <div class="detail-item">
                  <div class="detail-label">Category</div>
                  <div class="detail-value">${style.category || 'N/A'}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Maintenance</div>
                  <div class="detail-value">${style.maintenance || 'N/A'}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Length</div>
                  <div class="detail-value">${style.length || 'N/A'}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Difficulty</div>
                  <div class="detail-value">${style.difficulty || 'N/A'}</div>
                </div>
              </div>
              ${style.description ? `<p><strong>Description:</strong> ${style.description}</p>` : ''}
            </div>
            
            <div class="qr-container">
              <h3>Scan to View Style</h3>
              <img src="${qrCodeUrl}" alt="QR Code for ${style.name}" class="qr-code" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
              <div class="qr-placeholder" style="display: none;">
                QR Code<br/>
                (${qrData.styleId})
              </div>
              <p style="font-size: 12px; color: #666; margin-top: 10px;">
                Scan with CutMatch app or any QR reader
              </p>
            </div>
            
            ${note ? `<div class="note"><strong>Personal Note:</strong><br/>${note}</div>` : ''}
            
            <div class="instructions">
              <h3>Styling Instructions:</h3>
              ${(style.stylingTips && style.stylingTips.length > 0) ? 
                `<ul>${style.stylingTips.map(tip => `<li>${tip}</li>`).join('')}</ul>` :
                '<p>Ask your stylist to recreate this style based on the reference image.</p>'
              }
            </div>
            
            <div class="footer">
              <p>Generated by CutMatch - Style Before You Snip</p>
              <p>Visit cutmatch.app for more hairstyle inspiration</p>
              <p>Style ID: ${style.id} | Generated: ${new Date().toLocaleDateString()}</p>
            </div>
          </body>
        </html>
      `;

      // Track QR generation
      Analytics.styleShared(style.id, style.name, 'qr_code');

      const { uri } = await Print.printToFileAsync({ 
        html: htmlContent,
        base64: false 
      });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `Share ${style.name} Style Reference`,
        });
      } else {
        Alert.alert(
          t('styleDetail.printGenerated'),
          t('styleDetail.printGeneratedMessage')
        );
      }
      
      console.log('[QR] Generated successfully for style:', style.id);
      
    } catch (error) {
      console.error('Error generating QR code:', error);
      
      // Track error
      Analytics.errorOccurred('qr_generation', error.message, 'StyleDetail');
      
      Alert.alert(
        t('styleDetail.printError'),
        t('styleDetail.printErrorMessage')
      );
    }
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Style Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: style.image }} style={styles.styleImage} />
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Text style={styles.favoriteIcon}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Style Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.styleName}>{style.name}</Text>
        <Text style={styles.styleDescription}>{style.description}</Text>
        
        {style.confidence && (
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceLabel}>{t('styleDetail.confidence')}</Text>
            <Text style={styles.confidenceValue}>
              {Math.round(style.confidence * 100)}%
            </Text>
          </View>
        )}
      </View>

      {/* Style Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>{t('styleDetail.details')}</Text>
        
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{t('styleDetail.category')}</Text>
            <Text style={styles.detailValue}>{style.category}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{t('styleDetail.maintenance')}</Text>
            <Text style={styles.detailValue}>{style.maintenance}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{t('styleDetail.length')}</Text>
            <Text style={styles.detailValue}>{style.length}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{t('styleDetail.difficulty')}</Text>
            <Text style={styles.detailValue}>{style.difficulty}</Text>
          </View>
        </View>
      </View>

      {/* Styling Tips */}
      {style.stylingTips && style.stylingTips.length > 0 && (
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>{t('styleDetail.stylingTips')}</Text>
          {style.stylingTips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Personal Note */}
      <View style={styles.noteContainer}>
        <View style={styles.noteHeader}>
          <Text style={styles.sectionTitle}>{t('styleDetail.personalNote')}</Text>
          <TouchableOpacity 
            onPress={() => setShowNoteInput(!showNoteInput)}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>
              {showNoteInput ? t('common.cancel') : t('common.edit')}
            </Text>
          </TouchableOpacity>
        </View>
        
        {showNoteInput ? (
          <View style={styles.noteInputContainer}>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder={t('styleDetail.notePlaceholder')}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Button
              title={t('styleDetail.saveNote')}
              onPress={saveNote}
              style={styles.saveNoteButton}
            />
          </View>
        ) : (
          <View style={styles.noteDisplay}>
            {note ? (
              <Text style={styles.noteText}>{note}</Text>
            ) : (
              <Text style={styles.noNoteText}>{t('styleDetail.noNote')}</Text>
            )}
          </View>
        )}
      </View>

      {/* Product Recommendations */}
      <View style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>{t('styleDetail.recommendedProducts')}</Text>
        <Text style={styles.productsSubtitle}>{t('styleDetail.productsSubtitle')}</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
          {productRecommendations.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              <Text style={styles.productRating}>⭐ {product.rating}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title={t('styleDetail.shareToSalon')}
          onPress={generateShareLink}
          style={styles.actionButton}
          icon="🔗"
        />
        
        <Button
          title={t('styleDetail.printQR')}
          onPress={generateQRCode}
          style={[styles.actionButton, styles.printButton]}
          icon="🖨️"
        />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <Button
          title={t('styleDetail.tryNewStyle')}
          onPress={() => navigation.navigate('Upload')}
          style={[styles.navButton, styles.secondaryButton]}
          textStyle={styles.secondaryButtonText}
          icon="📷"
        />
        
        <Button
          title={t('styleDetail.viewFavorites')}
          onPress={() => navigation.navigate('Favorites')}
          style={styles.navButton}
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
    paddingBottom: 40,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  styleImage: {
    width: width,
    height: width * 0.8,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  styleName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C2C2E',
    marginBottom: 10,
  },
  styleDescription: {
    fontSize: 16,
    color: '#8E8E93',
    lineHeight: 22,
    marginBottom: 15,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    padding: 10,
    borderRadius: 8,
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#2E7D32',
    marginRight: 8,
  },
  confidenceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C2C2E',
    marginBottom: 15,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2E',
    textTransform: 'capitalize',
  },
  tipsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tipBullet: {
    fontSize: 16,
    color: '#6A0DAD',
    marginRight: 10,
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#2C2C2E',
    flex: 1,
    lineHeight: 20,
  },
  noteContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#6A0DAD',
    borderRadius: 15,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  noteInputContainer: {
    gap: 15,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#F8F9FA',
  },
  saveNoteButton: {
    backgroundColor: '#34C759',
  },
  noteDisplay: {
    minHeight: 50,
    justifyContent: 'center',
  },
  noteText: {
    fontSize: 16,
    color: '#2C2C2E',
    lineHeight: 22,
  },
  noNoteText: {
    fontSize: 16,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
  productsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
  },
  productsSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 15,
  },
  productsScroll: {
    marginHorizontal: -5,
  },
  productCard: {
    width: 120,
    marginHorizontal: 5,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2C2C2E',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 2,
  },
  productRating: {
    fontSize: 12,
    color: '#8E8E93',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    padding: 20,
  },
  actionButton: {
    flex: 1,
  },
  printButton: {
    backgroundColor: '#FF9500',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 20,
  },
  navButton: {
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

export default StyleDetailScreen;

