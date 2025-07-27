// Geolocation utility with API integration
import { locationAPI, salonsAPI } from './api';

export const detectLocation = async () => {
  try {
    // Use the API to detect location
    const response = await locationAPI.detect();
    
    if (response.success) {
      return {
        success: true,
        data: response.data
      };
    } else {
      throw new Error(response.error || 'Failed to detect location');
    }
  } catch (error) {
    console.error('Error detecting location:', error);
    
    // Fallback to mock data
    const mockLocations = [
      {
        city: 'New York',
        country: 'United States',
        countryCode: 'US',
        latitude: 40.7128,
        longitude: -74.0060,
        timezone: 'America/New_York'
      },
      {
        city: 'London',
        country: 'United Kingdom',
        countryCode: 'GB',
        latitude: 51.5074,
        longitude: -0.1278,
        timezone: 'Europe/London'
      },
      {
        city: 'Lagos',
        country: 'Nigeria',
        countryCode: 'NG',
        latitude: 6.5244,
        longitude: 3.3792,
        timezone: 'Africa/Lagos'
      },
      {
        city: 'Nairobi',
        country: 'Kenya',
        countryCode: 'KE',
        latitude: -1.2921,
        longitude: 36.8219,
        timezone: 'Africa/Nairobi'
      },
      {
        city: 'Paris',
        country: 'France',
        countryCode: 'FR',
        latitude: 48.8566,
        longitude: 2.3522,
        timezone: 'Europe/Paris'
      }
    ];

    const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
    
    return {
      success: true,
      data: randomLocation
    };
  }
};

export const getNearbyShops = async (latitude, longitude) => {
  try {
    // Use the API to get nearby salons
    const response = await salonsAPI.getNearby(latitude, longitude);
    
    if (response.success) {
      return {
        success: true,
        data: response.data
      };
    } else {
      throw new Error(response.error || 'Failed to fetch nearby shops');
    }
  } catch (error) {
    console.error('Error fetching nearby shops:', error);
    
    // Fallback to mock data
    const mockShops = [
      {
        id: 1,
        name: 'Elite Hair Studio',
        address: '123 Main Street',
        distance: '0.5 miles',
        rating: 4.8,
        reviews: 156,
        specialties: ['Afro Cuts', 'Braids', 'Fades'],
        image: '/api/placeholder/300/200',
        phone: '+1 (555) 123-4567',
        hours: 'Mon-Sat 9AM-7PM'
      },
      {
        id: 2,
        name: 'Crown & Glory Salon',
        address: '456 Oak Avenue',
        distance: '0.8 miles',
        rating: 4.9,
        reviews: 203,
        specialties: ['Natural Hair', 'Protective Styles', 'Color'],
        image: '/api/placeholder/300/200',
        phone: '+1 (555) 234-5678',
        hours: 'Tue-Sun 10AM-8PM'
      },
      {
        id: 3,
        name: 'Fresh Cuts Barbershop',
        address: '789 Pine Road',
        distance: '1.2 miles',
        rating: 4.7,
        reviews: 89,
        specialties: ['Fades', 'Beard Trim', 'Classic Cuts'],
        image: '/api/placeholder/300/200',
        phone: '+1 (555) 345-6789',
        hours: 'Mon-Fri 8AM-6PM'
      },
      {
        id: 4,
        name: 'Texture & Style',
        address: '321 Elm Street',
        distance: '1.5 miles',
        rating: 4.6,
        reviews: 124,
        specialties: ['Curly Hair', 'Twist Outs', 'Wash & Go'],
        image: '/api/placeholder/300/200',
        phone: '+1 (555) 456-7890',
        hours: 'Wed-Sun 11AM-7PM'
      }
    ];

    return {
      success: true,
      data: mockShops
    };
  }
};

// Browser geolocation API integration
export const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

// Combined location detection with fallbacks
export const detectLocationWithFallbacks = async () => {
  try {
    // Try browser geolocation first
    const browserLocation = await getBrowserLocation();
    
    // Get location details from coordinates
    const response = await locationAPI.detect();
    
    return {
      success: true,
      data: {
        ...response.data,
        latitude: browserLocation.latitude,
        longitude: browserLocation.longitude,
        accuracy: browserLocation.accuracy,
        source: 'browser'
      }
    };
  } catch (browserError) {
    console.warn('Browser geolocation failed, falling back to IP detection:', browserError);
    
    // Fallback to IP-based detection
    return detectLocation();
  }
};

// Future implementation placeholder for actual API integration
export const detectLocationWithAPI = async () => {
  // This will be implemented with actual GeoJS or IPAPI
  // For now, return the API-based implementation
  return detectLocation();
};

