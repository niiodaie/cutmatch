// Hairstyle suggestions API routes
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { mockStyleEngine } = require('../utils/mock-style-engine');
const { supabase } = require('../utils/supabase');

const router = express.Router();

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// POST /api/suggestions/analyze
// Analyze uploaded photo and return hairstyle suggestions
router.post('/analyze', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No photo provided',
        message: 'Please upload a photo for analysis'
      });
    }

    // Process the image
    const processedImage = await sharp(req.file.buffer)
      .resize(512, 512, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Extract metadata for analysis (mock implementation)
    const imageMetadata = await sharp(processedImage).metadata();
    
    // Mock AI analysis - in production, this would call actual AI service
    const analysisData = {
      faceShape: 'oval', // This would be detected by AI
      hairType: req.body.hairType || 'wavy',
      skinTone: 'medium', // This would be detected by AI
      preferences: req.body.preferences || {}
    };

    // Get style suggestions from mock engine
    const suggestions = mockStyleEngine.getSuggestions(analysisData);

    // Log analytics (optional)
    console.log('Photo analysis completed:', {
      imageSize: req.file.size,
      dimensions: `${imageMetadata.width}x${imageMetadata.height}`,
      suggestionsCount: suggestions.length
    });

    res.json({
      success: true,
      analysis: {
        faceShape: analysisData.faceShape,
        hairType: analysisData.hairType,
        confidence: 0.85 // Mock confidence score
      },
      suggestions: suggestions,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: 'Unable to process the uploaded photo'
    });
  }
});

// GET /api/suggestions/styles
// Get all available hairstyles
router.get('/styles', async (req, res) => {
  try {
    const { category, hairType, limit = 20 } = req.query;
    
    let styles = mockStyleEngine.getAllStyles();
    
    // Filter by category if provided
    if (category) {
      styles = styles.filter(style => 
        style.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by hair type if provided
    if (hairType) {
      styles = styles.filter(style => 
        style.suitableHairTypes?.includes(hairType.toLowerCase())
      );
    }
    
    // Limit results
    styles = styles.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      styles: styles,
      total: styles.length
    });
    
  } catch (error) {
    console.error('Get styles error:', error);
    res.status(500).json({
      error: 'Failed to fetch styles',
      message: 'Unable to retrieve hairstyle data'
    });
  }
});

// GET /api/suggestions/style/:id
// Get specific hairstyle details
router.get('/style/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const style = mockStyleEngine.getStyleById(id);
    
    if (!style) {
      return res.status(404).json({
        error: 'Style not found',
        message: 'The requested hairstyle does not exist'
      });
    }
    
    res.json({
      success: true,
      style: style
    });
    
  } catch (error) {
    console.error('Get style error:', error);
    res.status(500).json({
      error: 'Failed to fetch style',
      message: 'Unable to retrieve hairstyle details'
    });
  }
});

// POST /api/suggestions/feedback
// Submit feedback on suggestions
router.post('/feedback', async (req, res) => {
  try {
    const { suggestionId, rating, feedback, userId } = req.body;
    
    if (!suggestionId || !rating) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Suggestion ID and rating are required'
      });
    }
    
    // In production, save feedback to database
    console.log('Feedback received:', {
      suggestionId,
      rating,
      feedback,
      userId,
      timestamp: new Date().toISOString()
    });
    
    res.json({
      success: true,
      message: 'Feedback submitted successfully'
    });
    
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({
      error: 'Failed to submit feedback',
      message: 'Unable to process your feedback'
    });
  }
});

// GET /api/suggestions/trending
// Get trending hairstyles
router.get('/trending', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    // Mock trending styles - in production, this would be based on actual data
    const trendingStyles = mockStyleEngine.getTrendingStyles(parseInt(limit));
    
    res.json({
      success: true,
      trending: trendingStyles,
      total: trendingStyles.length
    });
    
  } catch (error) {
    console.error('Trending styles error:', error);
    res.status(500).json({
      error: 'Failed to fetch trending styles',
      message: 'Unable to retrieve trending hairstyles'
    });
  }
});

module.exports = router;

