import * as Location from 'expo-location';

// Request location permissions
export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

// Get current location
export const getCurrentLocation = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      throw new Error('Location permission not granted');
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    throw error;
  }
};

// Calculate distance between two coordinates (in kilometers)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// Mock nearby barbers data (in a real app, this would come from Google Places API or similar)
export const getMockNearbyBarbers = (userLocation) => {
  const mockBarbers = [
    {
      id: 1,
      name: "Elite Cuts Barbershop",
      address: "123 Main Street, Downtown",
      rating: 4.8,
      reviewCount: 127,
      latitude: userLocation.latitude + 0.01,
      longitude: userLocation.longitude + 0.01,
      phone: "+1 (555) 123-4567",
      specialties: ["Fades", "Beard Trimming", "Classic Cuts"],
      priceRange: "$$",
    },
    {
      id: 2,
      name: "Modern Style Studio",
      address: "456 Oak Avenue, Midtown",
      rating: 4.6,
      reviewCount: 89,
      latitude: userLocation.latitude - 0.015,
      longitude: userLocation.longitude + 0.02,
      phone: "+1 (555) 234-5678",
      specialties: ["Modern Cuts", "Hair Styling", "Color"],
      priceRange: "$$$",
    },
    {
      id: 3,
      name: "Classic Barber Co.",
      address: "789 Pine Street, Old Town",
      rating: 4.9,
      reviewCount: 203,
      latitude: userLocation.latitude + 0.02,
      longitude: userLocation.longitude - 0.01,
      phone: "+1 (555) 345-6789",
      specialties: ["Traditional Cuts", "Hot Towel Shaves", "Mustache Grooming"],
      priceRange: "$$",
    },
    {
      id: 4,
      name: "Urban Edge Salon",
      address: "321 Elm Street, Arts District",
      rating: 4.7,
      reviewCount: 156,
      latitude: userLocation.latitude - 0.01,
      longitude: userLocation.longitude - 0.015,
      phone: "+1 (555) 456-7890",
      specialties: ["Trendy Cuts", "Hair Art", "Styling"],
      priceRange: "$$$",
    },
    {
      id: 5,
      name: "Neighborhood Cuts",
      address: "654 Maple Drive, Suburbs",
      rating: 4.4,
      reviewCount: 67,
      latitude: userLocation.latitude + 0.025,
      longitude: userLocation.longitude + 0.025,
      phone: "+1 (555) 567-8901",
      specialties: ["Family Cuts", "Kids Haircuts", "Senior Discounts"],
      priceRange: "$",
    },
  ];

  // Calculate distances and sort by proximity
  const barbersWithDistance = mockBarbers.map(barber => ({
    ...barber,
    distance: calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      barber.latitude,
      barber.longitude
    ),
  }));

  return barbersWithDistance.sort((a, b) => a.distance - b.distance);
};

// Get address from coordinates (reverse geocoding)
export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const addresses = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (addresses.length > 0) {
      const address = addresses[0];
      return `${address.street || ''} ${address.city || ''}, ${address.region || ''}`.trim();
    }
    return 'Unknown location';
  } catch (error) {
    console.error('Error getting address:', error);
    return 'Unknown location';
  }
};

