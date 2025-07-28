import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Upload, Sparkles, Heart, Share2, Users, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const HowToUse = ({ onBack, onGetStarted }) => {
  const steps = [
    {
      number: 1,
      title: "Upload Your Photo",
      description: "Take a clear, well-lit photo or upload an existing one. Make sure your face is clearly visible and your hair is shown.",
      icon: Camera,
      tips: [
        "Use natural lighting when possible",
        "Face the camera directly",
        "Remove hats or accessories",
        "Show your current hairstyle clearly"
      ],
      color: "bg-blue-500"
    },
    {
      number: 2,
      title: "Set Your Preferences",
      description: "Tell us about your hair type, lifestyle, and style preferences to get more personalized recommendations.",
      icon: Sparkles,
      tips: [
        "Select your hair texture accurately",
        "Consider your daily routine",
        "Think about maintenance preferences",
        "Choose your style goals"
      ],
      color: "bg-purple-500"
    },
    {
      number: 3,
      title: "Get AI Recommendations",
      description: "Our advanced AI analyzes your features and preferences to suggest hairstyles that will look amazing on you.",
      icon: Sparkles,
      tips: [
        "Review each recommendation carefully",
        "Read the styling tips provided",
        "Consider the maintenance requirements",
        "Think about your lifestyle fit"
      ],
      color: "bg-indigo-500"
    },
    {
      number: 4,
      title: "Save & Share",
      description: "Save your favorite recommendations and share them with friends or take them to your stylist.",
      icon: Heart,
      tips: [
        "Save multiple options to compare",
        "Share with friends for opinions",
        "Show saved styles to your stylist",
        "Try different variations"
      ],
      color: "bg-pink-500"
    }
  ];

  const features = [
    {
      icon: Camera,
      title: "Smart Photo Analysis",
      description: "Our AI analyzes facial structure, hair texture, and features to provide accurate recommendations."
    },
    {
      icon: Sparkles,
      title: "Personalized Results",
      description: "Get recommendations tailored to your unique features, lifestyle, and style preferences."
    },
    {
      icon: Users,
      title: "Expert Approved",
      description: "All recommendations are validated by professional stylists and hair experts."
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your favorite styles with friends or save them to show your stylist."
    }
  ];

  const tips = [
    {
      title: "Best Photo Practices",
      items: [
        "Use natural lighting or bright indoor lighting",
        "Face the camera directly with a neutral expression",
        "Remove hats, headbands, or hair accessories",
        "Show your current hairstyle and hair length",
        "Avoid heavy makeup that might obscure facial features"
      ]
    },
    {
      title: "Getting Better Recommendations",
      items: [
        "Be honest about your hair type and texture",
        "Consider your daily styling routine",
        "Think about your professional requirements",
        "Factor in your activity level and lifestyle",
        "Don't be afraid to try something new!"
      ]
    },
    {
      title: "Working with Your Stylist",
      items: [
        "Save multiple options to discuss",
        "Ask about maintenance requirements",
        "Discuss your lifestyle and preferences",
        "Consider gradual changes if trying something new",
        "Trust your stylist's professional advice"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
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
                How to Use FaceUp
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FaceUp
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Perfect Hairstyle in 4 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FaceUp uses advanced AI technology to analyze your unique features and recommend 
            hairstyles that will look amazing on you. Here's how it works:
          </p>
        </motion.div>

        {/* Steps Section */}
        <div className="mb-16">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Pro Tips:</h4>
                    <ul className="space-y-1">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <Card className="p-12 bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-lg">
                    <div className="text-center">
                      <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        <step.icon className="w-12 h-12 text-white" />
                      </div>
                      <div className="text-gray-500 text-sm">
                        Step {step.number} Illustration
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why FaceUp Works So Well
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI technology combines advanced facial analysis with expert stylist knowledge 
              to provide recommendations you can trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 bg-white/70 backdrop-blur-sm border-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Expert Tips for Best Results
            </h3>
            <p className="text-lg text-gray-600">
              Follow these professional tips to get the most accurate and helpful recommendations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {tips.map((tipSection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <Card className="p-6 h-full bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {tipSection.title}
                  </h4>
                  <ul className="space-y-3">
                    {tipSection.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Hairstyle?
            </h3>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of users who have discovered their ideal look with FaceUp's AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4"
              >
                <Camera className="w-5 h-5 mr-2" />
                Try FaceUp Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-indigo-600 text-lg px-8 py-4"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Photo
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HowToUse;

