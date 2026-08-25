// app/(tabs)/history.js
//
// HISTORY SCREEN — Route path: "/history"
//
// HOW THIS FILE BECOMES A ROUTE:
// - The filename `history.js` inside app/(tabs)/ becomes the route "/history".
// - Expo Router automatically registers it as the History tab screen.
//
// NOTE: Completed delivery history will be implemented in a later part.

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ── Screen Title ── */}
        <Text style={styles.title}>Delivery History</Text>

        {/* ── Placeholder Card ── */}
        <View style={styles.card}>
          {/* Icon placeholder */}
          <Text style={styles.icon}>📋</Text>

          <Text style={styles.cardText}>
            Your completed deliveries will appear here.
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

  // Page title
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 32,
  },

  // White rounded placeholder card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 36,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },

  // Large emoji icon in the card
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },

  // Placeholder message text
  cardText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
