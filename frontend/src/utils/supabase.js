import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabaseClient';

// Supabase configuration
// Replace these with your actual Supabase project URL and anon key
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client with AsyncStorage for React Native
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper functions for CutMatch specific operations

/**
 * Save a favorite hairstyle for the current user
 */
export const saveFavoriteStyle = async (style, personalNote = '') => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('favorites')
      .insert([
        {
          user_id: user.id,
          style_id: style.id,
          style_name: style.name,
          style_data: style,
          personal_note: personalNote,
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving favorite style:', error);
    throw error;
  }
};

/**
 * Get all favorite styles for the current user
 */
export const getFavoriteStyles = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching favorite styles:', error);
    throw error;
  }
};

/**
 * Remove a favorite style
 */
export const removeFavoriteStyle = async (styleId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('style_id', styleId);

    if (error) throw error;
  } catch (error) {
    console.error('Error removing favorite style:', error);
    throw error;
  }
};

/**
 * Save or update user profile preferences
 */
export const saveUserProfile = async (profileData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert([
        {
          user_id: user.id,
          ...profileData,
          updated_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

/**
 * Get user profile preferences
 */
export const getUserProfile = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }

    return data || {};
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Create a shared style link
 */
export const createSharedStyleLink = async (style, personalNote = '') => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const shareId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const { data, error } = await supabase
      .from('shared_styles')
      .insert([
        {
          share_id: shareId,
          user_id: user?.id || null,
          style_data: style,
          personal_note: personalNote,
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;
    
    return `https://cutmatch.app/shared/${shareId}`;
  } catch (error) {
    console.error('Error creating shared style link:', error);
    throw error;
  }
};

/**
 * Get shared style by share ID
 */
export const getSharedStyle = async (shareId) => {
  try {
    const { data, error } = await supabase
      .from('shared_styles')
      .select('*')
      .eq('share_id', shareId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching shared style:', error);
    throw error;
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Sign out current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get current user session
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};

