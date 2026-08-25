// components/DetailRow.js
//
// REUSABLE DETAIL ROW COMPONENT — Part 4
//
// WHAT IS THIS COMPONENT FOR?
// - Instead of writing separate views and text elements for every single
//   detail line (Customer name, Address, Phone, Items, etc.), we write
//   a single reusable Row component.
// - It accepts two props:
//     label → The category title (e.g. "Customer", "Address")
//     value → The text data (e.g. "Rahul Sharma", "Satellite, Ahmedabad")
//
// STYLE:
// - Uses a clean vertical key-value layout with a bottom border separator.
// - Uses deep teal (#5D7B6F) for labels and a readable dark variant for values.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(93, 123, 111, 0.15)', // faint deep teal line
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#5D7B6F',                   // Deep teal-green
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: '#3B4E46',                   // Dark slate for readability
    fontWeight: '500',
  },
});
