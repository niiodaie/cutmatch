import appIconPurple from '../assets/app-icon-purple.png';
import React from 'react';
import { Camera, User, LogOut, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from './AuthContext';
import proIcon from '../assets/proicon.png';

const Navigation = ({ currentPage, onNavigate }) => {
  const { user, logout, isAuthenticated } = useAuth();

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

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src={appIconPurple} alt="CutMatch AI Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold cutmatch-gradient-text">
              CutMatch AI
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Authenticated Navigation */}
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('upload')}
                  className="text-gray-600 hover:text-purple-600"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
                
                {user?.isPro && (
                  <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full">
                    <img src={proIcon} alt="Pro" className="w-4 h-4" />
                    <span className="text-xs font-semibold text-white">PRO</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                {/* Unauthenticated Navigation */}
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('login')}
                  className="text-gray-600 hover:text-purple-600"
                >
                  Sign In
                </Button>
                
                <Button
                  onClick={handleGetStarted}
                  className="cutmatch-button-primary"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

