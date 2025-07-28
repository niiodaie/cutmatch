// CutMatch AI Service - Frontend Integration
// Handles communication with the AI backend for hairstyle generation

const AI_API_BASE_URL = process.env.EXPO_PUBLIC_AI_API_BASE_URL || 'http://localhost:3001';

class CutMatchAIService {
  constructor() {
    this.baseURL = AI_API_BASE_URL;
    this.isGenerating = false;
    this.currentRequest = null;
  }

  /**
   * Generate hairstyles using AI based on uploaded photo
   * @param {File|Blob} imageFile - The user's photo
   * @param {Object} preferences - User preferences for style generation
   * @returns {Promise<Object>} - Generated hairstyles
   */
  async generateHairstyles(imageFile, preferences = {}) {
    if (this.isGenerating) {
      throw new Error('Generation already in progress. Please wait.');
    }

    this.isGenerating = true;

    try {
      // Validate image file
      if (!imageFile) {
        throw new Error('No image file provided');
      }

      // Create form data
      const formData = new FormData();
      formData.append('image', imageFile);
      
      // Add preferences to form data
      if (preferences.category) {
        formData.append('category', preferences.category);
      }
      if (preferences.hairType) {
        formData.append('hairType', preferences.hairType);
      }
      if (preferences.faceShape) {
        formData.append('faceShape', preferences.faceShape);
      }
      if (preferences.culturalBackground) {
        formData.append('culturalBackground', preferences.culturalBackground);
      }
      if (preferences.customPrompt) {
        formData.append('customPrompt', preferences.customPrompt);
      }

      // Make API request
      const controller = new AbortController();
      this.currentRequest = controller;

      const response = await fetch(`${this.baseURL}/api/generate-hairstyle`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        headers: {
          // Don't set Content-Type for FormData - let browser set it with boundary
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Generation failed');
      }

      // Transform results to match CutMatch format
      const transformedResults = result.results.map((style, index) => ({
        id: style.id || `cutmatch_${Date.now()}_${index}`,
        name: this.getStyleName(style.styleKey),
        description: this.getStyleDescription(style.styleKey),
        image: style.image,
        confidence: style.confidence || 0.85,
        category: this.getStyleCategory(style.styleKey),
        maintenance: this.getStyleMaintenance(style.styleKey),
        length: this.getStyleLength(style.styleKey),
        difficulty: this.getStyleDifficulty(style.styleKey),
        stylingTips: this.getStyleTips(style.styleKey),
        culturalContext: this.getCulturalContext(style.styleKey),
        aiGenerated: true,
        prompt: style.prompt,
        timestamp: new Date().toISOString()
      }));

      return {
        success: true,
        styles: transformedResults,
        metadata: {
          ...result.metadata,
          generatedAt: new Date().toISOString(),
          preferences
        }
      };

    } catch (error) {
      console.error('AI Generation Error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Generation was cancelled');
      }
      
      throw new Error(`Failed to generate hairstyles: ${error.message}`);
    } finally {
      this.isGenerating = false;
      this.currentRequest = null;
    }
  }

  /**
   * Cancel current generation request
   */
  cancelGeneration() {
    if (this.currentRequest) {
      this.currentRequest.abort();
      this.isGenerating = false;
      this.currentRequest = null;
    }
  }

  /**
   * Get available style categories from backend
   */
  async getAvailableStyles() {
    try {
      const response = await fetch(`${this.baseURL}/api/styles`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching available styles:', error);
      throw new Error(`Failed to fetch available styles: ${error.message}`);
    }
  }

  /**
   * Check if AI service is available
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        timeout: 5000
      });
      
      return response.ok;
    } catch (error) {
      console.warn('AI service health check failed:', error);
      return false;
    }
  }

  // Helper methods for style metadata
  getStyleName(styleKey) {
    const styleNames = {
      'short_afro_fade': 'Short Afro Fade',
      'tapered_coils': 'Tapered Coils',
      'protective_braids': 'Protective Braids',
      'twist_out': 'Twist Out',
      'layered_waves': 'Layered Waves',
      'textured_crop': 'Textured Crop',
      'short_pixie': 'Pixie Cut',
      'long_layered': 'Long Layered',
      'sleek_bob': 'Sleek Bob',
      'curly_bob': 'Curly Bob',
      'wavy_lob': 'Wavy Lob',
      'thick_waves': 'Thick Waves',
      'voluminous_curls': 'Voluminous Curls',
      'undercut_fade': 'Undercut Fade',
      'buzz_cut': 'Buzz Cut'
    };
    return styleNames[styleKey] || 'Custom Style';
  }

  getStyleDescription(styleKey) {
    const descriptions = {
      'short_afro_fade': 'A modern take on the classic afro with a clean fade on the sides',
      'tapered_coils': 'Natural coils with a tapered cut that enhances your hair texture',
      'protective_braids': 'Stylish braids that protect your hair while looking amazing',
      'twist_out': 'Defined curls created from twist-out technique for natural hair',
      'layered_waves': 'Flowing waves with layers that add movement and dimension',
      'textured_crop': 'A contemporary crop with texture and modern styling',
      'short_pixie': 'A chic pixie cut that frames your face beautifully',
      'long_layered': 'Long hair with layers for volume and natural movement',
      'sleek_bob': 'A classic bob with sleek, straight styling',
      'curly_bob': 'A bob cut that celebrates your natural curl pattern',
      'wavy_lob': 'A long bob with natural waves for effortless style',
      'thick_waves': 'Voluminous waves that showcase thick hair texture',
      'voluminous_curls': 'Full, bouncy curls with maximum volume',
      'undercut_fade': 'Modern undercut with a gradual fade',
      'buzz_cut': 'Clean, low-maintenance buzz cut'
    };
    return descriptions[styleKey] || 'A unique hairstyle tailored to your features';
  }

  getStyleCategory(styleKey) {
    const categories = {
      'short_afro_fade': 'Short',
      'tapered_coils': 'Natural',
      'protective_braids': 'Protective',
      'twist_out': 'Natural',
      'layered_waves': 'Medium',
      'textured_crop': 'Short',
      'short_pixie': 'Short',
      'long_layered': 'Long',
      'sleek_bob': 'Medium',
      'curly_bob': 'Medium',
      'wavy_lob': 'Medium',
      'thick_waves': 'Long',
      'voluminous_curls': 'Long',
      'undercut_fade': 'Fade',
      'buzz_cut': 'Short'
    };
    return categories[styleKey] || 'Custom';
  }

  getStyleMaintenance(styleKey) {
    const maintenance = {
      'short_afro_fade': 'Medium',
      'tapered_coils': 'Low',
      'protective_braids': 'Low',
      'twist_out': 'Medium',
      'layered_waves': 'Medium',
      'textured_crop': 'Low',
      'short_pixie': 'Medium',
      'long_layered': 'High',
      'sleek_bob': 'High',
      'curly_bob': 'Medium',
      'wavy_lob': 'Medium',
      'thick_waves': 'High',
      'voluminous_curls': 'High',
      'undercut_fade': 'Medium',
      'buzz_cut': 'Low'
    };
    return maintenance[styleKey] || 'Medium';
  }

  getStyleLength(styleKey) {
    const lengths = {
      'short_afro_fade': 'Short',
      'tapered_coils': 'Short',
      'protective_braids': 'Varies',
      'twist_out': 'Medium',
      'layered_waves': 'Medium',
      'textured_crop': 'Short',
      'short_pixie': 'Very Short',
      'long_layered': 'Long',
      'sleek_bob': 'Medium',
      'curly_bob': 'Medium',
      'wavy_lob': 'Medium-Long',
      'thick_waves': 'Long',
      'voluminous_curls': 'Long',
      'undercut_fade': 'Short',
      'buzz_cut': 'Very Short'
    };
    return lengths[styleKey] || 'Medium';
  }

  getStyleDifficulty(styleKey) {
    const difficulty = {
      'short_afro_fade': 'Medium',
      'tapered_coils': 'Easy',
      'protective_braids': 'Hard',
      'twist_out': 'Medium',
      'layered_waves': 'Medium',
      'textured_crop': 'Easy',
      'short_pixie': 'Medium',
      'long_layered': 'Hard',
      'sleek_bob': 'Hard',
      'curly_bob': 'Medium',
      'wavy_lob': 'Medium',
      'thick_waves': 'Medium',
      'voluminous_curls': 'Hard',
      'undercut_fade': 'Medium',
      'buzz_cut': 'Easy'
    };
    return difficulty[styleKey] || 'Medium';
  }

  getStyleTips(styleKey) {
    const tips = {
      'short_afro_fade': [
        'Use a moisturizing cream daily',
        'Visit your barber every 2-3 weeks',
        'Sleep with a silk pillowcase'
      ],
      'tapered_coils': [
        'Define coils with leave-in conditioner',
        'Scrunch gently when drying',
        'Refresh with water spray'
      ],
      'protective_braids': [
        'Keep scalp moisturized',
        'Don\'t leave in longer than 8 weeks',
        'Sleep with a satin bonnet'
      ],
      'twist_out': [
        'Twist on damp hair',
        'Use a curl cream for definition',
        'Separate twists gently when dry'
      ],
      'layered_waves': [
        'Use a diffuser when blow-drying',
        'Apply wave-enhancing mousse',
        'Scrunch while drying'
      ],
      'textured_crop': [
        'Use texturizing paste for hold',
        'Style with fingers for natural look',
        'Trim every 4-6 weeks'
      ],
      'short_pixie': [
        'Style with a small amount of pomade',
        'Use a fine-tooth comb for precision',
        'Regular trims every 4 weeks'
      ],
      'long_layered': [
        'Use heat protectant before styling',
        'Deep condition weekly',
        'Trim ends every 6-8 weeks'
      ],
      'sleek_bob': [
        'Use a flat iron for sleek finish',
        'Apply smoothing serum',
        'Blow dry with a round brush'
      ],
      'curly_bob': [
        'Use curl-defining cream',
        'Plop with microfiber towel',
        'Avoid brushing when dry'
      ],
      'wavy_lob': [
        'Enhance waves with sea salt spray',
        'Air dry or use diffuser',
        'Scrunch out excess water'
      ],
      'thick_waves': [
        'Use a wide-tooth comb when wet',
        'Apply leave-in conditioner',
        'Avoid over-washing'
      ],
      'voluminous_curls': [
        'Use a curl-enhancing mousse',
        'Diffuse on low heat',
        'Sleep with a silk scarf'
      ],
      'undercut_fade': [
        'Style top with pomade or wax',
        'Maintain fade every 2-3 weeks',
        'Use a quality hair clipper'
      ],
      'buzz_cut': [
        'Moisturize scalp daily',
        'Use sunscreen on exposed scalp',
        'Maintain with clippers weekly'
      ]
    };
    return tips[styleKey] || ['Consult with your stylist for personalized care tips'];
  }

  getCulturalContext(styleKey) {
    const contexts = {
      'short_afro_fade': 'Celebrates natural African hair texture with modern barbering techniques',
      'tapered_coils': 'Honors natural curl patterns while providing a polished look',
      'protective_braids': 'Traditional African protective styling with contemporary flair',
      'twist_out': 'Natural hair technique popular in the African diaspora',
      'layered_waves': 'Versatile style suitable for various hair textures',
      'textured_crop': 'Modern European-inspired cut with textural elements',
      'short_pixie': 'Classic Western style with timeless appeal',
      'long_layered': 'Universal style that works across cultures',
      'sleek_bob': 'Sophisticated style with global appeal',
      'curly_bob': 'Celebrates natural curl patterns in a modern cut',
      'wavy_lob': 'Contemporary style popular across cultures',
      'thick_waves': 'Showcases natural hair volume and texture',
      'voluminous_curls': 'Celebrates full, natural curl patterns',
      'undercut_fade': 'Modern barbering technique with global influence',
      'buzz_cut': 'Minimalist style with practical and aesthetic appeal'
    };
    return contexts[styleKey] || 'A versatile style that celebrates individual beauty';
  }

  /**
   * Check if generation is currently in progress
   */
  isCurrentlyGenerating() {
    return this.isGenerating;
  }

  /**
   * Get the current API base URL
   */
  getAPIBaseURL() {
    return this.baseURL;
  }

  /**
   * Update the API base URL
   */
  setAPIBaseURL(newURL) {
    this.baseURL = newURL;
  }
}

// Create singleton instance
const aiService = new CutMatchAIService();

export default aiService;

// Export class for testing
export { CutMatchAIService };

