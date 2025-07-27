import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import HeroPage from './components/HeroPage';
import PricingPage from './components/PricingPage';
import LocationDisplay from './components/LocationDisplay';
import SocialLoginButtons from './components/SocialLoginButtons';
import { Button } from './components/ui/button';
import Footer from './components/Footer';
import { initializeAnalytics, trackPageView, trackCutMatchEvents } from './utils/analytics';
import './App.css';

// Placeholder components for other pages
const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white py-12">
    <div className="max-w-md w-full mx-4">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your CutMatch account</p>
        </div>
        
        <SocialLoginButtons 
          onGoogleLogin={() => console.log('Google login')}
          onAppleLogin={() => console.log('Apple login')}
        />
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3">
            Sign In
          </Button>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Sign up</a>
        </p>
      </div>
    </div>
  </div>
);

const SignupPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white py-12">
    <div className="max-w-md w-full mx-4">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Get Started</h1>
          <p className="text-gray-600">Create your CutMatch account</p>
        </div>
        
        <SocialLoginButtons 
          onGoogleLogin={() => console.log('Google signup')}
          onAppleLogin={() => console.log('Apple signup')}
        />
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Create a password"
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3">
            Create Account
          </Button>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Sign in</a>
        </p>
      </div>
    </div>
  </div>
);

const DashboardPage = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600">Discover hairstyles and find nearby salons</p>
      </div>
      <LocationDisplay />
    </div>
  </div>
);

const AboutPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About</h1>
      <p className="text-gray-600">About page coming soon...</p>
    </div>
  </div>
);

const ProfilePage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile</h1>
      <p className="text-gray-600">Profile page coming soon...</p>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Initialize analytics on app load
  useEffect(() => {
    initializeAnalytics();
    trackPageView('/', 'CutMatch - Home');
  }, []);

  // Track page changes
  useEffect(() => {
    const pageNames = {
      home: 'Home',
      login: 'Sign In',
      signup: 'Sign Up',
      dashboard: 'Dashboard',
      pricing: 'Pricing',
      about: 'About',
      profile: 'Profile'
    };
    
    const pageName = pageNames[currentPage] || 'Unknown';
    trackPageView(`/${currentPage}`, `CutMatch - ${pageName}`);
  }, [currentPage]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleContinue = () => {
    trackCutMatchEvents.login('email');
    setCurrentPage('login');
  };

  const handleGuestDemo = () => {
    trackCutMatchEvents.login('guest');
    setCurrentPage('dashboard');
  };

  const handleDownload = () => {
    trackCutMatchEvents.search('app_download', 1);
    // Placeholder for app store redirect
    console.log('Redirecting to app store...');
  };

  const handleSelectPlan = (planId) => {
    trackCutMatchEvents.planSelect(planId, planId === 'pro' ? 9.99 : 0);
    console.log('Selected plan:', planId);
    if (planId === 'free') {
      setCurrentPage('signup');
    } else {
      // Redirect to payment or signup with pro plan
      setCurrentPage('signup');
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HeroPage 
            onContinue={handleContinue}
            onGuestDemo={handleGuestDemo}
            onDownload={handleDownload}
          />
        );
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'pricing':
        return <PricingPage onSelectPlan={handleSelectPlan} />;
      case 'about':
        return <AboutPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <HeroPage 
            onContinue={handleContinue}
            onGuestDemo={handleGuestDemo}
            onDownload={handleDownload}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

export default App;
