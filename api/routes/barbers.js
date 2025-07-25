// Barber and salon API routes
const express = require('express');
const { mockBarberData } = require('../utils/mock-barber-data');
const { supabase } = require('../utils/supabase');

const router = express.Router();

// GET /api/barbers/nearby
// Get nearby barbers based on location
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 10, limit = 20 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({
        error: 'Location required',
        message: 'Latitude and longitude are required'
      });
    }
    
    // Get nearby barbers (mock implementation)
    const nearbyBarbers = mockBarberData.getNearbyBarbers(
      parseFloat(lat),
      parseFloat(lng),
      parseFloat(radius),
      parseInt(limit)
    );
    
    res.json({
      success: true,
      barbers: nearbyBarbers,
      total: nearbyBarbers.length,
      location: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        radius: parseFloat(radius)
      }
    });
    
  } catch (error) {
    console.error('Nearby barbers error:', error);
    res.status(500).json({
      error: 'Failed to fetch nearby barbers',
      message: 'Unable to retrieve barber data'
    });
  }
});

// GET /api/barbers/:id
// Get specific barber details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const barber = mockBarberData.getBarberById(id);
    
    if (!barber) {
      return res.status(404).json({
        error: 'Barber not found',
        message: 'The requested barber does not exist'
      });
    }
    
    // Get reviews from Supabase
    const { data: reviews } = await supabase
      .from('barber_reviews')
      .select(`
        *,
        profiles:user_id (display_name)
      `)
      .eq('barber_id', id)
      .order('created_at', { ascending: false });
    
    // Calculate average rating
    const avgRating = reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;
    
    res.json({
      success: true,
      barber: {
        ...barber,
        reviews: reviews || [],
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews?.length || 0
      }
    });
    
  } catch (error) {
    console.error('Get barber error:', error);
    res.status(500).json({
      error: 'Failed to fetch barber details',
      message: 'Unable to retrieve barber information'
    });
  }
});

// POST /api/barbers/:id/reviews
// Submit a review for a barber
router.post('/:id/reviews', async (req, res) => {
  try {
    const { id: barberId } = req.params;
    const { userId, rating, comment } = req.body;
    
    if (!userId || !rating) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'User ID and rating are required'
      });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: 'Invalid rating',
        message: 'Rating must be between 1 and 5'
      });
    }
    
    // Check if barber exists
    const barber = mockBarberData.getBarberById(barberId);
    if (!barber) {
      return res.status(404).json({
        error: 'Barber not found',
        message: 'The specified barber does not exist'
      });
    }
    
    // Submit review to Supabase
    const { data, error } = await supabase
      .from('barber_reviews')
      .insert([{
        user_id: userId,
        barber_id: barberId,
        rating: parseInt(rating),
        comment: comment || null
      }])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    res.status(201).json({
      success: true,
      review: data,
      message: 'Review submitted successfully'
    });
    
  } catch (error) {
    console.error('Submit review error:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({
        error: 'Review already exists',
        message: 'You have already reviewed this barber'
      });
    }
    
    res.status(500).json({
      error: 'Failed to submit review',
      message: 'Unable to process your review'
    });
  }
});

// GET /api/barbers/:id/reviews
// Get reviews for a specific barber
router.get('/:id/reviews', async (req, res) => {
  try {
    const { id: barberId } = req.params;
    const { limit = 20, offset = 0 } = req.query;
    
    // Get reviews from Supabase
    const { data: reviews, error } = await supabase
      .from('barber_reviews')
      .select(`
        *,
        profiles:user_id (display_name)
      `)
      .eq('barber_id', barberId)
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);
    
    if (error) {
      throw error;
    }
    
    // Calculate statistics
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;
    
    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    };
    
    res.json({
      success: true,
      reviews: reviews,
      statistics: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution
      }
    });
    
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      error: 'Failed to fetch reviews',
      message: 'Unable to retrieve review data'
    });
  }
});

// GET /api/barbers/search
// Search barbers by name or specialties
router.get('/search', async (req, res) => {
  try {
    const { q, lat, lng, radius = 25, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        error: 'Search query required',
        message: 'Please provide a search query'
      });
    }
    
    // Search barbers (mock implementation)
    let results = mockBarberData.searchBarbers(q);
    
    // Filter by location if provided
    if (lat && lng) {
      results = mockBarberData.filterByLocation(
        results,
        parseFloat(lat),
        parseFloat(lng),
        parseFloat(radius)
      );
    }
    
    // Limit results
    results = results.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      results: results,
      total: results.length,
      query: q
    });
    
  } catch (error) {
    console.error('Search barbers error:', error);
    res.status(500).json({
      error: 'Search failed',
      message: 'Unable to perform search'
    });
  }
});

module.exports = router;

