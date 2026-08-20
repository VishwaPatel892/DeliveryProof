import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';

export default function DeliveryDetailsScreen({ route }) {
  const { delivery } = route.params;

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
        <Text style={[styles.value, delivery.status === 'Delivered' ? styles.statusDelivered : styles.statusPending]}>
          {delivery.status}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.actionButton}
          onPress={() => Alert.alert('Location feature will be added later')}
        >
          <Text style={styles.buttonText}>VERIFY LOCATION</Text>
        </Pressable>

        <Pressable 
          style={styles.actionButton}
          onPress={() => Alert.alert('Camera feature will be added later')}
        >
          <Text style={styles.buttonText}>CAPTURE DELIVERY PHOTO</Text>
        </Pressable>

        <Pressable 
          style={styles.actionButton}
          onPress={() => Alert.alert('Contacts feature will be added later')}
        >
          <Text style={styles.buttonText}>SELECT CUSTOMER CONTACT</Text>
        </Pressable>

        <Pressable 
          style={[styles.actionButton, styles.completeButton]}
          onPress={() => Alert.alert('Complete Delivery feature will be added later')}
        >
          <Text style={styles.buttonText}>COMPLETE DELIVERY</Text>
        </Pressable>
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
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  statusPending: {
    color: '#d97706',
    fontWeight: 'bold',
  },
  statusDelivered: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: '#0055ff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  completeButton: {
    backgroundColor: '#16a34a',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
