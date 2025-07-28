import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Clock, Star, Info, Bookmark, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const RecommendationCard = ({ recommendation }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const {
    name,
    description,
    emoji,
    category,
    difficulty,
    duration,
    maintenance,
    suitableFor,
    tips
  } = recommendation;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceColor = (maintenance) => {
    switch (maintenance?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Here you would typically save to favorites in your backend/state management
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${name} - FaceUp Recommendation`,
        text: description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `Check out this hairstyle recommendation: ${name} - ${description}`
      );
      // You could show a toast notification here
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="recommendation-card"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{emoji}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                <Badge variant="secondary" className="mt-1">
                  {category}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className={`${
                  isFavorited 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-400 hover:text-indigo-600"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-4">
            {description}
          </p>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={getDifficultyColor(difficulty)}>
              {difficulty} Difficulty
            </Badge>
            <Badge className={getMaintenanceColor(maintenance)}>
              {maintenance} Maintenance
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </Badge>
          </div>

          {/* Suitable For */}
          {suitableFor && suitableFor.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Perfect for:</h4>
              <div className="flex flex-wrap gap-1">
                {suitableFor.map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Expandable Details */}
        <motion.div
          initial={false}
          animate={{ height: showDetails ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-4 border-t border-gray-100">
            <div className="pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-1" />
                Styling Tips
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {tips}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-indigo-600 hover:text-indigo-700"
            >
              <Info className="w-4 h-4 mr-1" />
              {showDetails ? 'Less Info' : 'More Info'}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                <Bookmark className="w-4 h-4 mr-1" />
                Save
              </Button>
              
              <Button
                size="sm"
                className="btn-faceup-primary"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Find Stylist
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default RecommendationCard;

