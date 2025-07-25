import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Import screens (will be created in next phase)
import SplashScreen from './src/screens/SplashScreen';
import UploadScreen from './src/screens/UploadScreen';
import AnalyzingScreen from './src/screens/AnalyzingScreen';
import SuggestionsScreen from './src/screens/SuggestionsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StyleDetailScreen from './src/screens/StyleDetailScreen';

// Import i18n configuration
import './src/utils/i18n';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
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
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#6A0DAD" />
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

