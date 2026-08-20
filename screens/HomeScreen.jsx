import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { dummyDeliveries } from '../data/deliveries';

export default function HomeScreen() {
  const totalDeliveries = dummyDeliveries.length;
  const pendingDeliveries = dummyDeliveries.filter(d => d.status === 'Pending').length;
  const deliveredDeliveries = dummyDeliveries.filter(d => d.status === 'Delivered').length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DeliveryProof</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Today's Deliveries</Text>
        
        <Text style={styles.statText}>
          <Text style={styles.label}>Total: </Text>
          {totalDeliveries}
        </Text>
        
        <Text style={styles.statText}>
          <Text style={styles.label}>Pending: </Text>
          {pendingDeliveries}
        </Text>
        
        <Text style={styles.statText}>
          <Text style={styles.label}>Delivered: </Text>
          {deliveredDeliveries}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0055ff',
    marginBottom: 30,
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});
