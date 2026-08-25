// app/(tabs)/_layout.js
//
// TAB LAYOUT — This defines the bottom tab bar.
//
// WHAT IS A ROUTE GROUP?
// - The folder is named `(tabs)` with parentheses.
// - The parentheses tell Expo Router: "this is just a group, don't add
//   this folder name to the URL path."
// - So `app/(tabs)/home.js` becomes the route "/home", NOT "/(tabs)/home".
//   The (tabs) part is invisible in the URL — it's only for organizing files.
//
// TAB NAVIGATOR:
// - Tabs.Navigator creates the bottom navigation bar.
// - Each <Tabs.Screen> registers one tab.
// - The `name` prop MUST match the filename (without .js).
//   e.g., name="home" matches the file `home.js` in this folder.
//
// ICONS:
// - We use @expo/vector-icons which comes built into Expo.
// - Ionicons is one of the icon sets available.
//
// tabBarActiveTintColor   → color when tab is selected
// tabBarInactiveTintColor → color when tab is not selected

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Style the tab bar itself
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e8e8e8',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },

        // Active tab: blue (our brand color)
        tabBarActiveTintColor: '#0055ff',

        // Inactive tab: grey
        tabBarInactiveTintColor: '#9ca3af',

        // Tab label style
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        // Header style (shown at the top of each tab screen)
        headerStyle: {
          backgroundColor: '#0055ff',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      {/*
        Each Tabs.Screen represents one tab.
        - name: must match the filename (without .js)
        - options.title: label shown under the icon
        - options.tabBarIcon: the icon component
        - The `focused` prop tells us if this tab is currently selected
      */}

      {/* ── TAB 1: HOME ── */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ── TAB 2: DELIVERIES ── */}
      <Tabs.Screen
        name="deliveries"
        options={{
          title: 'Deliveries',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'cube' : 'cube-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ── TAB 3: HISTORY ── */}
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'document-text' : 'document-text-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ── TAB 4: PROFILE ── */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
