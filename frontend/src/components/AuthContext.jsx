import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('cutmatch_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('cutmatch_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Demo account check
      if (email === 'demo@cutmatch.com' && password === 'password') {
        const demoUser = {
          id: 'demo-user',
          email: 'demo@cutmatch.com',
          name: 'Demo User',
          avatar: null,
          isPro: false,
          createdAt: new Date().toISOString()
        };
        setUser(demoUser);
        localStorage.setItem('cutmatch_user', JSON.stringify(demoUser));
        return { success: true, user: demoUser };
      }

      // In a real app, this would make an API call
      // For now, simulate a successful login for any other credentials
      const userData = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        avatar: null,
        isPro: false,
        createdAt: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('cutmatch_user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const signup = async (email, password, name) => {
    try {
      // In a real app, this would make an API call
      const userData = {
        id: `user-${Date.now()}`,
        email,
        name: name || email.split('@')[0],
        avatar: null,
        isPro: false,
        createdAt: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('cutmatch_user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cutmatch_user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('cutmatch_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

