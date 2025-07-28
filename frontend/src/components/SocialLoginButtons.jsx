import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Chrome } from 'lucide-react';
import { Button } from './ui/button';

const SocialLoginButtons = ({ onGoogleLogin, onEmailLogin, isLoading = false }) => {
  const handleGoogleLogin = () => {
    if (onGoogleLogin) {
      onGoogleLogin();
    } else {
      // Placeholder for Google OAuth integration
      console.log('Google login clicked - integrate with Google OAuth');
      // In a real app, this would redirect to Google OAuth or open a popup
      // window.location.href = '/auth/google';
    }
  };

  const handleEmailLogin = () => {
    if (onEmailLogin) {
      onEmailLogin();
    } else {
      console.log('Email login clicked');
    }
  };

  return (
    <div className="space-y-3">
      {/* Google Login Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition-all duration-200 h-12"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="w-5 h-5">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            <span className="font-medium">Continue with Google</span>
          </div>
        </Button>
      </motion.div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Email Login Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleEmailLogin}
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-sm transition-all duration-200 h-12"
        >
          <div className="flex items-center justify-center space-x-3">
            <Mail className="w-5 h-5" />
            <span className="font-medium">Continue with Email</span>
          </div>
        </Button>
      </motion.div>

      {/* Terms and Privacy */}
      <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
        By continuing, you agree to our{' '}
        <a href="/terms" className="text-indigo-600 hover:text-indigo-700 underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-indigo-600 hover:text-indigo-700 underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default SocialLoginButtons;

