import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Sparkles, Camera } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const NotFound = ({ onHome, onBack }) => {
  const suggestions = [
    {
      icon: Camera,
      title: "Try FaceUp",
      description: "Upload your photo and get AI hairstyle recommendations",
      action: "Get Started",
      onClick: () => onHome && onHome()
    },
    {
      icon: Search,
      title: "How to Use",
      description: "Learn how to get the best results from FaceUp",
      action: "Learn More",
      onClick: () => onHome && onHome()
    },
    {
      icon: Sparkles,
      title: "Subscribe",
      description: "Unlock unlimited recommendations with FaceUp Pro",
      action: "View Plans",
      onClick: () => onHome && onHome()
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-9xl md:text-[12rem] font-bold text-gray-200 leading-none">
              404
            </h1>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 left-1/4 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute top-8 right-1/4 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center"
            >
              <Camera className="w-6 h-6 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              className="absolute bottom-8 left-1/3 w-10 h-10 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center"
            >
              <Search className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The page you're looking for seems to have gotten a new hairstyle and disappeared! 
            Don't worry, we'll help you find what you need.
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            onClick={onHome}
            size="lg"
            className="btn-faceup-primary text-lg px-8 py-4"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
          
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 text-lg px-8 py-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            While you're here, why not try:
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 cursor-pointer group">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <suggestion.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {suggestion.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {suggestion.description}
                    </p>
                    
                    <Button
                      onClick={suggestion.onClick}
                      variant="outline"
                      size="sm"
                      className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                    >
                      {suggestion.action}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brand Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center space-x-2 text-gray-500"
        >
          <div className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            FaceUp
          </span>
          <span className="text-sm">- AI Hairstyle Recommendations</span>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

