// app/(tabs)/profile.js — Green Palette
//
// COLOR ROLES:
//   #EAE7D6  → Screen background
//   #5D7B6F  → Header (deep teal)
//   #A4C3A2  → Avatar background (soft green)
//   #B0D4B8  → Role badge
//   #D7F9FA  → Info card (light cyan info area)

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Text style={styles.headerSubtitle}>Your account details</Text>
      </View>

      {/* ── Content ── */}
      <View style={styles.container}>

        {/* Circular avatar */}
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>

        {/* Role badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Delivery Partner</Text>
        </View>

        {/* Info card */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Profile information and authentication{'\n'}will be added in a later part.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAE7D6',         // Warm off-white
  },

  header: {
    backgroundColor: '#5D7B6F',         // Deep teal-green
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EAE7D6',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#B0D4B8',
    marginTop: 2,
  },

  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    paddingTop: 36,
  },

  // Circular avatar
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#A4C3A2',         // Soft green
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#5D7B6F',             // Deep teal border
    elevation: 4,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  avatarEmoji: {
    fontSize: 40,
  },

  // Role badge
  badge: {
    backgroundColor: '#5D7B6F',         // Deep teal
    paddingVertical: 7,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginBottom: 28,
  },
  badgeText: {
    color: '#EAE7D6',                   // Off-white text
    fontWeight: '700',
    fontSize: 14,
  },

  // Info card
  card: {
    backgroundColor: '#D7F9FA',         // Light cyan info area
    borderRadius: 20,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 15,
    color: '#5D7B6F',
    textAlign: 'center',
    lineHeight: 24,
  },
});
