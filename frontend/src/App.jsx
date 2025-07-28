import React, { useState } from 'react';
import { AuthProvider } from './components/AuthContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState(null);

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} />;
      case 'upload':
        return <UploadPage onNavigate={handleNavigate} />;
      case 'results':
        return <div className="pt-20 min-h-screen cutmatch-bg-gradient flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Results Page</h1>
            <p className="text-gray-600">AI results display coming soon...</p>
          </div>
        </div>;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
        {renderPage()}
      </div>
    </AuthProvider>
  );
}

export default App;

