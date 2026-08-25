// app/(tabs)/home.js
//
// HOME SCREEN — Route path: "/home"
//
// HOW THIS FILE BECOMES A ROUTE:
// - Expo Router automatically reads this file because it is inside app/(tabs)/.
// - The filename `home.js` becomes the route segment "home".
// - Because it's inside (tabs) [a route group], the full path is just "/home".
// - No need to register this screen anywhere — the file itself IS the route.
//
// SAFEAREAVIEW:
// - SafeAreaView makes sure content does not go behind the phone's
//   notch, status bar, or bottom gesture area.
// - Always use it as the outermost container on a screen.
//
// NOTE: Dashboard statistics will be implemented in a later part.
//       For now, we show a simple placeholder.

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ── App Title ── */}
        <Text style={styles.appTitle}>DeliveryProof</Text>

        {/* ── Greeting ── */}
        <Text style={styles.greeting}>Good Morning 👋</Text>

        {/* ── Placeholder Card ── */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Your delivery dashboard will appear here.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // SafeAreaView takes the full screen including safe areas
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },

  // Main container: centered content with padding
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // App name at the top
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0055ff',
    marginBottom: 8,
    letterSpacing: 1,
  },

  // Greeting text below the title
  greeting: {
    fontSize: 20,
    color: '#374151',
    marginBottom: 32,
  },

  // White rounded card — a common pattern in delivery apps
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    alignItems: 'center',

    // Shadow for Android
    elevation: 4,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },

  // Text inside the card
  cardText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
