import Replicate from "replicate";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// CutMatch-specific hairstyle prompts with cultural diversity
const CUTMATCH_HAIRSTYLE_PROMPTS = {
  // African/Afro-textured styles
  'short_afro_fade': 'Photo of a person with a short afro fade haircut, natural texture, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  'tapered_coils': 'Photo of a person with tapered coils hairstyle, natural curly texture, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  'protective_braids': 'Photo of a person with protective box braids, neat and styled, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  'twist_out': 'Photo of a person with a twist-out hairstyle, defined curls, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  
  // Asian-inspired styles
  'layered_waves': 'Photo of a person with layered wavy hair, medium length, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  'textured_crop': 'Photo of a person with a textured crop haircut, modern styling, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  
  // European/Straight hair styles
  'short_pixie': 'Photo of a person with a short pixie cut with side bangs, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  'long_layered': 'Photo of a person with long layered hair, flowing naturally, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  'sleek_bob': 'Photo of a person with a sleek straight bob with center part, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  
  // Latino/Mixed texture styles
  'curly_bob': 'Photo of a person with a curly bob haircut, voluminous texture, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  'wavy_lob': 'Photo of a person with a wavy lob (long bob), natural movement, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  
  // Middle Eastern/Mediterranean styles
  'thick_waves': 'Photo of a person with thick wavy hair, shoulder length, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  'voluminous_curls': 'Photo of a person with voluminous curly hair, full texture, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  
  // Gender-neutral/Unisex styles
  'undercut_fade': 'Photo of a person with an undercut fade hairstyle, modern and clean, front view, smiling, high quality, photorealistic, studio lighting, professional headshot',
  'buzz_cut': 'Photo of a person with a buzz cut, very short and neat, front view, smiling, high quality, photorealistic, studio lighting, professional headshot'
};

// Style categories for CutMatch
const STYLE_CATEGORIES = {
  'protective': ['protective_braids', 'twist_out', 'tapered_coils'],
  'short': ['short_pixie', 'short_afro_fade', 'textured_crop', 'buzz_cut'],
  'medium': ['curly_bob', 'sleek_bob', 'wavy_lob', 'layered_waves'],
  'long': ['long_layered', 'thick_waves', 'voluminous_curls'],
  'fade': ['short_afro_fade', 'undercut_fade'],
  'natural': ['twist_out', 'tapered_coils', 'layered_waves', 'thick_waves']
};

// Function to get recommended styles based on user preferences
function getRecommendedStyles(preferences = {}) {
  const { category, hairType, faceShape, culturalBackground } = preferences;
  
  let recommendedStyles = [];
  
  // Base recommendations by category
  if (category && STYLE_CATEGORIES[category]) {
    recommendedStyles = [...STYLE_CATEGORIES[category]];
  } else {
    // Default diverse selection
    recommendedStyles = [
      'short_afro_fade', 'sleek_bob', 'layered_waves', 
      'curly_bob', 'textured_crop'
    ];
  }
  
  // Adjust based on cultural background
  if (culturalBackground) {
    switch (culturalBackground.toLowerCase()) {
      case 'african':
      case 'afro':
        recommendedStyles = ['short_afro_fade', 'tapered_coils', 'protective_braids', 'twist_out'];
        break;
      case 'asian':
        recommendedStyles = ['layered_waves', 'textured_crop', 'sleek_bob', 'wavy_lob'];
        break;
      case 'latino':
      case 'hispanic':
        recommendedStyles = ['curly_bob', 'wavy_lob', 'voluminous_curls', 'layered_waves'];
        break;
      case 'middle_eastern':
        recommendedStyles = ['thick_waves', 'voluminous_curls', 'layered_waves', 'sleek_bob'];
        break;
    }
  }
  
  // Ensure we have 3-5 styles
  if (recommendedStyles.length < 3) {
    const allStyles = Object.keys(CUTMATCH_HAIRSTYLE_PROMPTS);
    while (recommendedStyles.length < 3) {
      const randomStyle = allStyles[Math.floor(Math.random() * allStyles.length)];
      if (!recommendedStyles.includes(randomStyle)) {
        recommendedStyles.push(randomStyle);
      }
    }
  }
  
  return recommendedStyles.slice(0, 5); // Max 5 styles
}

// Function to format prompt with CutMatch branding
function formatCutMatchPrompt(basePrompt, userPreferences = {}) {
  // Remove any 'facup' references and ensure CutMatch branding
  let prompt = basePrompt.replace(/facup/gi, 'CutMatch');
  
  // Add CutMatch-specific styling cues
  const cutmatchSuffix = ', professional CutMatch hairstyle preview, clean background, high resolution';
  
  if (!prompt.includes('CutMatch')) {
    prompt = prompt.replace('Photo of a person', 'CutMatch hairstyle preview of a person');
  }
  
  return prompt + cutmatchSuffix;
}

export default async function handler(req, res) {
  // Enable CORS for frontend-backend interaction
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method Not Allowed',
      message: 'Only POST requests are supported'
    });
  }

  try {
    const form = new formidable.IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      keepExtensions: true,
    });
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ 
          error: 'Form parsing error',
          message: 'Error parsing uploaded data'
        });
      }

      // Validate image upload
      if (!files.image) {
        return res.status(400).json({ 
          error: 'No image provided',
          message: 'Please upload an image file'
        });
      }

      const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
      
      if (!imageFile || !imageFile.filepath) {
        return res.status(400).json({ 
          error: 'Invalid image file',
          message: 'The uploaded image file is invalid'
        });
      }

      try {
        // Read the uploaded image
        const uploadedImage = fs.readFileSync(imageFile.filepath);
        const imageBase64 = uploadedImage.toString('base64');
        
        // Parse user preferences
        const preferences = {
          category: fields.category?.[0] || fields.category,
          hairType: fields.hairType?.[0] || fields.hairType,
          faceShape: fields.faceShape?.[0] || fields.faceShape,
          culturalBackground: fields.culturalBackground?.[0] || fields.culturalBackground,
          customPrompt: fields.customPrompt?.[0] || fields.customPrompt
        };
        
        // Get recommended styles or use custom prompt
        let stylesToGenerate;
        if (preferences.customPrompt) {
          stylesToGenerate = [preferences.customPrompt];
        } else {
          const recommendedStyleKeys = getRecommendedStyles(preferences);
          stylesToGenerate = recommendedStyleKeys.map(key => CUTMATCH_HAIRSTYLE_PROMPTS[key]);
        }
        
        // Generate hairstyles using Replicate
        const generationPromises = stylesToGenerate.map(async (prompt, index) => {
          try {
            const formattedPrompt = formatCutMatchPrompt(prompt, preferences);
            
            console.log(`Generating style ${index + 1}:`, formattedPrompt);
            
            const output = await replicate.run(
              "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b", // SDXL model
              {
                input: {
                  image: `data:image/jpeg;base64,${imageBase64}`,
                  prompt: formattedPrompt,
                  negative_prompt: "blurry, low quality, distorted, facup, watermark, text, logo, signature",
                  num_inference_steps: 20,
                  guidance_scale: 7.5,
                  strength: 0.8,
                  width: 512,
                  height: 512
                }
              }
            );
            
            return {
              id: `cutmatch_style_${index + 1}`,
              prompt: formattedPrompt,
              image: output[0], // Replicate returns array of URLs
              styleKey: Object.keys(CUTMATCH_HAIRSTYLE_PROMPTS)[index] || `custom_${index}`,
              confidence: Math.random() * 0.3 + 0.7 // Mock confidence score 70-100%
            };
            
          } catch (styleError) {
            console.error(`Error generating style ${index + 1}:`, styleError);
            return {
              id: `cutmatch_style_${index + 1}`,
              error: styleError.message,
              styleKey: `error_${index}`
            };
          }
        });
        
        const results = await Promise.all(generationPromises);
        
        // Filter out failed generations
        const successfulResults = results.filter(result => !result.error);
        const failedResults = results.filter(result => result.error);
        
        if (successfulResults.length === 0) {
          return res.status(500).json({
            error: 'Generation failed',
            message: 'Unable to generate any hairstyles. Please try again.',
            details: failedResults
          });
        }
        
        // Clean up temporary file
        try {
          fs.unlinkSync(imageFile.filepath);
        } catch (cleanupError) {
          console.warn('Error cleaning up temp file:', cleanupError);
        }
        
        // Return successful results
        res.status(200).json({
          success: true,
          message: `Generated ${successfulResults.length} hairstyle${successfulResults.length > 1 ? 's' : ''}`,
          results: successfulResults,
          failed: failedResults.length,
          metadata: {
            preferences,
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            brand: 'CutMatch'
          }
        });
        
      } catch (replicateError) {
        console.error('Error from Replicate API:', replicateError);
        
        // Clean up temporary file
        try {
          if (imageFile && imageFile.filepath) {
            fs.unlinkSync(imageFile.filepath);
          }
        } catch (cleanupError) {
          console.warn('Error cleaning up temp file:', cleanupError);
        }
        
        res.status(500).json({ 
          error: 'AI generation failed',
          message: 'Error generating hairstyles with AI',
          details: replicateError.message
        });
      }
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    });
  }
}

// Export the hairstyle prompts for frontend use
export { CUTMATCH_HAIRSTYLE_PROMPTS, STYLE_CATEGORIES };

