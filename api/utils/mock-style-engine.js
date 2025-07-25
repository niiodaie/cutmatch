// Mock AI Style Engine for backend API
// This simulates the AI hairstyle recommendation system

const mockStyles = [
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
    products: ['curl-cream', 'edge-control', 'hair-oil']
  },
  {
    id: 'tapered-coils',
    name: 'Tapered Coils',
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
    products: ['leave-in-conditioner', 'natural-oil', 'wide-tooth-comb']
  },
  {
    id: 'layered-waves',
    name: 'Layered Waves',
    description: 'Soft layers that enhance natural wave patterns with movement and volume.',
    category: 'medium',
    suitableHairTypes: ['wavy', 'straight', 'curly'],
    suitableFaceShapes: ['oval', 'long', 'heart'],
    maintenance: 'medium',
    difficulty: 'medium',
    length: 'medium',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    tags: ['layers', 'waves', 'volume', 'feminine'],
    culturalContext: ['european', 'mixed-heritage', 'universal'],
    stylingTips: [
      'Use a diffuser when blow-drying to enhance waves',
      'Apply wave-enhancing mousse to damp hair',
      'Scrunch hair while drying for better definition'
    ],
    products: ['wave-mousse', 'diffuser', 'sea-salt-spray']
  },
  {
    id: 'textured-crop',
    name: 'Textured Crop',
    description: 'A modern short cut with textured layers that adds volume and style.',
    category: 'short',
    suitableHairTypes: ['straight', 'wavy'],
    suitableFaceShapes: ['oval', 'square', 'diamond'],
    maintenance: 'medium',
    difficulty: 'medium',
    length: 'short',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    tags: ['textured', 'modern', 'masculine', 'versatile'],
    culturalContext: ['european', 'universal'],
    stylingTips: [
      'Use texturizing paste for definition',
      'Style with fingers for a natural look',
      'Regular trims every 4-6 weeks'
    ],
    products: ['texturizing-paste', 'matte-pomade', 'styling-powder']
  },
  {
    id: 'long-locs',
    name: 'Long Locs',
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
    products: ['loc-gel', 'natural-oils', 'silk-scarf']
  },
  {
    id: 'buzz-cut',
    name: 'Buzz Cut',
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
    products: ['scalp-moisturizer', 'electric-clippers', 'aftershave-balm']
  },
  {
    id: 'protective-braids',
    name: 'Protective Braids',
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
    products: ['braid-spray', 'edge-control', 'satin-bonnet']
  },
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
    products: ['curl-cream', 'diffuser', 'microfiber-towel']
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
    
    return reasons;
  }

  // Get all available styles
  getAllStyles() {
    return this.styles;
  }

  // Get style by ID
  getStyleById(id) {
    return this.styles.find(style => style.id === id);
  }

  // Get trending styles (mock implementation)
  getTrendingStyles(limit = 10) {
    // Mock trending based on tags and popularity
    const trending = this.styles
      .filter(style => 
        style.tags.includes('modern') || 
        style.tags.includes('professional') ||
        style.tags.includes('versatile')
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);

    return trending.map(style => ({
      ...style,
      trendScore: Math.random() * 100 + 50 // Mock trend score
    }));
  }

  // Search styles by query
  searchStyles(query) {
    const searchTerm = query.toLowerCase();
    
    return this.styles.filter(style => 
      style.name.toLowerCase().includes(searchTerm) ||
      style.description.toLowerCase().includes(searchTerm) ||
      style.tags.some(tag => tag.includes(searchTerm)) ||
      style.category.includes(searchTerm)
    );
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

  // Get styles by maintenance level
  getStylesByMaintenance(maintenance) {
    return this.styles.filter(style => style.maintenance === maintenance.toLowerCase());
  }
}

const mockStyleEngine = new MockStyleEngine();

module.exports = { mockStyleEngine, MockStyleEngine };

