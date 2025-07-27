import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // Account for padding and gap

const StyleCard = ({ 
  style, 
  onPress, 
  showConfidence = false,
  showFavoriteButton = false,
  isFavorite = false,
  onFavoritePress 
}) => {
  const getMaintenanceColor = (maintenance) => {
    switch (maintenance?.toLowerCase()) {
      case 'low':
        return '#34C759';
      case 'medium':
        return '#FF9500';
      case 'high':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getDifficultyEmoji = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return '😊';
      case 'medium':
        return '🤔';
      case 'hard':
        return '😰';
      default:
        return '⚡';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: style.image }} style={styles.image} />
        
        {/* Confidence Badge */}
        {showConfidence && style.confidence && (
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceText}>
              {Math.round(style.confidence * 100)}%
            </Text>
          </View>
        )}
        
        {/* Favorite Button */}
        {showFavoriteButton && (
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={onFavoritePress}
          >
            <Text style={styles.favoriteIcon}>
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        )}
        
        {/* Difficulty Indicator */}
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyEmoji}>
            {getDifficultyEmoji(style.difficulty)}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{style.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {style.description}
        </Text>
        
        {/* Tags */}
        <View style={styles.tagsContainer}>
          {style.tags && style.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        
        {/* Details Row */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Length</Text>
            <Text style={styles.detailValue}>{style.length}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Care</Text>
            <View style={styles.maintenanceContainer}>
              <View 
                style={[
                  styles.maintenanceDot, 
                  { backgroundColor: getMaintenanceColor(style.maintenance) }
                ]} 
              />
              <Text style={styles.detailValue}>{style.maintenance}</Text>
            </View>
          </View>
        </View>
        
        {/* Cultural Context */}
        {style.culturalContext && style.culturalContext.length > 0 && (
          <View style={styles.culturalContainer}>
            <Text style={styles.culturalText}>
              🌍 {style.culturalContext.slice(0, 2).join(', ')}
            </Text>
          </View>
        )}
        
        {/* Match Reasons */}
        {style.matchReasons && style.matchReasons.length > 0 && (
          <View style={styles.matchContainer}>
            <Text style={styles.matchText} numberOfLines={1}>
              ✨ {style.matchReasons[0]}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
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
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: cardWidth * 0.8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  confidenceBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(52, 199, 89, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  confidenceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 16,
  },
  difficultyBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyEmoji: {
    fontSize: 14,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2E',
    marginBottom: 4,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    color: '#8E8E93',
    lineHeight: 16,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 4,
  },
  tag: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 10,
    color: '#6A0DAD',
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    color: '#8E8E93',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 12,
    color: '#2C2C2E',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  maintenanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maintenanceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  culturalContainer: {
    marginBottom: 6,
  },
  culturalText: {
    fontSize: 10,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
  matchContainer: {
    backgroundColor: '#E8F5E8',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  matchText: {
    fontSize: 10,
    color: '#2E7D32',
    fontWeight: '500',
  },
});

export default StyleCard;

