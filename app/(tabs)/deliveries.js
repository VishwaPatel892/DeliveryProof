// app/(tabs)/deliveries.js — Green Palette
//
// COLOR ROLES:
//   #EAE7D6  → Screen background
//   #5D7B6F  → Header (deep teal)
//   #B0D4B8  → Header subtitle text (light green)

import React from 'react';
import { View, Text, FlatList, Alert, SafeAreaView, StyleSheet } from 'react-native';
import deliveries from '../../data/deliveries';
import DeliveryCard from '../../components/DeliveryCard';

// ── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyTitle}>No deliveries found</Text>
      <Text style={styles.emptySubtitle}>
        Your assigned deliveries will appear here.
      </Text>
    </View>
  );
}

// ── Deliveries Screen ────────────────────────────────────────────────────────
export default function DeliveriesScreen() {

  const renderItem = ({ item }) => (
    <DeliveryCard
      delivery={item}
      onPress={() => {
        Alert.alert(
          'Delivery Selected',
          `Order ${item.orderId} selected.\nDelivery Details screen coming in Part 3.`,
          [{ text: 'OK' }]
        );
      }}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Deliveries</Text>
        <Text style={styles.headerSubtitle}>{deliveries.length} deliveries assigned</Text>
      </View>

      {/* ── FlatList ── */}
      <FlatList
        data={deliveries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
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
    color: '#EAE7D6',                   // Off-white
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#B0D4B8',                   // Light green
    marginTop: 2,
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },

  // ── Empty State ──
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#5D7B6F',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.7,
  },
});
