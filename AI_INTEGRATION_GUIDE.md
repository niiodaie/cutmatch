# CutMatch AI Integration Guide

## Overview

This guide provides comprehensive documentation for integrating AI-powered hairstyle generation into the CutMatch mobile application. The system uses Replicate's API with advanced image generation models to create personalized hairstyle recommendations.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Backend API Implementation](#backend-api-implementation)
3. [Frontend Integration](#frontend-integration)
4. [Hairstyle Prompts and Examples](#hairstyle-prompts-and-examples)
5. [Cultural Inclusivity](#cultural-inclusivity)
6. [Error Handling and Fallbacks](#error-handling-and-fallbacks)
7. [Performance Optimization](#performance-optimization)
8. [Testing and Validation](#testing-and-validation)
9. [Deployment Guide](#deployment-guide)
10. [Troubleshooting](#troubleshooting)

## Architecture Overview

The CutMatch AI system consists of three main components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Replicate     │
│   (React Native)│────│   (Node.js)     │────│   AI Service    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow

1. **User uploads photo** → Frontend captures/selects image
2. **Preferences collected** → User selects hair type, cultural background, etc.
3. **API request** → Frontend sends image + preferences to backend
4. **AI processing** → Backend formats prompts and calls Replicate API
5. **Style generation** → AI generates 3-5 hairstyle variations
6. **Results returned** → Backend processes and returns styled images
7. **Display results** → Frontend shows AI-generated styles to user

## Backend API Implementation

### Core Endpoint: `/api/generate-hairstyle`

The main endpoint handles image upload, prompt formatting, and AI generation.

#### Request Format

```javascript
// Multipart form data
{
  image: File,                    // User's photo (JPEG/PNG)
  category: 'short',              // Optional: style category
  hairType: 'curly',              // Optional: hair texture
  faceShape: 'oval',              // Optional: face shape
  culturalBackground: 'african',   // Optional: cultural context
  customPrompt: 'custom style'    // Optional: custom prompt
}
```

#### Response Format

```javascript
{
  success: true,
  message: "Generated 4 hairstyles",
  results: [
    {
      id: "cutmatch_style_1",
      prompt: "CutMatch hairstyle preview of a person with short afro fade...",
      image: "https://replicate.delivery/pbxt/...",
      styleKey: "short_afro_fade",
      confidence: 0.87
    }
    // ... more styles
  ],
  metadata: {
    preferences: { ... },
    timestamp: "2025-01-27T10:00:00Z",
    version: "1.0.0",
    brand: "CutMatch"
  }
}
```

### Prompt Engineering

The system uses carefully crafted prompts that ensure:

- **Brand consistency** - All prompts include "CutMatch" branding
- **Cultural sensitivity** - Prompts respect diverse backgrounds
- **Quality output** - Professional photography styling cues
- **Face preservation** - Maintains user's facial features

#### Base Prompt Template

```javascript
const basePrompt = `CutMatch hairstyle preview of a person with {STYLE}, 
front view, smiling, high quality, photorealistic, studio lighting, 
professional headshot, clean background, high resolution`;
```

#### Negative Prompt

```javascript
const negativePrompt = `blurry, low quality, distorted, facup, watermark, 
text, logo, signature, multiple faces, cartoon, anime`;
```

## Frontend Integration

### AI Service Class

The `CutMatchAIService` class handles all AI-related operations:

```javascript
import aiService from '../utils/ai-service';

// Generate hairstyles
const result = await aiService.generateHairstyles(imageFile, {
  category: 'short',
  hairType: 'curly',
  culturalBackground: 'african'
});

// Check service health
const isHealthy = await aiService.checkHealth();

// Cancel generation
aiService.cancelGeneration();
```

### Integration in AnalyzingScreen

The `AnalyzingScreen` component orchestrates the AI generation process:

1. **Progress tracking** - Visual progress bar with steps
2. **Error handling** - Graceful fallback to mock data
3. **Cancellation** - Allow users to cancel long-running operations
4. **User feedback** - Clear messaging about AI processing

## Hairstyle Prompts and Examples

### Available Style Categories

The system includes 15+ diverse hairstyle categories:

#### African/Afro-textured Styles

```javascript
{
  'short_afro_fade': {
    name: 'Short Afro Fade',
    prompt: 'Photo of a person with a short afro fade haircut, natural texture, front view...',
    culturalContext: 'Celebrates natural African hair texture with modern barbering',
    maintenance: 'Medium',
    difficulty: 'Medium'
  },
  
  'protective_braids': {
    name: 'Protective Braids',
    prompt: 'Photo of a person with protective box braids, neat and styled...',
    culturalContext: 'Traditional African protective styling with contemporary flair',
    maintenance: 'Low',
    difficulty: 'Hard'
  },
  
  'twist_out': {
    name: 'Twist Out',
    prompt: 'Photo of a person with a twist-out hairstyle, defined curls...',
    culturalContext: 'Natural hair technique popular in the African diaspora',
    maintenance: 'Medium',
    difficulty: 'Medium'
  }
}
```

#### Asian-inspired Styles

```javascript
{
  'layered_waves': {
    name: 'Layered Waves',
    prompt: 'Photo of a person with layered wavy hair, medium length...',
    culturalContext: 'Versatile style suitable for various hair textures',
    maintenance: 'Medium',
    difficulty: 'Medium'
  },
  
  'textured_crop': {
    name: 'Textured Crop',
    prompt: 'Photo of a person with a textured crop haircut, modern styling...',
    culturalContext: 'Modern European-inspired cut with textural elements',
    maintenance: 'Low',
    difficulty: 'Easy'
  }
}
```

#### European/Straight Hair Styles

```javascript
{
  'short_pixie': {
    name: 'Pixie Cut',
    prompt: 'Photo of a person with a short pixie cut with side bangs...',
    culturalContext: 'Classic Western style with timeless appeal',
    maintenance: 'Medium',
    difficulty: 'Medium'
  },
  
  'sleek_bob': {
    name: 'Sleek Bob',
    prompt: 'Photo of a person with a sleek straight bob with center part...',
    culturalContext: 'Sophisticated style with global appeal',
    maintenance: 'High',
    difficulty: 'Hard'
  }
}
```

#### Latino/Mixed Texture Styles

```javascript
{
  'curly_bob': {
    name: 'Curly Bob',
    prompt: 'Photo of a person with a curly bob haircut, voluminous texture...',
    culturalContext: 'Celebrates natural curl patterns in a modern cut',
    maintenance: 'Medium',
    difficulty: 'Medium'
  },
  
  'wavy_lob': {
    name: 'Wavy Lob',
    prompt: 'Photo of a person with a wavy lob (long bob), natural movement...',
    culturalContext: 'Contemporary style popular across cultures',
    maintenance: 'Medium',
    difficulty: 'Medium'
  }
}
```

#### Gender-neutral/Unisex Styles

```javascript
{
  'undercut_fade': {
    name: 'Undercut Fade',
    prompt: 'Photo of a person with an undercut fade hairstyle, modern and clean...',
    culturalContext: 'Modern barbering technique with global influence',
    maintenance: 'Medium',
    difficulty: 'Medium'
  },
  
  'buzz_cut': {
    name: 'Buzz Cut',
    prompt: 'Photo of a person with a buzz cut, very short and neat...',
    culturalContext: 'Minimalist style with practical and aesthetic appeal',
    maintenance: 'Low',
    difficulty: 'Easy'
  }
}
```

### Style Recommendation Logic

The system intelligently recommends styles based on user preferences:

```javascript
function getRecommendedStyles(preferences) {
  const { culturalBackground, hairType, category } = preferences;
  
  // Cultural background-based recommendations
  if (culturalBackground === 'african') {
    return ['short_afro_fade', 'tapered_coils', 'protective_braids', 'twist_out'];
  }
  
  if (culturalBackground === 'asian') {
    return ['layered_waves', 'textured_crop', 'sleek_bob', 'wavy_lob'];
  }
  
  // Hair type-based recommendations
  if (hairType === 'curly') {
    return ['curly_bob', 'twist_out', 'voluminous_curls'];
  }
  
  // Category-based recommendations
  if (category === 'short') {
    return ['short_pixie', 'textured_crop', 'buzz_cut'];
  }
  
  // Default diverse selection
  return ['short_afro_fade', 'sleek_bob', 'layered_waves', 'curly_bob'];
}
```

## Cultural Inclusivity

### Design Principles

1. **Representation** - Include styles from all major cultural backgrounds
2. **Authenticity** - Accurate cultural context and styling techniques
3. **Respect** - Avoid cultural appropriation and stereotypes
4. **Accessibility** - Styles suitable for different hair textures and types

### Cultural Context Metadata

Each style includes cultural context information:

```javascript
{
  culturalContext: 'Celebrates natural African hair texture with modern barbering techniques',
  culturalBackground: ['african', 'afro-caribbean'],
  hairTextures: ['coily', 'kinky', 'curly'],
  traditionalRoots: 'West African barbering traditions',
  modernAdaptation: 'Contemporary urban styling'
}
```

### Inclusive Language

- Use person-first language in prompts
- Avoid gendered assumptions
- Include diverse skin tones and features
- Respect traditional styling methods

## Error Handling and Fallbacks

### Error Types and Responses

#### 1. Network Errors

```javascript
try {
  const result = await aiService.generateHairstyles(image, preferences);
} catch (error) {
  if (error.message.includes('network')) {
    // Show network error message
    // Offer retry option
    // Fall back to cached results if available
  }
}
```

#### 2. AI Service Errors

```javascript
// Replicate API errors
if (error.message.includes('Replicate')) {
  // Show AI service error
  // Offer mock suggestions
  // Log error for monitoring
}
```

#### 3. Image Processing Errors

```javascript
// Invalid image format or size
if (error.message.includes('image')) {
  // Show image format error
  // Guide user to correct format
  // Offer image compression
}
```

### Fallback Strategy

1. **Primary**: AI-generated styles from Replicate
2. **Secondary**: Cached AI results from previous sessions
3. **Tertiary**: High-quality mock suggestions
4. **Final**: Basic style categories with stock images

### Mock Fallback Implementation

```javascript
const generateMockSuggestions = () => {
  return [
    {
      id: 'mock_1',
      name: 'Short Afro Fade',
      description: 'A modern take on the classic afro with a clean fade',
      image: 'https://via.placeholder.com/300x300/6A0DAD/FFFFFF?text=Short+Afro+Fade',
      confidence: 0.85,
      category: 'Short',
      maintenance: 'Medium',
      aiGenerated: false
    }
    // ... more mock styles
  ];
};
```

## Performance Optimization

### Image Optimization

1. **Compression** - Reduce image size before upload
2. **Format conversion** - Convert to JPEG for better compression
3. **Resolution limits** - Maximum 1024x1024 pixels
4. **Quality settings** - Balance quality vs. file size

```javascript
const optimizeImage = async (imageUri) => {
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 1024 } }],
    { 
      compress: 0.8, 
      format: ImageManipulator.SaveFormat.JPEG 
    }
  );
  return manipulatedImage;
};
```

### Caching Strategy

1. **Result caching** - Cache AI results for 24 hours
2. **Image caching** - Cache generated images locally
3. **Preference caching** - Remember user preferences
4. **Offline support** - Show cached results when offline

### Request Optimization

1. **Batch processing** - Generate multiple styles in parallel
2. **Timeout handling** - 60-second timeout for AI requests
3. **Retry logic** - Exponential backoff for failed requests
4. **Rate limiting** - Respect API rate limits

## Testing and Validation

### Unit Tests

```javascript
// Test AI service functionality
describe('CutMatchAIService', () => {
  test('should generate hairstyles successfully', async () => {
    const mockImage = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const result = await aiService.generateHairstyles(mockImage);
    
    expect(result.success).toBe(true);
    expect(result.styles).toHaveLength(3);
    expect(result.styles[0]).toHaveProperty('image');
  });
  
  test('should handle errors gracefully', async () => {
    // Mock network error
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
    
    await expect(aiService.generateHairstyles(mockImage))
      .rejects.toThrow('Failed to generate hairstyles');
  });
});
```

### Integration Tests

```javascript
// Test full AI generation flow
describe('AI Generation Flow', () => {
  test('should complete full generation process', async () => {
    // Mock user photo upload
    const imageUri = 'file://test-image.jpg';
    const preferences = { category: 'short', hairType: 'curly' };
    
    // Navigate to analyzing screen
    navigation.navigate('Analyzing', { image: { uri: imageUri }, preferences });
    
    // Wait for AI generation to complete
    await waitFor(() => {
      expect(screen.getByText('100% Complete')).toBeVisible();
    });
    
    // Verify navigation to suggestions
    expect(navigation.navigate).toHaveBeenCalledWith('Suggestions', 
      expect.objectContaining({ aiGenerated: true })
    );
  });
});
```

### Manual Testing Checklist

- [ ] Upload various image formats (JPEG, PNG, HEIC)
- [ ] Test with different image sizes and orientations
- [ ] Verify all cultural background options work
- [ ] Test network error scenarios
- [ ] Validate fallback to mock suggestions
- [ ] Check cancellation functionality
- [ ] Test on different device types and screen sizes
- [ ] Verify accessibility features work correctly

## Deployment Guide

### Environment Setup

#### Development Environment

```bash
# Backend (.env)
REPLICATE_API_TOKEN=r8_your_dev_token
NODE_ENV=development
PORT=3001
ALLOWED_ORIGINS=http://localhost:8081

# Frontend (.env)
EXPO_PUBLIC_AI_API_BASE_URL=http://localhost:3001
EXPO_PUBLIC_ENABLE_AI_GENERATION=true
EXPO_PUBLIC_USE_MOCK_FALLBACK=true
```

#### Production Environment

```bash
# Backend (.env)
REPLICATE_API_TOKEN=r8_your_production_token
NODE_ENV=production
PORT=3001
ALLOWED_ORIGINS=https://your-app.com

# Frontend (.env)
EXPO_PUBLIC_AI_API_BASE_URL=https://your-backend.render.com
EXPO_PUBLIC_ENABLE_AI_GENERATION=true
EXPO_PUBLIC_USE_MOCK_FALLBACK=false
```

### Deployment Steps

#### 1. Backend Deployment (Render)

```bash
# Build and deploy to Render
git add .
git commit -m "Deploy AI backend"
git push origin main

# Render will automatically deploy from GitHub
# Set environment variables in Render dashboard
```

#### 2. Frontend Deployment (Expo/EAS)

```bash
# Build for app stores
eas build --platform all

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

### Monitoring and Alerts

1. **API monitoring** - Track response times and error rates
2. **Cost monitoring** - Monitor Replicate API usage and costs
3. **Error tracking** - Set up Sentry for error monitoring
4. **Performance monitoring** - Track app performance metrics

## Troubleshooting

### Common Issues

#### 1. AI Generation Fails

**Symptoms**: Error messages, no styles generated
**Causes**: Invalid API token, network issues, image format problems
**Solutions**:
- Verify Replicate API token is valid
- Check network connectivity
- Validate image format and size
- Check API rate limits

#### 2. Slow Generation Times

**Symptoms**: Long wait times, timeouts
**Causes**: Large images, complex prompts, API congestion
**Solutions**:
- Optimize image size and quality
- Simplify prompts
- Implement request queuing
- Add timeout handling

#### 3. Poor Quality Results

**Symptoms**: Blurry images, incorrect styles
**Causes**: Poor input images, inadequate prompts
**Solutions**:
- Improve image quality guidelines
- Refine prompt engineering
- Add quality validation
- Implement user feedback system

#### 4. Cultural Sensitivity Issues

**Symptoms**: Inappropriate style suggestions
**Causes**: Inadequate cultural context, biased training data
**Solutions**:
- Review and update cultural metadata
- Implement content filtering
- Add user reporting system
- Regular cultural sensitivity audits

### Debug Tools

#### 1. API Testing

```bash
# Test backend endpoint directly
curl -X POST http://localhost:3001/api/generate-hairstyle \
  -F "image=@test-image.jpg" \
  -F "category=short" \
  -F "hairType=curly"
```

#### 2. Frontend Debugging

```javascript
// Enable debug mode
const DEBUG_MODE = process.env.EXPO_PUBLIC_DEBUG_MODE === 'true';

if (DEBUG_MODE) {
  console.log('AI Request:', { imageFile, preferences });
  console.log('AI Response:', result);
}
```

#### 3. Performance Monitoring

```javascript
// Track generation time
const startTime = Date.now();
const result = await aiService.generateHairstyles(image, preferences);
const generationTime = Date.now() - startTime;

analytics.track('ai_generation_time', { 
  duration: generationTime,
  styles_count: result.styles.length 
});
```

### Support and Maintenance

#### Regular Maintenance Tasks

1. **API token rotation** - Rotate Replicate tokens quarterly
2. **Prompt optimization** - Review and improve prompts monthly
3. **Cultural review** - Audit cultural content quarterly
4. **Performance optimization** - Monitor and optimize monthly
5. **Security updates** - Apply security patches immediately

#### Monitoring Dashboards

Set up dashboards to monitor:
- API response times and error rates
- Generation success/failure rates
- User satisfaction scores
- Cost per generation
- Cultural representation metrics

---

## Conclusion

The CutMatch AI integration provides a powerful, culturally-inclusive hairstyle generation system that respects user diversity while delivering high-quality, personalized recommendations. The system is designed for scalability, reliability, and continuous improvement based on user feedback and cultural sensitivity reviews.

For additional support or questions, please refer to the technical documentation or contact the development team.

