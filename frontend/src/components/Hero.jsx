import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Sparkles, ArrowRight, Users, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const Hero = ({ onGetStarted, onLogin, onSignup }) => {
  const features = [
    {
      icon: Camera,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your facial features and hair type"
    },
    {
      icon: Sparkles,
      title: "Personalized Recommendations",
      description: "Get hairstyles tailored specifically for you"
    },
    {
      icon: Users,
      title: "Expert Approved",
      description: "Recommendations from professional stylists worldwide"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Users" },
    { number: "1000+", label: "Hairstyles" },
    { number: "98%", label: "Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            FaceUp
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
            How it Works
          </Button>
          <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50" onClick={onLogin}>
            Sign In
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
              >
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Hair Recommendations
              </motion.div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Your
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}Perfect{" "}
                </span>
                Hairstyle
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Upload your photo and let our AI analyze your facial features, hair type, and personal style to recommend the perfect hairstyles just for you.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="btn-faceup-primary text-lg px-8 py-4 group"
              >
                <Camera className="w-5 h-5 mr-2" />
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Photo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Placeholder */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <Camera className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-gray-700">Upload Your Photo</div>
                    <div className="text-sm text-gray-500">AI will analyze and recommend</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <Star className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How FaceUp Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced AI technology analyzes your unique features to provide personalized hairstyle recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white/50 backdrop-blur-sm">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Look?
            </h2>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of users who found their perfect hairstyle with FaceUp
            </p>
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              Start Your Transformation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

