// Authentication API routes
const express = require('express');
const { supabase } = require('../utils/supabase');

const router = express.Router();

// POST /api/auth/signup
// Register a new user
router.post('/signup', async (req, res) => {
  try {
    const { email, password, displayName, hairType, preferences } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email and password are required'
      });
    }
    
    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName
        }
      }
    });
    
    if (authError) {
      throw authError;
    }
    
    // Create user profile if signup successful
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          display_name: displayName || null,
          hair_type: hairType || null,
          preferences: preferences || {},
          is_pro: false
        }]);
      
      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't fail the signup if profile creation fails
      }
    }
    
    res.status(201).json({
      success: true,
      user: authData.user,
      session: authData.session,
      message: 'Account created successfully'
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    
    let errorMessage = 'Failed to create account';
    if (error.message.includes('already registered')) {
      errorMessage = 'An account with this email already exists';
    } else if (error.message.includes('Password')) {
      errorMessage = 'Password must be at least 6 characters long';
    }
    
    res.status(400).json({
      error: 'Signup failed',
      message: errorMessage
    });
  }
});

// POST /api/auth/signin
// Sign in existing user
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Email and password are required'
      });
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      throw error;
    }
    
    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    
    res.json({
      success: true,
      user: data.user,
      session: data.session,
      profile: profile,
      message: 'Signed in successfully'
    });
    
  } catch (error) {
    console.error('Signin error:', error);
    
    let errorMessage = 'Invalid email or password';
    if (error.message.includes('Email not confirmed')) {
      errorMessage = 'Please check your email and confirm your account';
    }
    
    res.status(401).json({
      error: 'Authentication failed',
      message: errorMessage
    });
  }
});

// POST /api/auth/signout
// Sign out user
router.post('/signout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    res.json({
      success: true,
      message: 'Signed out successfully'
    });
    
  } catch (error) {
    console.error('Signout error:', error);
    res.status(500).json({
      error: 'Signout failed',
      message: 'Unable to sign out'
    });
  }
});

// POST /api/auth/reset-password
// Request password reset
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        error: 'Email required',
        message: 'Please provide your email address'
      });
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`
    });
    
    if (error) {
      throw error;
    }
    
    res.json({
      success: true,
      message: 'Password reset email sent'
    });
    
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      error: 'Reset failed',
      message: 'Unable to send reset email'
    });
  }
});

// GET /api/auth/user
// Get current user info
router.get('/user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'No token provided',
        message: 'Authorization token is required'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Please sign in again'
      });
    }
    
    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    res.json({
      success: true,
      user: user,
      profile: profile
    });
    
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Failed to get user',
      message: 'Unable to retrieve user information'
    });
  }
});

// PUT /api/auth/profile
// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'No token provided',
        message: 'Authorization token is required'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Please sign in again'
      });
    }
    
    const { displayName, hairType, preferences } = req.body;
    
    const updates = {};
    if (displayName !== undefined) updates.display_name = displayName;
    if (hairType !== undefined) updates.hair_type = hairType;
    if (preferences !== undefined) updates.preferences = preferences;
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    res.json({
      success: true,
      profile: data,
      message: 'Profile updated successfully'
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Update failed',
      message: 'Unable to update profile'
    });
  }
});

module.exports = router;

