import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  ArrowLeft, 
  X, 
  RotateCcw, 
  Check, 
  AlertCircle,
  User,
  Palette,
  Heart
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { useAuth } from '../components/AuthContext';
import '../App.css';

const UploadPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [preferences, setPreferences] = useState({
    gender: '',
    hairType: '',
    lifestyle: 'versatile'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Camera functionality
  const startCamera = useCallback(async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      setCameraStream(stream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Unable to access camera. Please check permissions or try uploading a file instead.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  }, [cameraStream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        handleImageUpload(file);
      }, 'image/jpeg', 0.8);
      
      stopCamera();
    }
  }, [stopCamera]);

  // File upload functionality
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = (file) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, JPEG, or PNG image.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage({
        file,
        url: e.target.result,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) {
      setError('Please upload or capture a photo first.');
      return;
    }

    setLoading(true);
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to results page (to be implemented)
      onNavigate('results', {
        image: uploadedImage,
        preferences,
        user
      });
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen cutmatch-bg-gradient pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Hairstyle
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a clear photo or upload an existing one for the best recommendations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="cutmatch-card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Your Photo</h2>
              
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              {/* Camera View */}
              {showCamera && (
                <div className="mb-6">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                      <Button
                        onClick={capturePhoto}
                        className="cutmatch-button-primary"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Capture
                      </Button>
                      <Button
                        onClick={stopCamera}
                        variant="outline"
                        className="bg-white/90"
                      >
                        <X className="w-5 h-5 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Uploaded Image Preview */}
              {uploadedImage && (
                <div className="mb-6">
                  <div className="relative">
                    <img
                      src={uploadedImage.url}
                      alt="Uploaded"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      onClick={removeImage}
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/90"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {uploadedImage.name}
                  </p>
                </div>
              )}

              {/* Upload Options */}
              {!uploadedImage && !showCamera && (
                <div className="space-y-4">
                  {/* Drag and Drop Zone */}
                  <div
                    className="upload-dropzone"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drag and drop your photo here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      or choose from the options below
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={startCamera}
                      className="cutmatch-button-primary"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Take Photo
                    </Button>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="cutmatch-button-secondary"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload from Device
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}
            </Card>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="cutmatch-card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Personalization Preferences
              </h2>

              <div className="space-y-6">
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <User className="w-4 h-4 inline mr-2" />
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['male', 'female', 'non-binary'].map((option) => (
                      <Button
                        key={option}
                        variant={preferences.gender === option ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePreferenceChange('gender', option)}
                        className={preferences.gender === option ? 'cutmatch-button-primary' : ''}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Hair Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Palette className="w-4 h-4 inline mr-2" />
                    Hair Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['straight', 'wavy', 'curly', 'coily'].map((option) => (
                      <Button
                        key={option}
                        variant={preferences.hairType === option ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePreferenceChange('hairType', option)}
                        className={preferences.hairType === option ? 'cutmatch-button-primary' : ''}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Lifestyle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Heart className="w-4 h-4 inline mr-2" />
                    Lifestyle
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['low-maintenance', 'versatile', 'high-fashion', 'professional'].map((option) => (
                      <Button
                        key={option}
                        variant={preferences.lifestyle === option ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePreferenceChange('lifestyle', option)}
                        className={preferences.lifestyle === option ? 'cutmatch-button-primary' : ''}
                      >
                        {option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analyze Button */}
              <div className="mt-8">
                <Button
                  onClick={handleAnalyze}
                  disabled={!uploadedImage || loading}
                  className="w-full cutmatch-button-primary text-lg py-4"
                >
                  {loading ? (
                    <>
                      <div className="cutmatch-loader w-5 h-5 mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Analyze & Get Recommendations
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default UploadPage;

