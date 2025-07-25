// Mock AI Style Engine for CutMatch
// This simulates AI-powered hairstyle recommendations based on face shape and hair type

const hairstyleDatabase = [
  {
    id: 1,
    name: "Short Afro Fade",
    hairType: "Curly/Coily",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    description: "A classic short afro with a clean fade on the sides. Perfect for showcasing natural texture while maintaining a professional look.",
    faceShapes: ["oval", "round", "square"],
    maintenance: "low",
    culturalStyle: "afro-caribbean"
  },
  {
    id: 2,
    name: "Tapered Coils",
    hairType: "Coily",
    thumbnail: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
    description: "Natural coils with a tapered cut that enhances curl pattern. Great for those who want to embrace their natural texture.",
    faceShapes: ["oval", "heart", "diamond"],
    maintenance: "medium",
    culturalStyle: "natural"
  },
  {
    id: 3,
    name: "Layered Waves",
    hairType: "Wavy",
    thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    description: "Soft layered waves that add movement and volume. Perfect for medium-length hair with natural wave patterns.",
    faceShapes: ["oval", "long", "heart"],
    maintenance: "medium",
    culturalStyle: "universal"
  },
  {
    id: 4,
    name: "Textured Crop",
    hairType: "Straight",
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    description: "A modern textured crop with subtle layers. Clean and contemporary style that works well for professional settings.",
    faceShapes: ["square", "oval", "diamond"],
    maintenance: "low",
    culturalStyle: "universal"
  },
  {
    id: 5,
    name: "Protective Braids",
    hairType: "Coily/Kinky",
    thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    description: "Elegant protective braids that promote hair health while looking stylish. Great for versatile styling options.",
    faceShapes: ["oval", "round", "heart"],
    maintenance: "low",
    culturalStyle: "african"
  },
  {
    id: 6,
    name: "Locs Updo",
    hairType: "Locked",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    description: "Sophisticated locs styled in an elegant updo. Perfect for formal occasions while celebrating natural hair.",
    faceShapes: ["oval", "long", "diamond"],
    maintenance: "medium",
    culturalStyle: "rastafarian"
  },
  {
    id: 7,
    name: "Buzz Cut",
    hairType: "Any",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    description: "Clean, minimalist buzz cut that's easy to maintain. Works with any hair type and face shape.",
    faceShapes: ["oval", "square", "diamond"],
    maintenance: "very low",
    culturalStyle: "universal"
  },
  {
    id: 8,
    name: "Curly Shag",
    hairType: "Curly",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    description: "Trendy shag cut that enhances natural curls with layers. Adds volume and movement to curly hair.",
    faceShapes: ["oval", "round", "heart"],
    maintenance: "medium",
    culturalStyle: "universal"
  }
];

// Simulate face shape detection (mock function)
const detectFaceShape = (imageUri) => {
  // In a real app, this would use AI/ML to analyze the image
  const faceShapes = ["oval", "round", "square", "heart", "diamond", "long"];
  return faceShapes[Math.floor(Math.random() * faceShapes.length)];
};

// Simulate hair type detection (mock function)
const detectHairType = (imageUri) => {
  // In a real app, this would analyze hair texture from the image
  const hairTypes = ["Straight", "Wavy", "Curly", "Coily", "Kinky"];
  return hairTypes[Math.floor(Math.random() * hairTypes.length)];
};

// Get style suggestions based on detected features
export const getStyleSuggestions = (imageUri = null, preferences = {}) => {
  // Simulate AI analysis
  const detectedFaceShape = detectFaceShape(imageUri);
  const detectedHairType = detectHairType(imageUri);
  
  // Filter styles based on detected features
  let suitableStyles = hairstyleDatabase.filter(style => {
    return style.faceShapes.includes(detectedFaceShape) || 
           style.hairType.toLowerCase().includes(detectedHairType.toLowerCase()) ||
           style.hairType === "Any";
  });

  // If no specific matches, return diverse selection
  if (suitableStyles.length < 3) {
    suitableStyles = hairstyleDatabase;
  }

  // Shuffle and return 4-5 suggestions
  const shuffled = suitableStyles.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(5, shuffled.length));
};

// Get all available styles (for browsing)
export const getAllStyles = () => {
  return hairstyleDatabase;
};

// Get style by ID
export const getStyleById = (id) => {
  return hairstyleDatabase.find(style => style.id === id);
};

// Get styles by hair type
export const getStylesByHairType = (hairType) => {
  return hairstyleDatabase.filter(style => 
    style.hairType.toLowerCase().includes(hairType.toLowerCase()) ||
    style.hairType === "Any"
  );
};

// Get styles by face shape
export const getStylesByFaceShape = (faceShape) => {
  return hairstyleDatabase.filter(style => 
    style.faceShapes.includes(faceShape.toLowerCase())
  );
};

