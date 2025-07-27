import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import 'react-native-url-polyfill/auto';

// Import i18n configuration
import i18n from './src/utils/i18n';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import UploadScreen from './src/screens/UploadScreen';
import AnalyzingScreen from './src/screens/AnalyzingScreen';
import SuggestionsScreen from './src/screens/SuggestionsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StyleDetailScreen from './src/screens/StyleDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>
            {Platform.OS === 'web' ? 'Please refresh the page' : 'Please restart the app'}
          </Text>
          <Text style={styles.errorDetails}>
            {this.state.error?.message || 'Unknown error occurred'}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

// Loading component
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#FFFFFF" />
    <Text style={styles.loadingText}>Loading CutMatch...</Text>
  </View>
);

// Main tab navigator for the app
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6A0DAD',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: Platform.OS === 'web' ? 5 : 5,
          paddingTop: 5,
          height: Platform.OS === 'web' ? 60 : 60,
        },
        headerStyle: {
          backgroundColor: '#6A0DAD',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Tab.Screen 
        name="Upload" 
        component={UploadScreen}
        options={{
          title: 'Start Scan',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📷</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>❤️</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main stack navigator
function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6A0DAD',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Analyzing" 
        component={AnalyzingScreen}
        options={{ 
          title: 'Analyzing Your Style',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen 
        name="Suggestions" 
        component={SuggestionsScreen}
        options={{ 
          title: 'Style Suggestions',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen 
        name="StyleDetail" 
        component={StyleDetailScreen}
        options={{ 
          title: 'Style Details',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    // Initialize i18n with better error handling
    const initializeI18n = async () => {
      try {
        // Wait for i18n to be ready with timeout
        if (!i18n.isInitialized) {
          await Promise.race([
            new Promise((resolve) => {
              i18n.on('initialized', resolve);
            }),
            new Promise((resolve) => setTimeout(resolve, 3000)) // 3 second timeout
          ]);
        }
        setIsI18nInitialized(true);
      } catch (error) {
        console.warn('i18n initialization error:', error);
        // Still set as initialized to prevent infinite loading
        setIsI18nInitialized(true);
      }
    };

    // Check if i18n is already initialized
    if (i18n.isInitialized) {
      setIsI18nInitialized(true);
    } else {
      initializeI18n();
    }
  }, []);

  // Show loading screen while i18n initializes
  if (!isI18nInitialized) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#6A0DAD" />
          <AppNavigator />
        </NavigationContainer>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A0DAD',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    padding: 20,
  },
  errorTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  errorDetails: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier',
  },
});

