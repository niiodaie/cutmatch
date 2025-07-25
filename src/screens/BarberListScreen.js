import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getCurrentLocation, getMockNearbyBarbers } from '../utils/location';
import LoadingSpinner from '../components/LoadingSpinner';

const BarberListScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const { selectedStyle } = route.params || {};

  useEffect(() => {
    loadNearbyBarbers();
  }, []);

  const loadNearbyBarbers = async () => {
    try {
      setLoading(true);
      const location = await getCurrentLocation();
      setUserLocation(location);
      
      const nearbyBarbers = getMockNearbyBarbers(location);
      setBarbers(nearbyBarbers);
    } catch (error) {
      Alert.alert(
        'Location Error',
        'Unable to get your location. Showing default barbers.',
        [{ text: 'OK' }]
      );
      // Show default barbers if location fails
      const defaultLocation = { latitude: 40.7128, longitude: -74.0060 }; // NYC
      const nearbyBarbers = getMockNearbyBarbers(defaultLocation);
      setBarbers(nearbyBarbers);
    } finally {
      setLoading(false);
    }
  };

  const selectBarber = (barber) => {
    navigation.navigate('BarberDetail', { barber, selectedStyle });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner text="Finding nearby barbers..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Barbers</Text>
      <Text style={styles.subtitle}>
        {barbers.length} barbers found near you
      </Text>

      <ScrollView style={styles.barbersList} showsVerticalScrollIndicator={false}>
        {barbers.map((barber) => (
          <TouchableOpacity
            key={barber.id}
            style={styles.barberCard}
            onPress={() => selectBarber(barber)}
          >
            <View style={styles.barberHeader}>
              <Text style={styles.barberName}>{barber.name}</Text>
              <Text style={styles.distance}>{barber.distance} km</Text>
            </View>
            
            <Text style={styles.address}>{barber.address}</Text>
            
            <View style={styles.ratingContainer}>
              <Text style={styles.stars}>{renderStars(barber.rating)}</Text>
              <Text style={styles.rating}>
                {barber.rating} ({barber.reviewCount} reviews)
              </Text>
            </View>

            <View style={styles.specialtiesContainer}>
              {barber.specialties.slice(0, 3).map((specialty, index) => (
                <View key={index} style={styles.specialtyTag}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </View>
              ))}
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceRange}>{barber.priceRange}</Text>
              <Text style={styles.phone}>{barber.phone}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.refreshButton} 
        onPress={loadNearbyBarbers}
      >
        <Text style={styles.refreshButtonText}>🔄 Refresh Location</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  barbersList: {
    flex: 1,
  },
  barberCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  barberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  barberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  distance: {
    fontSize: 14,
    color: '#6A0DAD',
    fontWeight: '600',
  },
  address: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stars: {
    fontSize: 16,
    marginRight: 5,
  },
  rating: {
    fontSize: 14,
    color: '#333333',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  specialtyTag: {
    backgroundColor: '#E8E0FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
  },
  specialtyText: {
    fontSize: 12,
    color: '#6A0DAD',
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRange: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#666666',
  },
  refreshButton: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BarberListScreen;

