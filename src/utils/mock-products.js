// Mock affiliate products for CutMatch
// These would be real Amazon affiliate links in production

const AFFILIATE_TAG = process.env.EXPO_PUBLIC_AMAZON_AFFILIATE_TAG || 'cutmatch-20';

export const mockProducts = {
  // Products for Short Afro Fade
  'short-afro-fade': [
    {
      id: 'product-1',
      name: 'SheaMoisture Curl Enhancing Smoothie',
      price: '$12.99',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B0038TVH9S?tag=${AFFILIATE_TAG}`,
      description: 'Perfect for defining curls and reducing frizz in natural hair.',
      category: 'styling'
    },
    {
      id: 'product-2',
      name: 'Wahl Professional Clipper Set',
      price: '$89.99',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B000JNQSIQ?tag=${AFFILIATE_TAG}`,
      description: 'Professional-grade clippers for maintaining fade cuts.',
      category: 'tools'
    }
  ],

  // Products for Tapered Coils
  'tapered-coils': [
    {
      id: 'product-3',
      name: 'Cantu Curl Activator Cream',
      price: '$8.99',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B00LQKBQ7Y?tag=${AFFILIATE_TAG}`,
      description: 'Enhances natural curl pattern and adds moisture.',
      category: 'styling'
    },
    {
      id: 'product-4',
      name: 'Wide Tooth Comb Set',
      price: '$15.99',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B07QXZXQXQ?tag=${AFFILIATE_TAG}`,
      description: 'Gentle detangling for curly and coily hair.',
      category: 'tools'
    }
  ],

  // Products for Layered Waves
  'layered-waves': [
    {
      id: 'product-5',
      name: 'Moroccanoil Treatment',
      price: '$34.99',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B00EAELQR8?tag=${AFFILIATE_TAG}`,
      description: 'Nourishing oil treatment for smooth, shiny waves.',
      category: 'treatment'
    },
    {
      id: 'product-6',
      name: 'Diffuser Hair Dryer Attachment',
      price: '$24.99',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B08XQXQXQX?tag=${AFFILIATE_TAG}`,
      description: 'Perfect for enhancing natural wave patterns.',
      category: 'tools'
    }
  ],

  // Products for Textured Crop
  'textured-crop': [
    {
      id: 'product-7',
      name: 'American Crew Fiber',
      price: '$16.99',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B0008IV7BU?tag=${AFFILIATE_TAG}`,
      description: 'Strong hold styling fiber for textured looks.',
      category: 'styling'
    },
    {
      id: 'product-8',
      name: 'Texture Spray',
      price: '$19.99',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B07XYXYXYX?tag=${AFFILIATE_TAG}`,
      description: 'Adds volume and texture to fine hair.',
      category: 'styling'
    }
  ],

  // Products for Long Locs
  'long-locs': [
    {
      id: 'product-9',
      name: 'Jamaican Black Castor Oil',
      price: '$13.99',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B00EAELQR8?tag=${AFFILIATE_TAG}`,
      description: 'Promotes healthy hair growth and moisturizes locs.',
      category: 'treatment'
    },
    {
      id: 'product-10',
      name: 'Silk Pillowcase',
      price: '$29.99',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B08XYXYXYX?tag=${AFFILIATE_TAG}`,
      description: 'Reduces friction and maintains hairstyle while sleeping.',
      category: 'accessories'
    }
  ],

  // Products for Buzz Cut
  'buzz-cut': [
    {
      id: 'product-11',
      name: 'Scalp Moisturizer',
      price: '$18.99',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B07QXZXQXQ?tag=${AFFILIATE_TAG}`,
      description: 'Keeps scalp healthy and moisturized.',
      category: 'treatment'
    },
    {
      id: 'product-12',
      name: 'Electric Razor',
      price: '$79.99',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B000JNQSIQ?tag=${AFFILIATE_TAG}`,
      description: 'Precision trimming for maintaining buzz cuts.',
      category: 'tools'
    }
  ],

  // Products for Protective Braids
  'protective-braids': [
    {
      id: 'product-13',
      name: 'Edge Control Gel',
      price: '$9.99',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B00LQKBQ7Y?tag=${AFFILIATE_TAG}`,
      description: 'Smooths edges and baby hairs for polished braided styles.',
      category: 'styling'
    },
    {
      id: 'product-14',
      name: 'Satin Hair Scarf',
      price: '$12.99',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B08XYXYXYX?tag=${AFFILIATE_TAG}`,
      description: 'Protects braids and maintains style overnight.',
      category: 'accessories'
    }
  ],

  // Products for Curly Bob
  'curly-bob': [
    {
      id: 'product-15',
      name: 'DevaCurl SuperCream',
      price: '$28.99',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B00EAELQR8?tag=${AFFILIATE_TAG}`,
      description: 'Defines curls and reduces frizz for bob styles.',
      category: 'styling'
    },
    {
      id: 'product-16',
      name: 'Microfiber Hair Towel',
      price: '$14.99',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
      affiliateLink: `https://www.amazon.com/dp/B07QXZXQXQ?tag=${AFFILIATE_TAG}`,
      description: 'Gentle drying that preserves curl pattern.',
      category: 'accessories'
    }
  ]
};

// Function to get products for a specific hairstyle
export const getProductsForStyle = (styleId) => {
  return mockProducts[styleId] || [];
};

// Function to get all products
export const getAllProducts = () => {
  return Object.values(mockProducts).flat();
};

// Function to get products by category
export const getProductsByCategory = (category) => {
  return getAllProducts().filter(product => product.category === category);
};

// Function to track affiliate click (integrates with analytics)
export const trackAffiliateClick = (product) => {
  // This would integrate with your analytics system
  console.log('Affiliate click tracked:', product.name);
  
  // In a real app, you might want to:
  // 1. Log to analytics
  // 2. Track conversion
  // 3. Update user preferences
  
  return product.affiliateLink;
};

// Premium product bundles for Pro users
export const premiumBundles = {
  'complete-care-kit': {
    id: 'bundle-1',
    name: 'Complete Hair Care Kit',
    originalPrice: '$89.97',
    bundlePrice: '$69.99',
    savings: '$19.98',
    products: ['product-1', 'product-9', 'product-10'],
    description: 'Everything you need for healthy, styled hair.',
    proOnly: true
  },
  'styling-essentials': {
    id: 'bundle-2',
    name: 'Styling Essentials Bundle',
    originalPrice: '$67.97',
    bundlePrice: '$54.99',
    savings: '$12.98',
    products: ['product-5', 'product-7', 'product-16'],
    description: 'Professional styling tools and products.',
    proOnly: true
  }
};

export default mockProducts;

