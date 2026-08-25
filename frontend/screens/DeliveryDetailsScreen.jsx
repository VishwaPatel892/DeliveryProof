import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';

export default function DeliveryDetailsScreen({ route }) {
  const { delivery } = route.params;
  const [currentStatus, setCurrentStatus] = useState(delivery.status);

  const handleStartDelivery = () => {
    setCurrentStatus('Out for Delivery');
  };

  const handleCompleteDelivery = () => {
    setCurrentStatus('Delivered');
  };

  // Helper function to get badge color based on status
  const getBadgeStyle = () => {
    if (currentStatus === 'Delivered') return styles.badgeDelivered;
    if (currentStatus === 'Out for Delivery') return styles.badgeOut;
    return styles.badgePending;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>ORDER #{delivery.orderId}</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Customer</Text>
        <Text style={styles.value}>{delivery.customerName}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{delivery.phone}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{delivery.address}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Area</Text>
        <Text style={styles.value}>{delivery.area}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Items</Text>
        <Text style={styles.value}>{delivery.items}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <View style={[styles.statusBadge, getBadgeStyle()]}>
          <Text style={styles.statusBadgeText}>{currentStatus}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {/* Placeholder Buttons for future features */}
        <Pressable 
          style={styles.placeholderButton}
          onPress={() => Alert.alert('Location feature will be added later')}
        >
          <Text style={styles.placeholderButtonText}>VERIFY LOCATION</Text>
        </Pressable>

        <Pressable 
          style={styles.placeholderButton}
          onPress={() => Alert.alert('Camera feature will be added later')}
        >
          <Text style={styles.placeholderButtonText}>CAPTURE DELIVERY PHOTO</Text>
        </Pressable>

        <Pressable 
          style={styles.placeholderButton}
          onPress={() => Alert.alert('Contacts feature will be added later')}
        >
          <Text style={styles.placeholderButtonText}>SELECT CUSTOMER CONTACT</Text>
        </Pressable>

        {/* Conditional rendering for Delivery Action Buttons */}
        {currentStatus === 'Pending' && (
          <Pressable 
            style={[styles.actionButton, styles.startButton]}
            onPress={handleStartDelivery}
          >
            <Text style={styles.buttonText}>START DELIVERY</Text>
          </Pressable>
        )}

        {currentStatus === 'Out for Delivery' && (
          <Pressable 
            style={[styles.actionButton, styles.completeButton]}
            onPress={handleCompleteDelivery}
          >
            <Text style={styles.buttonText}>COMPLETE DELIVERY</Text>
          </Pressable>
        )}

        {currentStatus === 'Delivered' && (
          <View style={styles.completedContainer}>
            <Text style={styles.completedText}>✅ Delivery Completed</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  badgePending: {
    backgroundColor: '#fef3c7', // light amber
    borderColor: '#d97706',
    borderWidth: 1,
  },
  badgeOut: {
    backgroundColor: '#dbeafe', // light blue
    borderColor: '#2563eb',
    borderWidth: 1,
  },
  badgeDelivered: {
    backgroundColor: '#dcfce7', // light green
    borderColor: '#16a34a',
    borderWidth: 1,
  },
  statusBadgeText: {
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  placeholderButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  placeholderButtonText: {
    color: '#4b5563',
    fontWeight: 'bold',
    fontSize: 13,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  startButton: {
    backgroundColor: '#0055ff',
  },
  completeButton: {
    backgroundColor: '#16a34a',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  completedContainer: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  completedText: {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
