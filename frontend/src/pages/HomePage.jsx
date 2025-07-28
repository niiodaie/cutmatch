import splashIconGold from '../assets/splash-icon-gold.png';
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Sparkles, ArrowRight, Users, Star, Zap, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useAuth } from '../components/AuthContext';
import '../App.css';

const HomePage = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      onNavigate('upload');
    } else {
      onNavigate('signup');
    }
  };

  const handleTryNow = () => {
    if (isAuthenticated) {
      onNavigate('upload');
    } else {
      onNavigate('signup');
    }
  };

  const handleUploadPhoto = () => {
    if (isAuthenticated) {
      onNavigate('upload');
    } else {
      onNavigate('signup');
    }
  };

  const features = [
    {
      icon: Camera,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your facial features, hair type, and personal style preferences"
    },
    {
      icon: Sparkles,
      title: "Personalized Recommendations",
      description: "Get hairstyles tailored specifically for your unique features and lifestyle"
    },
    {
      icon: Star,
      title: "Expert Approved",
      description: "Recommendations from professional stylists and hair experts worldwide"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Users" },
    { number: "1000+", label: "Hairstyles" },
    { number: "98%", label: "Satisfaction" }
  ];

  const benefits = [
    "Instant AI-powered hairstyle analysis",
    "Personalized recommendations for your face shape",
    "Professional styling tips and techniques",
    "Save and share your favorite looks",
    "Try unlimited hairstyles with Pro"
  ];

  return (
    <div className="min-h-screen cutmatch-bg-gradient">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-2 text-purple-600"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    AI-Powered Hair Recommendations
                  </span>
                </motion.div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 cutmatch-text-shadow">
                  Find Your
                  <span className="cutmatch-gradient-text"> Perfect </span>
                  Hairstyle
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                  Upload your photo and let our AI analyze your facial features, hair type, 
                  and personal style to recommend the perfect hairstyles just for you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleGetStarted}
                  className="cutmatch-button-primary text-lg px-8 py-4"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button
                  onClick={handleUploadPhoto}
                  variant="outline"
                  className="cutmatch-button-secondary text-lg px-8 py-4"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Photo
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-purple-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="cutmatch-glass p-8 rounded-2xl">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                    <img src={splashIconGold} alt="CutMatch AI Icon" className="w-full h-full object-cover" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Upload Your Photo
                    </h3>
                    <p className="text-gray-600">
                      AI will analyze and recommend
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleTryNow}
                    className="cutmatch-button-primary w-full"
                  >
                    Try Now
                  </Button>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How CutMatch AI Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology analyzes your unique features to provide 
              personalized hairstyle recommendations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="cutmatch-card text-center cutmatch-hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose CutMatch AI?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="cutmatch-glass p-8 rounded-2xl"
            >
              <div className="text-center space-y-6">
                <Zap className="w-16 h-16 text-amber-500 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Ready to Transform Your Look?
                </h3>
                <p className="text-gray-600">
                  Join thousands of users who found their perfect hairstyle with CutMatch AI
                </p>
                <Button
                  onClick={handleGetStarted}
                  className="cutmatch-button-primary w-full text-lg py-4"
                >
                  Start Your Transformation
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

