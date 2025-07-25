// Mock AI Style Engine for CutMatch
// This simulates the AI hairstyle recommendation system with diverse, inclusive styles

const mockStyles = [
  // African/Afro-Caribbean Styles
  {
    id: 'short-afro-fade',
    name: 'Short Afro Fade',
    description: 'A modern fade cut that maintains natural texture on top with gradually shorter sides.',
    category: 'short',
    suitableHairTypes: ['coily', 'kinky', 'curly'],
    suitableFaceShapes: ['oval', 'round', 'square'],
    maintenance: 'medium',
    difficulty: 'easy',
    length: 'short',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    tags: ['fade', 'natural', 'professional', 'modern'],
    culturalContext: ['african-american', 'afro-caribbean'],
    stylingTips: [
      'Use a curl enhancing cream for definition',
      'Regular trims every 2-3 weeks to maintain the fade',
      'Sleep with a satin pillowcase to preserve texture'
    ],
    genderExpression: ['masculine', 'neutral']
  },
  {
    id: 'tapered-coils',
    name: 'Tapered Natural Coils',
    description: 'Natural coils with a subtle taper that enhances your curl pattern.',
    category: 'medium',
    suitableHairTypes: ['coily', 'kinky'],
    suitableFaceShapes: ['oval', 'heart', 'diamond'],
    maintenance: 'low',
    difficulty: 'easy',
    length: 'medium',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop',
    tags: ['natural', 'coils', 'low-maintenance', 'protective'],
    culturalContext: ['african-american', 'mixed-heritage'],
    stylingTips: [
      'Moisturize regularly with leave-in conditioner',
      'Use the LOC method (liquid, oil, cream)',
      'Detangle gently with wide-tooth comb when wet'
    ],
    genderExpression: ['feminine', 'neutral']
  },
  {
    id: 'protective-braids',
    name: 'Protective Box Braids',
    description: 'Traditional braiding styles that protect natural hair while looking beautiful.',
    category: 'long',
    suitableHairTypes: ['coily', 'kinky', 'curly'],
    suitableFaceShapes: ['oval', 'round', 'heart'],
    maintenance: 'low',
    difficulty: 'hard',
    length: 'long',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=300&fit=crop',
    tags: ['braids', 'protective', 'cultural', 'versatile'],
    culturalContext: ['african-american', 'african', 'afro-caribbean'],
    stylingTips: [
      'Keep scalp clean and moisturized',
      'Sleep with a satin bonnet or pillowcase',
      'Take down after 6-8 weeks maximum'
    ],
    genderExpression: ['feminine', 'neutral']
  },
  {
    id: 'long-locs',
    name: 'Mature Locs',
    description: 'Beautiful mature locs that celebrate natural hair texture and cultural heritage.',
    category: 'long',
    suitableHairTypes: ['coily', 'kinky', 'curly'],
    suitableFaceShapes: ['oval', 'long', 'heart'],
    maintenance: 'low',
    difficulty: 'easy',
    length: 'long',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop',
    tags: ['locs', 'natural', 'protective', 'cultural'],
    culturalContext: ['african-american', 'rastafarian', 'afro-caribbean'],
    stylingTips: [
      'Palm roll roots monthly for maintenance',
      'Use natural oils to keep scalp moisturized',
      'Sleep with a silk or satin scarf'
    ],
    genderExpression: ['masculine', 'feminine', 'neutral']
  },

  // Asian Styles
  {
    id: 'layered-waves',
    name: 'Soft Layered Waves',
    description: 'Soft layers that enhance natural wave patterns with movement and volume.',
    category: 'medium',
    suitableHairTypes: ['wavy', 'straight', 'curly'],
    suitableFaceShapes: ['oval', 'long', 'heart'],
    maintenance: 'medium',
    difficulty: 'medium',
    length: 'medium',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    tags: ['layers', 'waves', 'volume', 'feminine'],
    culturalContext: ['asian', 'mixed-heritage', 'universal'],
    stylingTips: [
      'Use a diffuser when blow-drying to enhance waves',
      'Apply wave-enhancing mousse to damp hair',
      'Scrunch hair while drying for better definition'
    ],
    genderExpression: ['feminine', 'neutral']
  },
  {
    id: 'textured-crop',
    name: 'Textured Asian Crop',
    description: 'A modern short cut with textured layers that adds volume and style.',
    category: 'short',
    suitableHairTypes: ['straight', 'wavy'],
    suitableFaceShapes: ['oval', 'square', 'diamond'],
    maintenance: 'medium',
    difficulty: 'medium',
    length: 'short',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    tags: ['textured', 'modern', 'masculine', 'versatile'],
    culturalContext: ['asian', 'universal'],
    stylingTips: [
      'Use texturizing paste for definition',
      'Style with fingers for a natural look',
      'Regular trims every 4-6 weeks'
    ],
    genderExpression: ['masculine', 'neutral']
  },
  {
    id: 'straight-bob',
    name: 'Classic Straight Bob',
    description: 'A timeless bob cut that works beautifully with straight hair.',
    category: 'medium',
    suitableHairTypes: ['straight', 'wavy'],
    suitableFaceShapes: ['oval', 'heart', 'square'],
    maintenance: 'medium',
    difficulty: 'medium',
    length: 'medium',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    tags: ['bob', 'classic', 'professional', 'chic'],
    culturalContext: ['asian', 'universal'],
    stylingTips: [
      'Use a flat iron for sleek finish',
      'Apply heat protectant before styling',
      'Trim every 6-8 weeks to maintain shape'
    ],
    genderExpression: ['feminine', 'neutral']
  },

  // Middle Eastern Styles
  {
    id: 'voluminous-curls',
    name: 'Voluminous Natural Curls',
    description: 'Embrace your natural curls with volume and definition.',
    category: 'medium',
    suitableHairTypes: ['curly', 'wavy'],
    suitableFaceShapes: ['oval', 'long', 'heart'],
    maintenance: 'medium',
    difficulty: 'medium',
    length: 'medium',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop',
    tags: ['curls', 'volume', 'natural', 'bouncy'],
    culturalContext: ['middle-eastern', 'mediterranean', 'mixed-heritage'],
    stylingTips: [
      'Use curl-defining cream on damp hair',
      'Diffuse dry or air dry for best results',
      'Avoid brushing when dry to prevent frizz'
    ],
    genderExpression: ['feminine', 'neutral']
  },
  {
    id: 'hijab-friendly-layers',
    name: 'Hijab-Friendly Layers',
    description: 'Layered cut designed to look beautiful both with and without hijab.',
    category: 'medium',
    suitableHairTypes: ['straight', 'wavy', 'curly'],
    suitableFaceShapes: ['oval', 'round', 'heart'],
    maintenance: 'low',
    difficulty: 'easy',
    length: 'medium',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    tags: ['hijab-friendly', 'layers', 'modest', 'versatile'],
    culturalContext: ['middle-eastern', 'muslim', 'modest'],
    stylingTips: [
      'Focus on face-framing layers',
      'Use lightweight products to avoid weighing down hair',
      'Consider the hijab style when cutting'
    ],
    genderExpression: ['feminine']
  },

  // Latino/Hispanic Styles
  {
    id: 'beachy-waves',
    name: 'Beachy Waves',
    description: 'Effortless waves that capture that perfect beach hair look.',
    category: 'medium',
    suitableHairTypes: ['wavy', 'curly', 'straight'],
    suitableFaceShapes: ['oval', 'heart', 'diamond'],
    maintenance: 'low',
    difficulty: 'easy',
    length: 'medium',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    tags: ['waves', 'beachy', 'effortless', 'casual'],
    culturalContext: ['latino', 'universal'],
    stylingTips: [
      'Use sea salt spray for texture',
      'Scrunch hair while damp',
      'Let air dry for natural waves'
    ],
    genderExpression: ['feminine', 'neutral']
  },
  {
    id: 'buzz-cut',
    name: 'Clean Buzz Cut',
    description: 'A clean, low-maintenance cut that works for any hair type and face shape.',
    category: 'short',
    suitableHairTypes: ['straight', 'wavy', 'curly', 'coily'],
    suitableFaceShapes: ['oval', 'square', 'round'],
    maintenance: 'low',
    difficulty: 'easy',
    length: 'very-short',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    tags: ['buzz', 'minimal', 'clean', 'universal'],
    culturalContext: ['universal'],
    stylingTips: [
      'Use electric clippers for even length',
      'Moisturize scalp regularly',
      'Touch up every 1-2 weeks'
    ],
    genderExpression: ['masculine', 'neutral', 'fluid']
  },

  // Gender-Neutral/Fluid Styles
  {
    id: 'androgynous-pixie',
    name: 'Androgynous Pixie',
    description: 'A versatile pixie cut that works for any gender expression.',
    category: 'short',
    suitableHairTypes: ['straight', 'wavy', 'curly'],
    suitableFaceShapes: ['oval', 'heart', 'diamond'],
    maintenance: 'medium',
    difficulty: 'medium',
    length: 'short',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    tags: ['pixie', 'androgynous', 'edgy', 'versatile'],
    culturalContext: ['universal'],
    stylingTips: [
      'Use texturizing wax for definition',
      'Style differently for various looks',
      'Regular trims every 4-6 weeks'
    ],
    genderExpression: ['neutral', 'fluid', 'masculine', 'feminine']
  },
  {
    id: 'shoulder-length-shag',
    name: 'Modern Shag',
    description: 'A contemporary take on the classic shag with layers and movement.',
    category: 'medium',
    suitableHairTypes: ['wavy', 'straight', 'curly'],
    suitableFaceShapes: ['oval', 'long', 'heart'],
    maintenance: 'medium',
    difficulty: 'medium',
    length: 'medium',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    tags: ['shag', 'layers', 'modern', 'textured'],
    culturalContext: ['universal'],
    stylingTips: [
      'Use volumizing mousse for texture',
      'Scrunch or tousle for casual look',
      'Can be styled sleek or messy'
    ],
    genderExpression: ['neutral', 'fluid', 'feminine']
  },

  // Curly Hair Specialists
  {
    id: 'curly-bob',
    name: 'Curly Bob',
    description: 'A chic bob cut that enhances natural curls with a modern, sophisticated look.',
    category: 'medium',
    suitableHairTypes: ['curly', 'wavy'],
    suitableFaceShapes: ['oval', 'heart', 'square'],
    maintenance: 'medium',
    difficulty: 'medium',
    length: 'medium',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    tags: ['bob', 'curly', 'chic', 'professional'],
    culturalContext: ['universal', 'mixed-heritage'],
    stylingTips: [
      'Use curl-defining cream on damp hair',
      'Diffuse dry or air dry for best results',
      'Trim every 6-8 weeks to maintain shape'
    ],
    genderExpression: ['feminine', 'neutral']
  },
  {
    id: 'twist-out',
    name: 'Twist-Out Style',
    description: 'A protective style that creates beautiful defined curls and waves.',
    category: 'medium',
    suitableHairTypes: ['coily', 'kinky', 'curly'],
    suitableFaceShapes: ['oval', 'round', 'heart'],
    maintenance: 'low',
    difficulty: 'easy',
    length: 'medium',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop',
    tags: ['twist-out', 'protective', 'natural', 'defined'],
    culturalContext: ['african-american', 'mixed-heritage'],
    stylingTips: [
      'Apply leave-in conditioner to damp hair',
      'Twist sections and let dry overnight',
      'Gently separate twists in the morning'
    ],
    genderExpression: ['feminine', 'neutral']
  }
];

class MockStyleEngine {
  constructor() {
    this.styles = mockStyles;
  }

  // Get style suggestions based on analysis data
  getSuggestions(analysisData) {
    const { faceShape, hairType, preferences = {} } = analysisData;
    
    let suitableStyles = this.styles.filter(style => {
      // Filter by hair type
      const hairTypeMatch = style.suitableHairTypes.includes(hairType.toLowerCase());
      
      // Filter by face shape
      const faceShapeMatch = style.suitableFaceShapes.includes(faceShape.toLowerCase());
      
      return hairTypeMatch && faceShapeMatch;
    });

    // Apply preferences if provided
    if (preferences.length) {
      suitableStyles = suitableStyles.filter(style => 
        style.length === preferences.length
      );
    }

    if (preferences.maintenance) {
      suitableStyles = suitableStyles.filter(style => 
        style.maintenance === preferences.maintenance
      );
    }

    if (preferences.category) {
      suitableStyles = suitableStyles.filter(style => 
        style.category === preferences.category
      );
    }

    if (preferences.genderExpression) {
      suitableStyles = suitableStyles.filter(style => 
        style.genderExpression.includes(preferences.genderExpression)
      );
    }

    // Shuffle and return top 3-5 suggestions
    const shuffled = suitableStyles.sort(() => 0.5 - Math.random());
    const suggestions = shuffled.slice(0, Math.min(5, shuffled.length));

    // Add confidence scores
    return suggestions.map((style, index) => ({
      ...style,
      confidence: Math.max(0.6, 0.95 - (index * 0.1)), // Decreasing confidence
      matchReasons: this.getMatchReasons(style, analysisData)
    }));
  }

  // Get suggestions with filters applied
  getSuggestionsWithFilters(analysisData, filters) {
    let filteredStyles = [...this.styles];

    // Apply filters
    if (filters.mood) {
      filteredStyles = filteredStyles.filter(style => 
        style.tags.includes(filters.mood)
      );
    }

    if (filters.event) {
      const eventTags = {
        'everyday': ['casual', 'low-maintenance', 'natural'],
        'wedding': ['elegant', 'formal', 'chic'],
        'party': ['edgy', 'modern', 'bold'],
        'formal': ['professional', 'classic', 'sophisticated']
      };
      
      if (eventTags[filters.event]) {
        filteredStyles = filteredStyles.filter(style => 
          eventTags[filters.event].some(tag => style.tags.includes(tag))
        );
      }
    }

    if (filters.season) {
      const seasonalStyles = {
        'spring': ['fresh', 'light', 'natural'],
        'summer': ['beachy', 'effortless', 'low-maintenance'],
        'fall': ['textured', 'layered', 'warm'],
        'winter': ['protective', 'cozy', 'elegant']
      };
      
      if (seasonalStyles[filters.season]) {
        filteredStyles = filteredStyles.filter(style => 
          seasonalStyles[filters.season].some(tag => style.tags.includes(tag))
        );
      }
    }

    if (filters.hairType) {
      filteredStyles = filteredStyles.filter(style => 
        style.suitableHairTypes.includes(filters.hairType)
      );
    }

    // Apply face shape and other analysis data
    filteredStyles = filteredStyles.filter(style => {
      const faceShapeMatch = style.suitableFaceShapes.includes(analysisData.faceShape.toLowerCase());
      return faceShapeMatch;
    });

    // Shuffle and return results
    const shuffled = filteredStyles.sort(() => 0.5 - Math.random());
    const suggestions = shuffled.slice(0, Math.min(5, shuffled.length));

    return suggestions.map((style, index) => ({
      ...style,
      confidence: Math.max(0.6, 0.95 - (index * 0.1)),
      matchReasons: this.getMatchReasons(style, analysisData)
    }));
  }

  // Get reasons why a style matches the user
  getMatchReasons(style, analysisData) {
    const reasons = [];
    
    if (style.suitableHairTypes.includes(analysisData.hairType.toLowerCase())) {
      reasons.push(`Perfect for ${analysisData.hairType} hair`);
    }
    
    if (style.suitableFaceShapes.includes(analysisData.faceShape.toLowerCase())) {
      reasons.push(`Complements ${analysisData.faceShape} face shape`);
    }
    
    if (style.maintenance === 'low') {
      reasons.push('Low maintenance styling');
    }
    
    if (style.tags.includes('professional')) {
      reasons.push('Professional appearance');
    }

    if (style.culturalContext.includes('universal')) {
      reasons.push('Universally flattering');
    }
    
    return reasons;
  }

  // Get random suggestions
  getRandomSuggestions(analysisData, count = 5) {
    const shuffled = [...this.styles].sort(() => 0.5 - Math.random());
    const suggestions = shuffled.slice(0, count);

    return suggestions.map((style, index) => ({
      ...style,
      confidence: Math.max(0.6, 0.95 - (index * 0.1)),
      matchReasons: this.getMatchReasons(style, analysisData)
    }));
  }

  // Get all available styles
  getAllStyles() {
    return this.styles;
  }

  // Get style by ID
  getStyleById(id) {
    return this.styles.find(style => style.id === id);
  }

  // Get styles by category
  getStylesByCategory(category) {
    return this.styles.filter(style => style.category === category.toLowerCase());
  }

  // Get styles by hair type
  getStylesByHairType(hairType) {
    return this.styles.filter(style => 
      style.suitableHairTypes.includes(hairType.toLowerCase())
    );
  }

  // Get styles by cultural context
  getStylesByCulturalContext(context) {
    return this.styles.filter(style => 
      style.culturalContext.includes(context.toLowerCase())
    );
  }

  // Get styles by gender expression
  getStylesByGenderExpression(expression) {
    return this.styles.filter(style => 
      style.genderExpression.includes(expression.toLowerCase())
    );
  }

  // Search styles by query
  searchStyles(query) {
    const searchTerm = query.toLowerCase();
    
    return this.styles.filter(style => 
      style.name.toLowerCase().includes(searchTerm) ||
      style.description.toLowerCase().includes(searchTerm) ||
      style.tags.some(tag => tag.includes(searchTerm)) ||
      style.category.includes(searchTerm) ||
      style.culturalContext.some(context => context.includes(searchTerm))
    );
  }
}

const mockStyleEngine = new MockStyleEngine();

export { mockStyleEngine, MockStyleEngine };

