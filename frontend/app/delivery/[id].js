// app/delivery/[id].js
//
// DYNAMIC ROUTE FOR DELIVERY DETAILS — Part 4
//
// WHAT IS A DYNAMIC ROUTE?
// - In Expo Router, a filename with brackets like `[id].js` is a dynamic route.
// - It matches any URL path like `/delivery/1`, `/delivery/2`, etc.
// - The actual value in the URL (e.g. "1") is mapped to the parameter name `id`.
//
// HOW `useLocalSearchParams()` WORKS:
// - It is a hook from Expo Router that extracts parameters from the current route path.
// - If the URL path is `/delivery/3`, then `useLocalSearchParams()` returns `{ id: '3' }`.
//
// HOW `find()` WORKS:
// - Standard JavaScript array method that searches through the `deliveries` array
//   and returns the first object that satisfies our testing function (d.id === id).
//
// COLOR PALETTE (Green Theme):
//   Screen Background  → #EAE7D6 (Warm off-white)
//   Information Cards  → #A4C3A2 (Soft green)
//   Headers & Buttons  → #5D7B6F (Deep teal-green)
//   Status Highlights  → #B0D4B8 (Light green)
//   Secondary Info Card→ #D7F9FA (Light cyan accent)

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, router, Link } from 'expo-router';

// Import our dummy deliveries dataset
import deliveries from '../../data/deliveries';

// Import our reusable DetailRow child component
import DetailRow from '../../components/DetailRow';

// ── Status Color Helper ──────────────────────────────────────────────────────
function getStatusColor(status) {
  if (status === 'Delivered')   return '#6B9071';   // muted dark green
  if (status === 'Failed')      return '#A36868';   // muted dusty red
  if (status === 'On the Way')  return '#688CA3';   // muted slate blue
  if (status === 'Arrived')     return '#8868A3';   // muted dusty purple
  if (status === 'Picked Up')   return '#A38868';   // muted dusty amber
  return '#5D7B6F';                                  // deep teal-green (Pending)
}

export default function DeliveryDetailsScreen() {
  // 1. Get the dynamic delivery ID parameter from the URL path
  const { id } = useLocalSearchParams();

  // 2. Search for the corresponding delivery object
  const delivery = deliveries.find((d) => d.id === id);

  // ── Scenario A: Invalid/Missing Delivery ID (Conditional Rendering) ──────────
  if (!delivery) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Delivery Not Found</Text>
          <Text style={styles.errorSubtitle}>
            The delivery you are looking for does not exist or has been removed.
          </Text>

          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
            onPress={() => router.back()}
          >
            <Text style={styles.primaryButtonText}>BACK TO DELIVERIES</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ── Scenario B: Delivery Found (Normal rendering flow) ───────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* ── 1. Pressable Back Navigation Bar ── */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Delivery Details</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── 2. Primary Information Card (Soft Green) ── */}
        <View style={styles.card}>
          {/* Order Title */}
          <Text style={styles.orderTitle}>📦 Order ID: {delivery.orderId}</Text>

          {/* Reusable Detail Rows */}
          <DetailRow label="Customer" value={delivery.customerName} />
          <DetailRow label="Phone" value={delivery.phone} />
          <DetailRow label="Address" value={delivery.address} />
          <DetailRow label="Area" value={delivery.area} />
          <DetailRow label="Items" value={delivery.items} />
        </View>

        {/* ── 3. Secondary Highlight Status Card (Light Cyan Accent) ── */}
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Current Status</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(delivery.status) }]}>
            <Text style={styles.statusText}>{delivery.status}</Text>
          </View>
        </View>

        {/* ── 4. Expo Router Link Demonstration ── */}
        {/*
          Tapping this link will return the user back to the deliveries tab screen.
          We use the absolute tab route path: '/(tabs)/deliveries'.
        */}
        <View style={styles.linkContainer}>
          <Link href="/(tabs)/deliveries" asChild>
            <Pressable style={({ pressed }) => [styles.textLink, pressed && styles.buttonPressed]}>
              <Text style={styles.textLinkText}>View All Deliveries</Text>
            </Pressable>
          </Link>
        </View>

        {/* ── 5. Navigation Button ── */}
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
          onPress={() => router.back()}
        >
          <Text style={styles.primaryButtonText}>BACK TO DELIVERIES</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Main container (Warm off-white)
  safeArea: {
    flex: 1,
    backgroundColor: '#EAE7D6',
  },

  // Back header row
  header: {
    backgroundColor: '#5D7B6F',         // Deep teal-green
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  backButton: {
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EAE7D6',                   // Warm off-white
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  // Main Info Card (Soft Green)
  card: {
    backgroundColor: '#A4C3A2',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#B0D4B8',             // Light Green border
    elevation: 3,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#5D7B6F',
    paddingBottom: 8,
  },

  // Status Badge Card (Light Cyan Accent)
  statusCard: {
    backgroundColor: '#D7F9FA',         // Light cyan info area
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#B0D4B8',
    elevation: 2,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 24,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#5D7B6F',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  statusText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Link layout
  linkContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textLink: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  textLinkText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#5D7B6F',
    textDecorationLine: 'underline',
  },

  // Primary Action Button (Deep Teal)
  primaryButton: {
    backgroundColor: '#5D7B6F',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  primaryButtonText: {
    color: '#EAE7D6',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },

  // Error views
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 15,
    color: '#5D7B6F',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.8,
    marginBottom: 32,
  },
});
