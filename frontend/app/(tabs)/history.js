// app/(tabs)/history.js — Green Palette
//
// COLOR ROLES:
//   #EAE7D6  → Screen background
//   #5D7B6F  → Header (deep teal)
//   #A4C3A2  → Card background (soft green)
//   #B0D4B8  → Status / secondary highlights
//   #D7F9FA  → Light information areas

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Delivery History</Text>
        <Text style={styles.headerSubtitle}>Your completed deliveries</Text>
      </View>

      {/* ── Placeholder ── */}
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.icon}>📋</Text>
          <Text style={styles.cardTitle}>No history yet</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#A4C3A2',         // Soft green
    borderRadius: 20,
    padding: 36,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  icon: {
    fontSize: 52,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#5D7B6F',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.8,
  },
});
