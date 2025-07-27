// CutMatch API Mock Implementation
// This file provides mock API functions that simulate backend responses

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const MOCK_MODE = process.env.REACT_APP_MOCK_API === 'true' || true; // Default to mock mode

// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const MOCK_DATA = {
  users: [
    {
      id: 1,
      email: 'user@example.com',
      name: 'John Doe',
      avatar: '/api/placeholder/100/100',
      subscription: 'free',
      location: { city: 'New York', country: 'United States' }
    }
  ],
  hairstyles: [
    {
      id: 1,
      name: 'Afro Fade',
      category: 'Fades',
      image: '/api/placeholder/300/400',
      rating: 4.8,
      likes: 1234,
      description: 'A classic afro fade with modern styling',
      tags: ['afro', 'fade', 'modern'],
      difficulty: 'medium',
      duration: '45 minutes'
    },
    {
      id: 2,
      name: 'Box Braids',
      category: 'Braids',
      image: '/api/placeholder/300/400',
      rating: 4.9,
      likes: 2156,
      description: 'Protective box braids with various styling options',
      tags: ['braids', 'protective', 'long-lasting'],
      difficulty: 'hard',
      duration: '3-4 hours'
    },
    {
      id: 3,
      name: 'Twist Out',
      category: 'Natural',
      image: '/api/placeholder/300/400',
      rating: 4.7,
      likes: 987,
      description: 'Natural twist out for defined curls',
      tags: ['natural', 'curls', 'twist'],
      difficulty: 'easy',
      duration: '30 minutes'
    },
    {
      id: 4,
      name: 'Low Taper',
      category: 'Cuts',
      image: '/api/placeholder/300/400',
      rating: 4.6,
      likes: 1543,
      description: 'Clean low taper cut with sharp lines',
      tags: ['taper', 'clean', 'professional'],
      difficulty: 'medium',
      duration: '30 minutes'
    }
  ],
  salons: [
    {
      id: 1,
      name: 'Elite Hair Studio',
      address: '123 Main Street',
      city: 'New York',
      country: 'United States',
      distance: '0.5 miles',
      rating: 4.8,
      reviews: 156,
      specialties: ['Afro Cuts', 'Braids', 'Fades'],
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Sat 9AM-7PM',
      image: '/api/placeholder/300/200',
      latitude: 40.7128,
      longitude: -74.0060
    },
    {
      id: 2,
      name: 'Crown & Glory Salon',
      address: '456 Oak Avenue',
      city: 'New York',
      country: 'United States',
      distance: '0.8 miles',
      rating: 4.9,
      reviews: 203,
      specialties: ['Natural Hair', 'Protective Styles', 'Color'],
      phone: '+1 (555) 234-5678',
      hours: 'Tue-Sun 10AM-8PM',
      image: '/api/placeholder/300/200',
      latitude: 40.7589,
      longitude: -73.9851
    }
  ]
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  if (MOCK_MODE) {
    // Simulate network delay
    await delay(Math.random() * 1000 + 500);
    
    // Mock API responses
    return mockApiResponse(endpoint, options);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Mock API response handler
const mockApiResponse = (endpoint, options) => {
  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body) : null;

  // Route mock responses
  if (endpoint === '/auth/login' && method === 'POST') {
    if (body.email === 'user@example.com' && body.password === 'password') {
      return {
        success: true,
        user: MOCK_DATA.users[0],
        token: 'mock-jwt-token-' + Date.now()
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  if (endpoint === '/auth/register' && method === 'POST') {
    const newUser = {
      id: Date.now(),
      email: body.email,
      name: body.name,
      avatar: '/api/placeholder/100/100',
      subscription: 'free',
      location: { city: 'Unknown', country: 'Unknown' }
    };
    return {
      success: true,
      user: newUser,
      token: 'mock-jwt-token-' + Date.now()
    };
  }

  if (endpoint === '/hairstyles' && method === 'GET') {
    return {
      success: true,
      data: MOCK_DATA.hairstyles,
      total: MOCK_DATA.hairstyles.length,
      page: 1,
      limit: 20
    };
  }

  if (endpoint.startsWith('/hairstyles/') && method === 'GET') {
    const id = parseInt(endpoint.split('/')[2]);
    const hairstyle = MOCK_DATA.hairstyles.find(h => h.id === id);
    if (hairstyle) {
      return { success: true, data: hairstyle };
    } else {
      throw new Error('Hairstyle not found');
    }
  }

  if (endpoint === '/salons/nearby' && method === 'GET') {
    return {
      success: true,
      data: MOCK_DATA.salons,
      total: MOCK_DATA.salons.length
    };
  }

  if (endpoint === '/location/detect' && method === 'GET') {
    const locations = [
      { city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060 },
      { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
      { city: 'Lagos', country: 'Nigeria', latitude: 6.5244, longitude: 3.3792 }
    ];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    return { success: true, data: randomLocation };
  }

  // Default response for unknown endpoints
  return { success: false, error: 'Endpoint not found' };
};

// Authentication API
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  register: async (name, email, password) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', { method: 'POST' });
  },

  socialLogin: async (provider, token) => {
    return apiRequest('/auth/social', {
      method: 'POST',
      body: JSON.stringify({ provider, token })
    });
  }
};

// Hairstyles API
export const hairstylesAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/hairstyles${queryParams ? '?' + queryParams : ''}`);
  },

  getById: async (id) => {
    return apiRequest(`/hairstyles/${id}`);
  },

  search: async (query, filters = {}) => {
    return apiRequest('/hairstyles/search', {
      method: 'POST',
      body: JSON.stringify({ query, filters })
    });
  },

  favorite: async (id) => {
    return apiRequest(`/hairstyles/${id}/favorite`, { method: 'POST' });
  },

  unfavorite: async (id) => {
    return apiRequest(`/hairstyles/${id}/favorite`, { method: 'DELETE' });
  }
};

// Salons API
export const salonsAPI = {
  getNearby: async (latitude, longitude, radius = 10) => {
    return apiRequest(`/salons/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
  },

  getById: async (id) => {
    return apiRequest(`/salons/${id}`);
  },

  search: async (query, location) => {
    return apiRequest('/salons/search', {
      method: 'POST',
      body: JSON.stringify({ query, location })
    });
  }
};

// Location API
export const locationAPI = {
  detect: async () => {
    return apiRequest('/location/detect');
  },

  updateUserLocation: async (latitude, longitude) => {
    return apiRequest('/location/update', {
      method: 'POST',
      body: JSON.stringify({ latitude, longitude })
    });
  }
};

// User API
export const userAPI = {
  getProfile: async () => {
    return apiRequest('/user/profile');
  },

  updateProfile: async (data) => {
    return apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  getFavorites: async () => {
    return apiRequest('/user/favorites');
  },

  getSubscription: async () => {
    return apiRequest('/user/subscription');
  },

  updateSubscription: async (planId) => {
    return apiRequest('/user/subscription', {
      method: 'POST',
      body: JSON.stringify({ planId })
    });
  }
};

// Analytics API
export const analyticsAPI = {
  trackEvent: async (eventName, properties) => {
    return apiRequest('/analytics/event', {
      method: 'POST',
      body: JSON.stringify({ eventName, properties })
    });
  },

  trackPageView: async (page, title) => {
    return apiRequest('/analytics/pageview', {
      method: 'POST',
      body: JSON.stringify({ page, title })
    });
  }
};

// Export configuration
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  MOCK_MODE,
  TIMEOUT: 10000
};

export default {
  auth: authAPI,
  hairstyles: hairstylesAPI,
  salons: salonsAPI,
  location: locationAPI,
  user: userAPI,
  analytics: analyticsAPI
};

