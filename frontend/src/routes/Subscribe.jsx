import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Crown, Sparkles, Star, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Subscribe = ({ onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for trying out FaceUp',
      features: [
        '3 AI recommendations per month',
        'Basic hairstyle library',
        'Community access',
        'Standard support'
      ],
      limitations: [
        'Limited recommendations',
        'Ads included',
        'Basic features only'
      ],
      popular: false,
      color: 'gray'
    },
    pro: {
      name: 'Pro',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'Unlimited AI-powered recommendations',
      features: [
        'Unlimited AI recommendations',
        'Advanced face analysis',
        'Premium hairstyle library',
        'Style trend insights',
        'Ad-free experience',
        'Priority support',
        'Save unlimited favorites',
        'Share recommendations'
      ],
      limitations: [],
      popular: true,
      color: 'indigo'
    },
    premium: {
      name: 'Premium',
      price: { monthly: 19.99, yearly: 199.99 },
      description: 'Everything in Pro plus stylist connections',
      features: [
        'Everything in Pro',
        'Connect with verified stylists',
        'Virtual consultations',
        'Personalized style coaching',
        'Early access to new features',
        'Custom style profiles',
        'Advanced analytics',
        'White-glove support'
      ],
      limitations: [],
      popular: false,
      color: 'purple'
    }
  };

  const getColorClasses = (color, selected = false) => {
    const colors = {
      gray: {
        bg: selected ? 'bg-gray-50' : 'bg-white',
        border: selected ? 'border-gray-300' : 'border-gray-200',
        button: 'bg-gray-600 hover:bg-gray-700',
        text: 'text-gray-600'
      },
      indigo: {
        bg: selected ? 'bg-indigo-50' : 'bg-white',
        border: selected ? 'border-indigo-300' : 'border-gray-200',
        button: 'bg-indigo-600 hover:bg-indigo-700',
        text: 'text-indigo-600'
      },
      purple: {
        bg: selected ? 'bg-purple-50' : 'bg-white',
        border: selected ? 'border-purple-300' : 'border-gray-200',
        button: 'bg-purple-600 hover:bg-purple-700',
        text: 'text-purple-600'
      }
    };
    return colors[color];
  };

  const handleSubscribe = (planKey) => {
    // Placeholder for payment integration
    console.log(`Subscribing to ${planKey} plan (${billingCycle})`);
    // In a real app, this would integrate with Stripe, PayPal, etc.
    alert(`Payment integration coming soon!\n\nSelected: ${plans[planKey].name} - ${billingCycle}`);
  };

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
                Choose Your Plan
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
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Your Perfect Hairstyle
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get unlimited AI-powered recommendations, connect with professional stylists, 
            and discover hairstyles that perfectly match your unique features.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                Save 17%
              </Badge>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.entries(plans).map(([key, plan], index) => {
            const isSelected = selectedPlan === key;
            const colors = getColorClasses(plan.color, isSelected);
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card
                  className={`p-8 cursor-pointer transition-all duration-300 ${colors.bg} ${colors.border} border-2 ${
                    plan.popular ? 'scale-105 shadow-xl' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPlan(key)}
                >
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colors.button} mb-4`}>
                      {key === 'free' && <Zap className="w-8 h-8 text-white" />}
                      {key === 'pro' && <Sparkles className="w-8 h-8 text-white" />}
                      {key === 'premium' && <Crown className="w-8 h-8 text-white" />}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price[billingCycle]}
                      </span>
                      {plan.price[billingCycle] > 0 && (
                        <span className="text-gray-600">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className={`w-5 h-5 mr-3 ${colors.text}`} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleSubscribe(key)}
                    className={`w-full h-12 ${colors.button} text-white`}
                    variant={isSelected ? 'default' : 'outline'}
                  >
                    {key === 'free' ? 'Get Started Free' : `Subscribe to ${plan.name}`}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="p-8 bg-white/70 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Choose FaceUp Pro?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Advanced AI Analysis
                </h4>
                <p className="text-gray-600">
                  Our cutting-edge AI analyzes your facial features, hair type, and personal style to provide the most accurate recommendations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Premium Content
                </h4>
                <p className="text-gray-600">
                  Access thousands of premium hairstyles, trend insights, and exclusive content from top stylists worldwide.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Expert Support
                </h4>
                <p className="text-gray-600">
                  Get priority support from our team and connect with verified professional stylists for personalized advice.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <Card className="p-6 bg-white/70 backdrop-blur-sm">
              <h4 className="font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h4>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time. No long-term commitments or cancellation fees.
              </p>
            </Card>
            
            <Card className="p-6 bg-white/70 backdrop-blur-sm">
              <h4 className="font-semibold text-gray-900 mb-2">
                Is my data secure?
              </h4>
              <p className="text-gray-600">
                Absolutely. We use enterprise-grade security and never share your personal photos or data with third parties.
              </p>
            </Card>
            
            <Card className="p-6 bg-white/70 backdrop-blur-sm">
              <h4 className="font-semibold text-gray-900 mb-2">
                How accurate are the recommendations?
              </h4>
              <p className="text-gray-600">
                Our AI has been trained on millions of hairstyles and achieves 95%+ user satisfaction in recommendation accuracy.
              </p>
            </Card>
            
            <Card className="p-6 bg-white/70 backdrop-blur-sm">
              <h4 className="font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your subscription.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscribe;

