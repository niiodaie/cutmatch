// Supabase configuration and helper functions for CutMatch
// This file provides authentication and database functionality

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export const auth = {
  // Sign up with email and password
  signUp: async (email, password, userData = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  },

  // Get current user
  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  // Listen to auth state changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error };
    }
  }
};

// Profile functions
export const profiles = {
  // Get user profile
  getProfile: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Get profile error:', error);
      return { data: null, error };
    }
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { data: null, error };
    }
  },

  // Create user profile
  createProfile: async (userId, profileData) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ id: userId, ...profileData }])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Create profile error:', error);
      return { data: null, error };
    }
  },

  // Check if user is Pro
  checkProStatus: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return { isPro: data?.is_pro || false, error: null };
    } catch (error) {
      console.error('Check pro status error:', error);
      return { isPro: false, error };
    }
  }
};

// Reviews functions
export const reviews = {
  // Get reviews for a barber
  getBarberReviews: async (barberId) => {
    try {
      const { data, error } = await supabase
        .from('barber_reviews')
        .select(`
          *,
          profiles:user_id (display_name)
        `)
        .eq('barber_id', barberId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Get barber reviews error:', error);
      return { data: [], error };
    }
  },

  // Submit a review
  submitReview: async (userId, barberId, rating, comment) => {
    try {
      const { data, error } = await supabase
        .from('barber_reviews')
        .insert([{
          user_id: userId,
          barber_id: barberId,
          rating,
          comment
        }])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Submit review error:', error);
      return { data: null, error };
    }
  },

  // Get average rating for a barber
  getAverageRating: async (barberId) => {
    try {
      const { data, error } = await supabase
        .from('barber_reviews')
        .select('rating')
        .eq('barber_id', barberId);
      
      if (error) throw error;
      
      if (data.length === 0) {
        return { average: 0, count: 0, error: null };
      }
      
      const average = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
      return { average: Math.round(average * 10) / 10, count: data.length, error: null };
    } catch (error) {
      console.error('Get average rating error:', error);
      return { average: 0, count: 0, error };
    }
  }
};

// Saved styles functions
export const savedStyles = {
  // Get user's saved styles
  getSavedStyles: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('saved_styles')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Get saved styles error:', error);
      return { data: [], error };
    }
  },

  // Save a style
  saveStyle: async (userId, styleData) => {
    try {
      const { data, error } = await supabase
        .from('saved_styles')
        .insert([{
          user_id: userId,
          style_data: styleData
        }])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Save style error:', error);
      return { data: null, error };
    }
  },

  // Remove a saved style
  removeSavedStyle: async (styleId) => {
    try {
      const { error } = await supabase
        .from('saved_styles')
        .delete()
        .eq('id', styleId);
      
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Remove saved style error:', error);
      return { error };
    }
  }
};

// Utility functions
export const utils = {
  // Check if user is authenticated
  isAuthenticated: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  },

  // Get current user ID
  getCurrentUserId: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  },

  // Handle authentication errors
  handleAuthError: (error) => {
    switch (error?.message) {
      case 'Invalid login credentials':
        return 'Invalid email or password';
      case 'Email not confirmed':
        return 'Please check your email and confirm your account';
      case 'User already registered':
        return 'An account with this email already exists';
      default:
        return error?.message || 'An unexpected error occurred';
    }
  }
};

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to barber reviews changes
  subscribeToBarberReviews: (barberId, callback) => {
    return supabase
      .channel(`barber-reviews-${barberId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'barber_reviews',
          filter: `barber_id=eq.${barberId}`
        },
        callback
      )
      .subscribe();
  },

  // Subscribe to profile changes
  subscribeToProfile: (userId, callback) => {
    return supabase
      .channel(`profile-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  }
};

export default supabase;

