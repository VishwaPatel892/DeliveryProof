import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Contacts from 'expo-contacts';
import ContactCard from '../../../components/ContactCard';

export default function ContactsScreen() {
  const { id, photoUri, photoTimestamp } = useLocalSearchParams();

  const [permissionStatus, setPermissionStatus] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = async () => {
    try {
      const { status } = await Contacts.getPermissionsAsync();
      setPermissionStatus(status);
      if (status === 'granted') {
        loadContacts();
      }
    } catch (error) {
      Alert.alert("Error", "Unable to check contacts permission.");
    }
  };

  const handleAllowContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      setPermissionStatus(status);
      if (status === 'granted') {
        loadContacts();
      }
    } catch (error) {
      Alert.alert("Error", "Unable to request contacts permission.");
    }
  };

  const loadContacts = async () => {
    setLoading(true);
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Image
        ]
      });
      setContacts(data || []);
    } catch (error) {
      Alert.alert("Error", "Unable to load contacts from this device.");
    } finally {
      setLoading(false);
    }
  };

  const selectContact = (contact) => {
    const phone = contact.phoneNumbers && contact.phoneNumbers.length > 0
      ? contact.phoneNumbers[0].number
      : "Phone number not available";

    router.replace({
      pathname: `/delivery/${id}`,
      params: {
        photoUri: photoUri || '',
        photoTimestamp: photoTimestamp || '',
        contactName: contact.name || "Unknown",
        contactPhone: phone,
        contactImage: contact.image?.uri || ''
      }
    });
  };

  const filteredContacts = contacts.filter((c) => {
    const nameMatch = c.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const phoneMatch = c.phoneNumbers && c.phoneNumbers.some((p) =>
      p.number?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return nameMatch || phoneMatch;
  });

  if (permissionStatus === null) {
    return <View style={styles.loadingContainer} />;
  }

  if (permissionStatus !== 'granted') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>← Back</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Select Customer</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.permissionContainer}>
          <Text style={styles.title}>Contacts Permission Required</Text>
          <Text style={styles.subtitle}>
            Allow access to your contacts to select the customer.
          </Text>
          <Pressable style={styles.primaryButton} onPress={handleAllowContacts}>
            <Text style={styles.primaryButtonText}>ALLOW CONTACTS</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Select Customer</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Contacts</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          placeholderTextColor="#5D7B6F"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#5D7B6F" />
            <Text style={styles.loadingText}>Loading contacts...</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {contacts.length === 0 ? (
              <View style={styles.centerContainer}>
                <Text style={styles.emptyTitle}>No contacts found</Text>
                <Text style={styles.emptySubtitle}>
                  There are no contacts available on this device.
                </Text>
              </View>
            ) : filteredContacts.length === 0 ? (
              <View style={styles.centerContainer}>
                <Text style={styles.countText}>0 Contacts</Text>
                <Text style={styles.emptyTitle}>No matching contacts</Text>
                <Text style={styles.emptySubtitle}>
                  Try a different name or phone number.
                </Text>
              </View>
            ) : (
              <View style={styles.flexOne}>
                <Text style={styles.countText}>
                  {filteredContacts.length} Contact{filteredContacts.length !== 1 ? 's' : ''}
                </Text>
                <FlatList
                  data={filteredContacts}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <ContactCard contact={item} onPress={selectContact} />
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAE7D6',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#EAE7D6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5D7B6F',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  backBtn: {
    paddingVertical: 4,
  },
  backBtnText: {
    color: '#EAE7D6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#EAE7D6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 60,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#D7F9FA',
    borderWidth: 1,
    borderColor: '#B0D4B8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#5D7B6F',
    marginBottom: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#5D7B6F',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  countText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#5D7B6F',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#5D7B6F',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#EAE7D6',
    fontWeight: 'bold',
    fontSize: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#5D7B6F',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
});
