import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Recommend from './routes/Recommend';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Subscribe from './routes/Subscribe';
import HowToUse from './routes/HowToUse';
import NotFound from './routes/NotFound';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('hero');
  const [user, setUser] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('recommend');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setCurrentPage('recommend');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('hero');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'hero':
        return (
          <Hero
            onGetStarted={() => navigateTo('recommend')}
            onLogin={() => navigateTo('login')}
            onSignup={() => navigateTo('signup')}
          />
        );
      
      case 'recommend':
        return (
          <Recommend
            user={user}
            onBack={() => navigateTo('hero')}
            onLogin={() => navigateTo('login')}
          />
        );
      
      case 'login':
        return (
          <Login
            onBack={() => navigateTo('hero')}
            onLogin={handleLogin}
            onSignup={() => navigateTo('signup')}
          />
        );
      
      case 'signup':
        return (
          <Signup
            onBack={() => navigateTo('hero')}
            onSignup={handleSignup}
            onLogin={() => navigateTo('login')}
          />
        );
      
      case 'subscribe':
        return (
          <Subscribe
            onBack={() => navigateTo('hero')}
          />
        );
      
      case 'how-to-use':
        return (
          <HowToUse
            onBack={() => navigateTo('hero')}
            onGetStarted={() => navigateTo('recommend')}
          />
        );
      
      case 'not-found':
        return (
          <NotFound
            onHome={() => navigateTo('hero')}
            onBack={() => navigateTo('hero')}
          />
        );
      
      default:
        return (
          <NotFound
            onHome={() => navigateTo('hero')}
            onBack={() => navigateTo('hero')}
          />
        );
    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </div>
  );
}

export default App;

