import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

export default function ContactCard({ contact, onPress }) {
  const name = contact.name || "Unknown";
  const phone = contact.phoneNumbers && contact.phoneNumbers.length > 0
    ? contact.phoneNumbers[0].number
    : "Phone number not available";
  const imageUri = contact.image?.uri;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>
      <Pressable style={styles.selectButton} onPress={() => onPress(contact)}>
        <Text style={styles.selectButtonText}>SELECT</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#A4C3A2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#B0D4B8',
    elevation: 2,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D7F9FA',
  },
  placeholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D7F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0D4B8',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D7B6F',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D7B6F',
  },
  phone: {
    fontSize: 14,
    color: '#5D7B6F',
    marginTop: 2,
  },
  selectButton: {
    backgroundColor: '#5D7B6F',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#EAE7D6',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
