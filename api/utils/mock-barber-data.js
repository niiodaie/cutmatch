// Mock barber and salon data for backend API
// This simulates a database of barbershops and salons

const mockBarbers = [
  {
    id: 'barber-001',
    name: 'Elite Cuts Barbershop',
    address: '123 Main Street, Downtown',
    phone: '+1 (555) 123-4567',
    email: 'info@elitecuts.com',
    website: 'https://elitecuts.com',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    },
    rating: 4.8,
    reviewCount: 127,
    priceRange: '$$',
    specialties: ['fades', 'beard-trimming', 'traditional-cuts'],
    services: [
      { name: 'Haircut', price: 35, duration: 45 },
      { name: 'Beard Trim', price: 20, duration: 30 },
      { name: 'Hot Towel Shave', price: 45, duration: 60 }
    ],
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '8:00 AM - 6:00 PM',
      sunday: '10:00 AM - 5:00 PM'
    },
    images: [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop'
    ],
    description: 'Premium barbershop specializing in modern cuts and traditional grooming.',
    amenities: ['wifi', 'parking', 'appointments', 'walk-ins'],
    culturalSpecialties: ['african-american', 'latino', 'universal']
  },
  {
    id: 'barber-002',
    name: 'Natural Hair Studio',
    address: '456 Oak Avenue, Midtown',
    phone: '+1 (555) 234-5678',
    email: 'hello@naturalhair.com',
    website: 'https://naturalhair.com',
    coordinates: {
      lat: 40.7589,
      lng: -73.9851
    },
    rating: 4.9,
    reviewCount: 89,
    priceRange: '$$$',
    specialties: ['natural-hair', 'locs', 'braids', 'protective-styles'],
    services: [
      { name: 'Natural Hair Cut', price: 65, duration: 90 },
      { name: 'Loc Maintenance', price: 80, duration: 120 },
      { name: 'Protective Braids', price: 150, duration: 240 }
    ],
    hours: {
      monday: 'Closed',
      tuesday: '10:00 AM - 6:00 PM',
      wednesday: '10:00 AM - 6:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '11:00 AM - 5:00 PM'
    },
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop'
    ],
    description: 'Specialized salon for natural hair care and protective styling.',
    amenities: ['wifi', 'refreshments', 'appointments-only', 'consultation'],
    culturalSpecialties: ['african-american', 'afro-caribbean', 'mixed-heritage']
  },
  {
    id: 'barber-003',
    name: 'Classic Gentleman\'s Club',
    address: '789 Pine Street, Uptown',
    phone: '+1 (555) 345-6789',
    email: 'contact@classicgents.com',
    website: 'https://classicgents.com',
    coordinates: {
      lat: 40.7831,
      lng: -73.9712
    },
    rating: 4.6,
    reviewCount: 203,
    priceRange: '$$$$',
    specialties: ['classic-cuts', 'straight-razor', 'luxury-grooming'],
    services: [
      { name: 'Gentleman\'s Cut', price: 75, duration: 60 },
      { name: 'Straight Razor Shave', price: 60, duration: 45 },
      { name: 'Full Grooming Package', price: 120, duration: 90 }
    ],
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 7:00 PM',
      friday: '8:00 AM - 7:00 PM',
      saturday: '8:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    images: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop'
    ],
    description: 'Luxury barbershop offering traditional grooming in an upscale environment.',
    amenities: ['valet', 'bar', 'appointments', 'concierge'],
    culturalSpecialties: ['european', 'universal']
  },
  {
    id: 'barber-004',
    name: 'Urban Style Salon',
    address: '321 Broadway, Fashion District',
    phone: '+1 (555) 456-7890',
    email: 'info@urbanstyle.com',
    website: 'https://urbanstyle.com',
    coordinates: {
      lat: 40.7505,
      lng: -73.9934
    },
    rating: 4.7,
    reviewCount: 156,
    priceRange: '$$$',
    specialties: ['modern-cuts', 'color', 'styling', 'unisex'],
    services: [
      { name: 'Modern Cut & Style', price: 85, duration: 75 },
      { name: 'Color Treatment', price: 120, duration: 120 },
      { name: 'Wash & Blow Dry', price: 45, duration: 45 }
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '8:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM'
    },
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop'
    ],
    description: 'Trendy unisex salon specializing in modern cuts and color.',
    amenities: ['wifi', 'music', 'appointments', 'walk-ins', 'products'],
    culturalSpecialties: ['universal', 'lgbtq-friendly']
  },
  {
    id: 'barber-005',
    name: 'Heritage Barbershop',
    address: '654 Heritage Lane, Historic District',
    phone: '+1 (555) 567-8901',
    email: 'heritage@barbershop.com',
    website: 'https://heritagebarbershop.com',
    coordinates: {
      lat: 40.7282,
      lng: -74.0776
    },
    rating: 4.5,
    reviewCount: 98,
    priceRange: '$$',
    specialties: ['traditional-cuts', 'family-friendly', 'vintage-style'],
    services: [
      { name: 'Classic Haircut', price: 30, duration: 40 },
      { name: 'Father & Son Cut', price: 50, duration: 60 },
      { name: 'Vintage Style', price: 40, duration: 50 }
    ],
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 7:00 PM',
      friday: '8:00 AM - 7:00 PM',
      saturday: '7:00 AM - 5:00 PM',
      sunday: '9:00 AM - 4:00 PM'
    },
    images: [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop'
    ],
    description: 'Family-owned barbershop serving the community for over 30 years.',
    amenities: ['parking', 'family-friendly', 'walk-ins', 'cash-only'],
    culturalSpecialties: ['universal', 'family-oriented']
  }
];

class MockBarberData {
  constructor() {
    this.barbers = mockBarbers;
  }

  // Calculate distance between two coordinates (Haversine formula)
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI/180);
  }

  // Get nearby barbers based on location
  getNearbyBarbers(lat, lng, radiusMiles = 10, limit = 20) {
    const barbersWithDistance = this.barbers.map(barber => ({
      ...barber,
      distance: this.calculateDistance(
        lat, lng, 
        barber.coordinates.lat, 
        barber.coordinates.lng
      )
    }));

    // Filter by radius and sort by distance
    const nearbyBarbers = barbersWithDistance
      .filter(barber => barber.distance <= radiusMiles)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    return nearbyBarbers.map(barber => ({
      ...barber,
      distance: Math.round(barber.distance * 10) / 10 // Round to 1 decimal
    }));
  }

  // Get barber by ID
  getBarberById(id) {
    return this.barbers.find(barber => barber.id === id);
  }

  // Search barbers by name or specialties
  searchBarbers(query) {
    const searchTerm = query.toLowerCase();
    
    return this.barbers.filter(barber => 
      barber.name.toLowerCase().includes(searchTerm) ||
      barber.description.toLowerCase().includes(searchTerm) ||
      barber.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm)
      ) ||
      barber.culturalSpecialties.some(cultural => 
        cultural.toLowerCase().includes(searchTerm)
      )
    );
  }

  // Filter barbers by location
  filterByLocation(barbers, lat, lng, radiusMiles) {
    return barbers.filter(barber => {
      const distance = this.calculateDistance(
        lat, lng,
        barber.coordinates.lat,
        barber.coordinates.lng
      );
      return distance <= radiusMiles;
    });
  }

  // Get barbers by specialty
  getBarbersBySpecialty(specialty) {
    return this.barbers.filter(barber => 
      barber.specialties.includes(specialty.toLowerCase()) ||
      barber.culturalSpecialties.includes(specialty.toLowerCase())
    );
  }

  // Get barbers by price range
  getBarbersByPriceRange(priceRange) {
    return this.barbers.filter(barber => barber.priceRange === priceRange);
  }

  // Get barbers by rating
  getBarbersByRating(minRating = 4.0) {
    return this.barbers.filter(barber => barber.rating >= minRating);
  }

  // Get all barbers
  getAllBarbers() {
    return this.barbers;
  }

  // Get random featured barbers
  getFeaturedBarbers(count = 3) {
    const shuffled = [...this.barbers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Get barbers open now (mock implementation)
  getBarbersOpenNow() {
    // This would check actual hours against current time
    // For now, return a random subset
    return this.barbers.filter(() => Math.random() > 0.3);
  }

  // Add a new barber (for testing)
  addBarber(barberData) {
    const newBarber = {
      id: `barber-${Date.now()}`,
      ...barberData,
      rating: 0,
      reviewCount: 0
    };
    this.barbers.push(newBarber);
    return newBarber;
  }

  // Update barber data
  updateBarber(id, updates) {
    const index = this.barbers.findIndex(barber => barber.id === id);
    if (index !== -1) {
      this.barbers[index] = { ...this.barbers[index], ...updates };
      return this.barbers[index];
    }
    return null;
  }

  // Get statistics
  getStatistics() {
    return {
      totalBarbers: this.barbers.length,
      averageRating: this.barbers.reduce((sum, barber) => sum + barber.rating, 0) / this.barbers.length,
      totalReviews: this.barbers.reduce((sum, barber) => sum + barber.reviewCount, 0),
      specialties: [...new Set(this.barbers.flatMap(barber => barber.specialties))],
      priceRanges: [...new Set(this.barbers.map(barber => barber.priceRange))]
    };
  }
}

const mockBarberData = new MockBarberData();

module.exports = { mockBarberData, MockBarberData };

