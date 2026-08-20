import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { dummyDeliveries } from '../data/deliveries';

export default function DeliveriesScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.orderId}>📦 Order #{item.orderId}</Text>
      
      <Text style={styles.text}>
        <Text style={styles.label}>Customer: </Text>
        {item.customerName}
      </Text>
      
      <Text style={styles.text}>
        <Text style={styles.label}>Area: </Text>
        {item.area}, Ahmedabad
      </Text>
      
      <Text style={styles.text}>
        <Text style={styles.label}>Items: </Text>
        {item.items}
      </Text>
      
      <Text style={styles.text}>
        <Text style={styles.label}>Status: </Text>
        <Text style={item.status === 'Delivered' ? styles.statusDelivered : styles.statusPending}>
          {item.status}
        </Text>
      </Text>

      <Pressable 
        style={styles.button}
        onPress={() => Alert.alert(`Order #${item.orderId} selected`)}
      >
        <Text style={styles.buttonText}>VIEW DELIVERY</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyDeliveries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  statusPending: {
    color: '#d97706',
    fontWeight: 'bold',
  },
  statusDelivered: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0055ff',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
