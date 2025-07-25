import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import './src/utils/i18n'; // Initialize i18n

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import UploadScreen from './src/screens/UploadScreen';
import AnalyzingScreen from './src/screens/AnalyzingScreen';
import SuggestionsScreen from './src/screens/SuggestionsScreen';
import DetailScreen from './src/screens/DetailScreen';
import BarberListScreen from './src/screens/BarberListScreen';
import BarberDetailScreen from './src/screens/BarberDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#6A0DAD" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6A0DAD',
          },
          headerTintColor: '#fff',
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
          name="Upload" 
          component={UploadScreen} 
          options={{ title: 'CutMatch' }}
        />
        <Stack.Screen 
          name="Analyzing" 
          component={AnalyzingScreen} 
          options={{ title: 'CutMatch' }}
        />
        <Stack.Screen 
          name="Suggestions" 
          component={SuggestionsScreen} 
          options={{ title: 'CutMatch' }}
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ title: 'CutMatch' }}
        />
        <Stack.Screen 
          name="BarberList" 
          component={BarberListScreen} 
          options={{ title: 'Find Barbers' }}
        />
        <Stack.Screen 
          name="BarberDetail" 
          component={BarberDetailScreen} 
          options={{ title: 'Barber Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

