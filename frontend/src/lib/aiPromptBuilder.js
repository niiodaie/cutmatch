// AI Prompt Builder for FaceUp hairstyle recommendations
// This utility constructs prompts to send to AI services

/**
 * Builds a comprehensive prompt for AI hairstyle recommendations
 * @param {Object} options - Configuration options for the prompt
 * @param {string} options.imageData - Base64 encoded image data or image URL
 * @param {string} options.gender - User's gender preference
 * @param {string} options.ethnicity - User's ethnicity
 * @param {string} options.region - User's geographic region
 * @param {string} options.faceShape - User's face shape (if known)
 * @param {string} options.hairType - User's current hair type
 * @param {string} options.lifestyle - User's lifestyle preferences
 * @param {Array} options.preferences - Array of style preferences
 * @returns {string} Formatted prompt for AI service
 */
export const buildHairstylePrompt = (options = {}) => {
  const {
    imageData,
    gender = 'any',
    ethnicity = 'any',
    region = 'global',
    faceShape,
    hairType,
    lifestyle = 'versatile',
    preferences = []
  } = options;

  let prompt = "Analyze this photo and recommend 3-5 trendy hairstyles that would suit this person. ";

  // Add demographic context
  if (gender !== 'any') {
    prompt += `The person identifies as ${gender}. `;
  }

  if (ethnicity !== 'any') {
    prompt += `They are of ${ethnicity} background. `;
  }

  if (region !== 'global') {
    prompt += `They live in ${region}, so consider regional style trends. `;
  }

  // Add physical characteristics
  if (faceShape) {
    prompt += `Their face shape is ${faceShape}. `;
  }

  if (hairType) {
    prompt += `Their current hair type is ${hairType}. `;
  }

  // Add lifestyle preferences
  prompt += `They prefer ${lifestyle} styles. `;

  // Add specific preferences
  if (preferences.length > 0) {
    prompt += `They are particularly interested in: ${preferences.join(', ')}. `;
  }

  // Add output format requirements
  prompt += `

Please provide recommendations in the following format for each hairstyle:
- Name: [Hairstyle name]
- Description: [Brief description explaining why it suits them]
- Category: [Style category like "Protective Styles", "Classic Cuts", etc.]
- Difficulty: [Easy/Medium/Hard]
- Duration: [Time to style]
- Maintenance: [Low/Medium/High]
- Tips: [Styling or care tips]

Focus on styles that:
1. Complement their facial features
2. Work with their hair texture
3. Fit their lifestyle needs
4. Are currently trending
5. Are achievable with their hair type`;

  return prompt;
};

/**
 * Builds a prompt for face shape analysis
 * @param {string} imageData - Base64 encoded image data
 * @returns {string} Prompt for face shape detection
 */
export const buildFaceShapePrompt = (imageData) => {
  return `Analyze this photo and determine the person's face shape. 

Common face shapes include:
- Oval: Balanced proportions, slightly longer than wide
- Round: Equal width and length, soft curves
- Square: Strong jawline, equal width and length
- Heart: Wider forehead, narrower chin
- Diamond: Narrow forehead and chin, wider cheekbones
- Oblong: Longer than wide, similar to oval but more elongated

Please respond with:
1. The most likely face shape
2. Key facial features that led to this determination
3. Brief explanation of why this face shape was chosen

Be specific but concise in your analysis.`;
};

/**
 * Builds a prompt for hair type analysis
 * @param {string} imageData - Base64 encoded image data
 * @returns {string} Prompt for hair type detection
 */
export const buildHairTypePrompt = (imageData) => {
  return `Analyze this photo and determine the person's hair type and texture.

Hair type classifications:
- Type 1: Straight hair (1A fine, 1B medium, 1C coarse)
- Type 2: Wavy hair (2A loose waves, 2B more defined waves, 2C strong waves)
- Type 3: Curly hair (3A large curls, 3B springy curls, 3C tight curls)
- Type 4: Coily/Kinky hair (4A soft coils, 4B z-pattern, 4C tight coils)

Please respond with:
1. Hair type classification (e.g., 3B, 2A, etc.)
2. Hair texture (fine, medium, coarse)
3. Current length (short, medium, long)
4. Apparent condition (healthy, damaged, dry, etc.)
5. Any notable characteristics

This information will help provide better hairstyle recommendations.`;
};

/**
 * Builds a prompt for style preference analysis
 * @param {Object} userInputs - User's style preferences and lifestyle
 * @returns {string} Prompt for personalized recommendations
 */
export const buildStylePreferencePrompt = (userInputs) => {
  const {
    ageRange,
    profession,
    hobbies,
    styleIcons,
    timeForStyling,
    budgetRange,
    colorPreferences
  } = userInputs;

  let prompt = "Based on the following personal preferences, suggest hairstyles that would fit this person's lifestyle:\n\n";

  if (ageRange) prompt += `Age range: ${ageRange}\n`;
  if (profession) prompt += `Profession: ${profession}\n`;
  if (hobbies) prompt += `Hobbies/Activities: ${hobbies.join(', ')}\n`;
  if (styleIcons) prompt += `Style inspirations: ${styleIcons.join(', ')}\n`;
  if (timeForStyling) prompt += `Time available for daily styling: ${timeForStyling}\n`;
  if (budgetRange) prompt += `Budget for salon visits: ${budgetRange}\n`;
  if (colorPreferences) prompt += `Color preferences: ${colorPreferences}\n`;

  prompt += `\nPlease recommend hairstyles that:
1. Fit their professional requirements
2. Work with their available styling time
3. Complement their lifestyle and activities
4. Match their aesthetic preferences
5. Are within their maintenance capabilities

Provide 3-5 specific recommendations with explanations.`;

  return prompt;
};

/**
 * Validates image data before sending to AI
 * @param {string} imageData - Image data to validate
 * @returns {boolean} Whether the image data is valid
 */
export const validateImageData = (imageData) => {
  if (!imageData) return false;
  
  // Check if it's a valid base64 image
  if (imageData.startsWith('data:image/')) {
    return true;
  }
  
  // Check if it's a valid URL
  try {
    new URL(imageData);
    return true;
  } catch {
    return false;
  }
};

/**
 * Formats AI response for consistent display
 * @param {string} aiResponse - Raw response from AI service
 * @returns {Array} Formatted recommendations array
 */
export const formatAIResponse = (aiResponse) => {
  try {
    // If response is already JSON, parse it
    if (typeof aiResponse === 'string' && aiResponse.startsWith('{')) {
      return JSON.parse(aiResponse);
    }
    
    // Otherwise, parse text response into structured format
    const recommendations = [];
    const sections = aiResponse.split(/\d+\./);
    
    sections.forEach((section, index) => {
      if (section.trim() && index > 0) {
        const lines = section.trim().split('\n');
        const rec = {
          id: index,
          name: extractValue(lines, 'Name') || `Style ${index}`,
          description: extractValue(lines, 'Description') || section.substring(0, 100),
          category: extractValue(lines, 'Category') || 'General',
          difficulty: extractValue(lines, 'Difficulty') || 'Medium',
          duration: extractValue(lines, 'Duration') || '30-60 minutes',
          maintenance: extractValue(lines, 'Maintenance') || 'Medium',
          tips: extractValue(lines, 'Tips') || 'Consult with a professional stylist.',
          emoji: getStyleEmoji(extractValue(lines, 'Category'))
        };
        recommendations.push(rec);
      }
    });
    
    return recommendations;
  } catch (error) {
    console.error('Error formatting AI response:', error);
    return [];
  }
};

// Helper function to extract values from text
const extractValue = (lines, key) => {
  const line = lines.find(l => l.toLowerCase().includes(key.toLowerCase()));
  if (line) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      return line.substring(colonIndex + 1).trim();
    }
  }
  return null;
};

// Helper function to get emoji based on category
const getStyleEmoji = (category) => {
  const emojiMap = {
    'Protective Styles': '🧶',
    'Classic Cuts': '💇‍♀️',
    'Fades & Cuts': '✂️',
    'Natural Styles': '🌀',
    'Short Cuts': '✨',
    'Long Styles': '🌊',
    'Braids': '🧶',
    'Curls': '🌀',
    'Straight': '💫',
    'Color': '🎨'
  };
  
  return emojiMap[category] || '💇';
};

export default {
  buildHairstylePrompt,
  buildFaceShapePrompt,
  buildHairTypePrompt,
  buildStylePreferencePrompt,
  validateImageData,
  formatAIResponse
};

