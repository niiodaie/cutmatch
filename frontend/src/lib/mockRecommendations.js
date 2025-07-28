// Mock recommendations for FaceUp AI hairstyle suggestions
export const mockRecommendations = [
  {
    id: 1,
    name: "Box Braids",
    description: "Protective and stylish, suits oval faces and afro-textured hair. Perfect for low-maintenance styling while protecting natural hair.",
    emoji: "🧶",
    category: "Protective Styles",
    difficulty: "Medium",
    duration: "3-4 hours",
    maintenance: "Low",
    suitableFor: ["Oval faces", "Afro-textured hair", "Long hair"],
    tips: "Use moisturizing products to keep scalp healthy. Can last 6-8 weeks with proper care."
  },
  {
    id: 2,
    name: "French Bob",
    description: "Chic and low-maintenance, works well for straight or wavy textures. A timeless cut that frames the face beautifully.",
    emoji: "💇‍♀️",
    category: "Classic Cuts",
    difficulty: "Easy",
    duration: "45 minutes",
    maintenance: "Medium",
    suitableFor: ["Round faces", "Straight hair", "Wavy hair"],
    tips: "Regular trims every 6-8 weeks maintain the shape. Style with a round brush for volume."
  },
  {
    id: 3,
    name: "Tapered Fade",
    description: "A clean fade for a sharp, confident look. Great for short curls and provides a professional appearance.",
    emoji: "✂️",
    category: "Fades & Cuts",
    difficulty: "Hard",
    duration: "1 hour",
    maintenance: "High",
    suitableFor: ["Square faces", "Curly hair", "Short hair"],
    tips: "Requires touch-ups every 2-3 weeks. Use curl cream to define texture on top."
  },
  {
    id: 4,
    name: "Twist Out",
    description: "Natural styling technique that creates defined curls and volume. Perfect for showcasing natural texture.",
    emoji: "🌀",
    category: "Natural Styles",
    difficulty: "Easy",
    duration: "30 minutes + overnight",
    maintenance: "Low",
    suitableFor: ["Heart faces", "Natural hair", "Medium length"],
    tips: "Apply leave-in conditioner before twisting. Sleep with a silk scarf for best results."
  },
  {
    id: 5,
    name: "Pixie Cut",
    description: "Bold and modern short cut that's perfect for busy lifestyles. Emphasizes facial features beautifully.",
    emoji: "✨",
    category: "Short Cuts",
    difficulty: "Medium",
    duration: "1 hour",
    maintenance: "Medium",
    suitableFor: ["Oval faces", "Fine hair", "All textures"],
    tips: "Use texturizing products for added volume. Regular trims every 4-6 weeks keep it fresh."
  }
];

// Function to get random recommendations (simulating AI selection)
export const getRandomRecommendations = (count = 3) => {
  const shuffled = [...mockRecommendations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to filter recommendations based on user preferences
export const getFilteredRecommendations = (filters = {}) => {
  let filtered = [...mockRecommendations];
  
  if (filters.faceShape) {
    filtered = filtered.filter(rec => 
      rec.suitableFor.some(suit => 
        suit.toLowerCase().includes(filters.faceShape.toLowerCase())
      )
    );
  }
  
  if (filters.hairType) {
    filtered = filtered.filter(rec => 
      rec.suitableFor.some(suit => 
        suit.toLowerCase().includes(filters.hairType.toLowerCase())
      )
    );
  }
  
  if (filters.maintenance) {
    filtered = filtered.filter(rec => 
      rec.maintenance.toLowerCase() === filters.maintenance.toLowerCase()
    );
  }
  
  return filtered.length > 0 ? filtered : mockRecommendations.slice(0, 3);
};

// Simulate AI processing delay
export const simulateAIProcessing = async (delay = 2000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getRandomRecommendations());
    }, delay);
  });
};

