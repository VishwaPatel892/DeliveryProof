// app/(tabs)/profile.js
//
// PROFILE SCREEN — Route path: "/profile"
//
// HOW THIS FILE BECOMES A ROUTE:
// - The filename `profile.js` inside app/(tabs)/ becomes the route "/profile".
// - Expo Router automatically registers it as the Profile tab screen.
//
// NOTE: Authentication and real user data will be added in a later part.
//       For now, this shows a static placeholder.

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ── Avatar Placeholder ── */}
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>👤</Text>
        </View>

        {/* ── Screen Title ── */}
        <Text style={styles.title}>Profile</Text>

        {/* ── Role Badge ── */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Delivery Partner</Text>
        </View>

        {/* ── Info Card ── */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Profile information and settings will appear here.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },

  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Circular avatar placeholder
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,          // Makes it a perfect circle
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#0055ff',
  },

  // Emoji icon inside the circle
  avatarText: {
    fontSize: 40,
  },

  // Name/title
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },

  // Role label badge
  badge: {
    backgroundColor: '#0055ff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 32,
  },

  badgeText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },

  // White rounded info card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },

  cardText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
