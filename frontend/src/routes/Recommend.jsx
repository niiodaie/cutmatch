import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Loader2, ArrowLeft, Settings, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { simulateAIProcessing, getFilteredRecommendations } from '../lib/mockRecommendations';
import { buildHairstylePrompt } from '../lib/aiPromptBuilder';
import RecommendationCard from '../components/RecommendationCard';

const Recommend = ({ onBack }) => {
  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  // User preferences
  const [preferences, setPreferences] = useState({
    gender: '',
    ethnicity: '',
    region: '',
    faceShape: '',
    hairType: '',
    lifestyle: 'versatile'
  });

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
        setPhotoFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoFile(null);
    setRecommendations([]);
  };

  const handleSubmit = async () => {
    if (!photo) return;

    setIsLoading(true);
    
    try {
      // Build AI prompt with user preferences
      const prompt = buildHairstylePrompt({
        imageData: photo,
        ...preferences
      });
      
      console.log('Generated AI Prompt:', prompt);
      
      // Simulate AI processing with filtered recommendations
      const results = await simulateAIProcessing(2500);
      
      // Apply user preferences to filter results
      const filteredResults = getFilteredRecommendations(preferences);
      
      setRecommendations(filteredResults.length > 0 ? filteredResults : results);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // Fallback to default recommendations
      const fallbackResults = await simulateAIProcessing(1000);
      setRecommendations(fallbackResults);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-600 hover:text-indigo-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Find Your Perfect Hairstyle
              </h1>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreferences(!showPreferences)}
              className="border-indigo-200 text-indigo-600"
            >
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Preferences Panel */}
        <AnimatePresence>
          {showPreferences && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-indigo-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personalization Preferences
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <Select value={preferences.gender} onValueChange={(value) => updatePreference('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="woman">Woman</SelectItem>
                        <SelectItem value="man">Man</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hair Type
                    </label>
                    <Select value={preferences.hairType} onValueChange={(value) => updatePreference('hairType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hair type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="straight">Straight</SelectItem>
                        <SelectItem value="wavy">Wavy</SelectItem>
                        <SelectItem value="curly">Curly</SelectItem>
                        <SelectItem value="coily">Coily/Kinky</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lifestyle
                    </label>
                    <Select value={preferences.lifestyle} onValueChange={(value) => updatePreference('lifestyle', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lifestyle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low-maintenance">Low Maintenance</SelectItem>
                        <SelectItem value="versatile">Versatile</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="trendy">Trendy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photo Upload Section */}
        {!photo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-8 bg-white/70 backdrop-blur-sm border-indigo-100">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Upload Your Photo
                </h2>
                <p className="text-gray-600">
                  Take a clear photo or upload an existing one for the best recommendations
                </p>
              </div>

              {/* Drag and Drop Area */}
              <div
                className={`photo-upload-area rounded-2xl p-12 text-center transition-all duration-300 ${
                  isDragOver ? 'dragover' : ''
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Drag and drop your photo here
                    </h3>
                    <p className="text-gray-500 mb-6">
                      or choose from the options below
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => cameraInputRef.current?.click()}
                      className="btn-faceup-primary"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Take Photo
                    </Button>
                    
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload from Device
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hidden File Inputs */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleCameraCapture}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </Card>
          </motion.div>
        )}

        {/* Photo Preview and Analysis */}
        {photo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-indigo-100">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Photo
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removePhoto}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={photo}
                    alt="Uploaded photo"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Ready for Analysis
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Our AI will analyze your facial features, hair type, and the preferences you've set to provide personalized recommendations.
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="btn-faceup-primary w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get My Recommendations
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="loading-spinner mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Analyzing Your Photo...
            </h3>
            <p className="text-gray-600">
              Our AI is studying your features to find the perfect hairstyles for you
            </p>
          </motion.div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Personalized Recommendations
              </h2>
              <p className="text-gray-600">
                Based on your photo and preferences, here are the perfect hairstyles for you
              </p>
            </div>

            <div className="grid gap-6">
              {recommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RecommendationCard recommendation={recommendation} />
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={removePhoto}
                variant="outline"
                className="border-indigo-200 text-indigo-600"
              >
                Try Another Photo
              </Button>
              <Button className="btn-faceup-primary">
                Save Favorites
              </Button>
              <Button className="btn-faceup-secondary">
                Share Results
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Recommend;

