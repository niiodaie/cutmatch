import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Download, Play, ArrowRight, Scissors, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import appIconPurple from '../assets/app-icon-purple-updated.png';

const HeroPage = ({ onContinue, onGuestDemo, onDownload }) => {
  const featuredStyles = [
    {
      id: 1,
      name: "Afro Fade",
      category: "Fade",
      image: "/api/placeholder/300/300",
      rating: 4.8,
      likes: 1234
    },
    {
      id: 2,
      name: "Box Braids",
      category: "Protective",
      image: "/api/placeholder/300/300",
      rating: 4.9,
      likes: 2156
    },
    {
      id: 3,
      name: "Twist Out",
      category: "Natural",
      image: "/api/placeholder/300/300",
      rating: 4.7,
      likes: 987
    },
    {
      id: 4,
      name: "Low Taper",
      category: "Fade",
      image: "/api/placeholder/300/300",
      rating: 4.8,
      likes: 1543
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* App Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <img 
              src={appIconPurple} 
              alt="CutMatch" 
              className="w-32 h-32 mx-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Discover. Match. Transform.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The global platform for inclusive hairstyle discovery. Find your perfect look, 
              connect with skilled stylists, and express your unique identity.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button 
              onClick={onContinue}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Continue to App
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              onClick={onGuestDemo}
              variant="outline"
              size="lg"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              Try Guest Demo
            </Button>
          </motion.div>

          {/* App Store Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              onClick={onDownload}
              variant="ghost"
              className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download on App Store
            </Button>
            
            <Button 
              onClick={onDownload}
              variant="ghost"
              className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Get it on Google Play
            </Button>
          </motion.div>
        </div>

        {/* Featured Styles Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Hairstyles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover trending styles from our global community of hair enthusiasts and professional stylists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStyles.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                      <Scissors className="h-16 w-16 text-purple-400" />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-purple-600 text-white">
                      {style.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{style.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{style.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{style.likes} likes</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6">
            <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
            <div className="text-gray-600">Hairstyles</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-gray-600">Stylists</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-gray-600">Countries</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroPage;

