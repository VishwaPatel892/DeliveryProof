// components/DeliveryCard.js — Green Palette
//
// COLOR ROLES:
//   #EAE7D6  → Warm Off-White (Button text)
//   #A4C3A2  → Soft Green (Card background)
//   #5D7B6F  → Deep Teal-Green (Header text, button bg, text)
//   #B0D4B8  → Light Green (Divider, secondary highlights)
//   #D7F9FA  → Light Cyan (Alternative elements)

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// ── Status Color Helper ──────────────────────────────────────────────────────
// Returns a background color for the status badge.
// We desaturate these to blend beautifully with the soft green card background.
function getStatusColor(status) {
  if (status === 'Delivered')   return '#6B9071';   // muted dark green
  if (status === 'Failed')      return '#A36868';   // muted dusty red
  if (status === 'On the Way')  return '#688CA3';   // muted slate blue
  if (status === 'Arrived')     return '#8868A3';   // muted dusty purple
  if (status === 'Picked Up')   return '#A38868';   // muted dusty amber
  return '#5D7B6F';                                  // deep teal-green (Pending)
}

function DeliveryCard({ delivery, onPress }) {
  return (
    <View style={styles.card}>

      {/* ── Order ID ── */}
      <Text style={styles.orderId}>📦 {delivery.orderId}</Text>

      {/* ── Customer Name ── */}
      <Text style={styles.customerName}>{delivery.customerName}</Text>

      {/* ── Area ── */}
      <Text style={styles.detail}>📍 {delivery.area}, Ahmedabad</Text>

      {/* ── Items ── */}
      <Text style={styles.detail}>🗃️ {delivery.items}</Text>

      {/* ── Status Badge ── */}
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(delivery.status) }]}>
        <Text style={styles.statusText}>{delivery.status}</Text>
      </View>

      {/* ── Divider ── */}
      <View style={styles.divider} />

      {/* ── VIEW DELIVERY Button ── */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => onPress(delivery)}
      >
        <Text style={styles.buttonText}>VIEW DELIVERY</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#A4C3A2',         // Soft Green
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#B0D4B8',             // Light Green border

    // iOS shadow
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,

    // Android shadow
    elevation: 3,
  },

  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D7B6F',                   // Deep Teal-Green
    marginBottom: 6,
  },

  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5D7B6F',
    marginBottom: 4,
  },

  detail: {
    fontSize: 14,
    color: '#3B4E46',                   // Darker teal/slate for readability
    opacity: 0.9,
    marginBottom: 4,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 4,
  },

  statusText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  divider: {
    height: 1,
    backgroundColor: '#B0D4B8',         // Light Green divider
    marginVertical: 12,
  },

  button: {
    backgroundColor: '#5D7B6F',         // Deep Teal-Green button
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    color: '#EAE7D6',                   // Warm Off-White text
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default DeliveryCard;
