import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check, X, Star, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import appIconGold from '../assets/app-icon-gold-updated.png';
import splashIconGold from '../assets/splash-icon-gold.png';

const PricingPage = ({ onSelectPlan }) => {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for discovering your style',
      icon: '✨',
      color: 'purple',
      features: [
        { name: 'Basic hairstyle browsing', included: true },
        { name: 'Geolocation map', included: true },
        { name: 'Community reviews', included: true },
        { name: 'Basic style recommendations', included: true },
        { name: 'AI-style matcher', included: false },
        { name: 'Save favorite styles', included: false },
        { name: 'Ad-free experience', included: false },
        { name: 'Early access to new features', included: false },
        { name: 'Priority customer support', included: false }
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Unlock the full CutMatch experience',
      icon: '👑',
      color: 'gold',
      features: [
        { name: 'Basic hairstyle browsing', included: true },
        { name: 'Geolocation map', included: true },
        { name: 'Community reviews', included: true },
        { name: 'Basic style recommendations', included: true },
        { name: 'AI-style matcher', included: true },
        { name: 'Save favorite styles', included: true },
        { name: 'Ad-free experience', included: true },
        { name: 'Early access to new features', included: true },
        { name: 'Priority customer support', included: true }
      ],
      cta: 'Upgrade to Pro',
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center mb-6">
            <img src={appIconGold} alt="CutMatch Pro" className="w-16 h-16 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your hairstyle discovery journey with our free plan, or unlock premium features with CutMatch Pro.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 text-sm font-semibold">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full transition-all duration-300 hover:shadow-2xl ${
                plan.color === 'gold' 
                  ? 'border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50' 
                  : 'border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100'
              } ${plan.popular ? 'scale-105' : ''}`}>
                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    {plan.color === 'gold' ? (
                      <img src={splashIconGold} alt="Pro Plan" className="w-20 h-20" />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl">
                        {plan.icon}
                      </div>
                    )}
                  </div>
                  
                  <CardTitle className={`text-3xl font-bold ${
                    plan.color === 'gold' ? 'text-amber-700' : 'text-purple-700'
                  }`}>
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mt-4">
                    <span className={`text-5xl font-bold ${
                      plan.color === 'gold' ? 'text-amber-600' : 'text-purple-600'
                    }`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                  </div>
                  
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check className={`w-5 h-5 mr-3 ${
                            plan.color === 'gold' ? 'text-amber-600' : 'text-purple-600'
                          }`} />
                        ) : (
                          <X className="w-5 h-5 mr-3 text-gray-400" />
                        )}
                        <span className={`${
                          feature.included ? 'text-gray-800' : 'text-gray-400'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      plan.color === 'gold'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {plan.color === 'gold' && <Sparkles className="w-5 h-5 mr-2" />}
                    {plan.cta}
                  </Button>

                  {plan.id === 'pro' && (
                    <p className="text-center text-sm text-gray-500 mt-4">
                      Cancel anytime. No hidden fees.
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Why Choose CutMatch Pro?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">AI-Powered Matching</h4>
                <p className="text-gray-600 text-sm">
                  Get personalized hairstyle recommendations based on your face shape, hair type, and preferences.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Ad-Free Experience</h4>
                <p className="text-gray-600 text-sm">
                  Enjoy uninterrupted browsing and discovery without any advertisements.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Early Access</h4>
                <p className="text-gray-600 text-sm">
                  Be the first to try new features and updates before they're available to everyone.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;

