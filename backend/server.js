import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? 
    process.env.ALLOWED_ORIGINS.split(',') : 
    ['http://localhost:3000', 'http://localhost:8081'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: parseInt(process.env.RATE_LIMIT_PER_MINUTE) || 10,
  message: {
    error: 'Too many requests',
    message: 'Please wait before making another request'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Logging
if (process.env.ENABLE_REQUEST_LOGGING === 'true') {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'CutMatch AI Backend'
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'CutMatch AI API',
    version: '1.0.0',
    description: 'AI-powered hairstyle generation for CutMatch',
    endpoints: {
      'POST /api/generate-hairstyle': 'Generate hairstyle variations from uploaded photo',
      'GET /api/styles': 'Get available hairstyle categories and prompts',
      'GET /health': 'Health check endpoint'
    },
    documentation: 'https://docs.cutmatch.app/api'
  });
});

// Hairstyle generation endpoint
app.post('/api/generate-hairstyle', async (req, res) => {
  try {
    // Import the handler dynamically
    const { default: generateHairstyleHandler } = await import('./api/generate-hairstyle.js');
    await generateHairstyleHandler(req, res);
  } catch (error) {
    console.error('Error loading generate-hairstyle handler:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to process hairstyle generation request'
    });
  }
});

// Get available styles endpoint
app.get('/api/styles', async (req, res) => {
  try {
    const { CUTMATCH_HAIRSTYLE_PROMPTS, STYLE_CATEGORIES } = await import('./api/generate-hairstyle.js');
    
    res.json({
      success: true,
      data: {
        prompts: CUTMATCH_HAIRSTYLE_PROMPTS,
        categories: STYLE_CATEGORIES,
        totalStyles: Object.keys(CUTMATCH_HAIRSTYLE_PROMPTS).length
      },
      metadata: {
        version: '1.0.0',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error loading styles:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to load available styles'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Endpoint ${req.method} ${req.originalUrl} not found`,
    availableEndpoints: [
      'GET /health',
      'GET /api',
      'POST /api/generate-hairstyle',
      'GET /api/styles'
    ]
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 CutMatch AI Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🎨 API endpoint: http://localhost:${PORT}/api/generate-hairstyle`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (process.env.REPLICATE_API_TOKEN) {
    console.log('✅ Replicate API token configured');
  } else {
    console.warn('⚠️  Replicate API token not configured - set REPLICATE_API_TOKEN in .env');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;

