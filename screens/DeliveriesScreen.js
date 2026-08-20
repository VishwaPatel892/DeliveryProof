import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DeliveriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deliveries</Text>
      <Text style={styles.infoText}>Your assigned deliveries will appear here.</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
