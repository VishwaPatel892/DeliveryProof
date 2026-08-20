import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import DeliveriesScreen from './screens/DeliveriesScreen';
import DeliveryDetailsScreen from './screens/DeliveryDetailsScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Create a Stack Navigator for the Deliveries tab
function DeliveriesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0055ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="DeliveriesList" 
        component={DeliveriesScreen} 
        options={{ headerShown: false }} // We hide this because Tab.Navigator already provides a header
      />
      <Stack.Screen 
        name="DeliveryDetails" 
        component={DeliveryDetailsScreen} 
        options={{ title: 'Delivery Details' }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0055ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarActiveTintColor: '#0055ff',
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          {/* We use DeliveriesStack here instead of just DeliveriesScreen */}
          <Tab.Screen 
            name="Deliveries" 
            component={DeliveriesStack} 
            options={{ headerShown: false }} // Hide tab header so the stack header shows when navigating
          />
          <Tab.Screen name="History" component={HistoryScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
