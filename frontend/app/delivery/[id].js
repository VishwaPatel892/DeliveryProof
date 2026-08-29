import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, Alert, Image } from 'react-native';
import { useLocalSearchParams, router, Link } from 'expo-router';
import deliveries from '../../data/deliveries';
import DetailRow from '../../components/DetailRow';
import DeliveryTimeline from '../../components/DeliveryTimeline';

export default function DeliveryDetailsScreen() {
  const { id, photoUri, photoTimestamp, contactName, contactPhone, contactImage } = useLocalSearchParams();
  const delivery = deliveries.find((d) => d.id === id);

  const [status, setStatus] = useState(delivery ? delivery.status : '');
  const [timeline, setTimeline] = useState({});
  const [photo, setPhoto] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (delivery) {
      setStatus(delivery.status);
      const initialTimeline = {};
      const statuses = ["Assigned", "Picked Up", "On the Way", "Arrived", "Delivered"];
      let currentTimelineStatus = delivery.status;
      if (delivery.status === "Pending") {
        currentTimelineStatus = "Assigned";
      }
      const currentIndex = statuses.indexOf(currentTimelineStatus);
      const baseHour = 10;
      for (let i = 0; i <= currentIndex && i < statuses.length; i++) {
        const stage = statuses[i];
        const mins = i * 15;
        const hour = baseHour + Math.floor(mins / 60);
        const displayMin = (mins % 60).toString().padStart(2, '0');
        const displayHour = hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 ? "PM" : "AM";
        initialTimeline[stage] = `${displayHour}:${displayMin} ${ampm}`;
      }
      setTimeline(initialTimeline);
    }
  }, [id]);

  useEffect(() => {
    if (photoUri) {
      setPhoto({
        uri: photoUri,
        timestamp: photoTimestamp
      });
    }
  }, [photoUri, photoTimestamp]);

  useEffect(() => {
    if (contactName) {
      setSelectedContact({
        name: contactName,
        phone: contactPhone,
        image: contactImage
      });
    }
  }, [contactName, contactPhone, contactImage]);

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

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === "Pending") return "Picked Up";
    if (currentStatus === "Picked Up") return "On the Way";
    if (currentStatus === "On the Way") return "Arrived";
    if (currentStatus === "Arrived") return "Delivered";
    return null;
  };

  const getButtonText = (currentStatus) => {
    if (currentStatus === "Pending") return "MARK AS PICKED UP";
    if (currentStatus === "Picked Up") return "START DELIVERY";
    if (currentStatus === "On the Way") return "MARK AS ARRIVED";
    if (currentStatus === "Arrived") return "MARK AS DELIVERED";
    return "";
  };

  const getStatusColor = (currentStatus) => {
    if (currentStatus === "Delivered") return "#5D7B6F";
    if (currentStatus === "Failed") return "#5D7B6F";
    if (currentStatus === "On the Way") return "#B0D4B8";
    if (currentStatus === "Arrived") return "#A4C3A2";
    if (currentStatus === "Picked Up") return "#B0D4B8";
    return "#5D7B6F";
  };

  const handleUpdateStatus = () => {
    const nextStatus = getNextStatus(status);
    if (!nextStatus) return;

    Alert.alert(
      "Are you sure?",
      `Mark this delivery as ${nextStatus}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            setStatus(nextStatus);
            const currentTime = formatTime(new Date());
            setTimeline((prev) => ({
              ...prev,
              [nextStatus]: currentTime
            }));
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Delivery Details</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.orderTitle}>📦 Order ID: {delivery.orderId}</Text>
          <DetailRow label="Customer" value={delivery.customerName} />
          <DetailRow label="Phone" value={delivery.phone} />
          <DetailRow label="Address" value={delivery.address} />
          <DetailRow label="Area" value={delivery.area} />
          <DetailRow label="Items" value={delivery.items} />
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Current Status</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>

        <View style={styles.timelineCard}>
          <Text style={styles.sectionTitle}>Delivery Timeline</Text>
          <DeliveryTimeline status={status} timeline={timeline} />
        </View>

        <View style={styles.contactCardContainer}>
          <Text style={styles.sectionTitle}>Customer Contact</Text>
          {selectedContact ? (
            <View>
              <Text style={styles.contactSelectedText}>Selected from Contacts ✓</Text>
              <View style={styles.contactInfoRow}>
                {selectedContact.image ? (
                  <Image source={{ uri: selectedContact.image }} style={styles.contactAvatar} />
                ) : (
                  <View style={styles.contactAvatarPlaceholder}>
                     <Text style={styles.contactAvatarText}>
                       {selectedContact.name.charAt(0).toUpperCase()}
                     </Text>
                  </View>
                )}
                <View style={styles.contactDetails}>
                  <Text style={styles.contactName}>{selectedContact.name}</Text>
                  <Text style={styles.contactPhone}>{selectedContact.phone}</Text>
                </View>
              </View>
              <Pressable
                style={({ pressed }) => [styles.captureBtn, pressed && styles.buttonPressed]}
                onPress={() => router.push({
                  pathname: `/delivery/contacts/${id}`,
                  params: {
                    photoUri: photo ? photo.uri : '',
                    photoTimestamp: photo ? photo.timestamp : ''
                  }
                })}
              >
                <Text style={styles.captureBtnText}>CHANGE CONTACT</Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <Text style={styles.noContactText}>No customer contact selected.</Text>
              <Pressable
                style={({ pressed }) => [styles.captureBtn, pressed && styles.buttonPressed]}
                onPress={() => router.push({
                  pathname: `/delivery/contacts/${id}`,
                  params: {
                    photoUri: photo ? photo.uri : '',
                    photoTimestamp: photo ? photo.timestamp : ''
                  }
                })}
              >
                <Text style={styles.captureBtnText}>SELECT CUSTOMER CONTACT</Text>
              </Pressable>
            </View>
          )}
        </View>

        <View style={styles.photoCard}>
          <Text style={styles.sectionTitle}>Delivery Photo Proof</Text>
          {photo ? (
            <View>
              <Text style={styles.photoStatusText}>Delivery photo captured ✓</Text>
              <Image source={{ uri: photo.uri }} style={styles.photoPreview} />
              <View style={styles.photoInfoContainer}>
                <DetailRow label="Delivery" value={delivery.orderId} />
                <DetailRow label="Captured" value={photo.timestamp} />
              </View>
              <Pressable
                style={({ pressed }) => [styles.captureBtn, pressed && styles.buttonPressed]}
                onPress={() => router.push({
                  pathname: `/delivery/camera/${id}`,
                  params: {
                    contactName: selectedContact ? selectedContact.name : '',
                    contactPhone: selectedContact ? selectedContact.phone : '',
                    contactImage: selectedContact ? selectedContact.image : ''
                  }
                })}
              >
                <Text style={styles.captureBtnText}>CAPTURE NEW PHOTO</Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <Text style={styles.noPhotoText}>No delivery photo captured yet.</Text>
              <Pressable
                style={({ pressed }) => [styles.captureBtn, pressed && styles.buttonPressed]}
                onPress={() => router.push({
                  pathname: `/delivery/camera/${id}`,
                  params: {
                    contactName: selectedContact ? selectedContact.name : '',
                    contactPhone: selectedContact ? selectedContact.phone : '',
                    contactImage: selectedContact ? selectedContact.image : ''
                  }
                })}
              >
                <Text style={styles.captureBtnText}>CAPTURE DELIVERY PHOTO</Text>
              </Pressable>
            </View>
          )}
        </View>

        <View style={styles.actionContainer}>
          {status === "Delivered" ? (
            <View style={styles.completedContainer}>
              <Text style={styles.completedText}>✓ Delivery Completed</Text>
              {timeline["Delivered"] ? (
                <Text style={styles.completedTimestamp}>Completed at {timeline["Delivered"]}</Text>
              ) : null}
            </View>
          ) : status === "Failed" ? (
            <View style={styles.failedContainer}>
              <Text style={styles.failedText}>Delivery Failed</Text>
            </View>
          ) : (
            <Pressable
              style={({ pressed }) => [styles.actionButton, pressed && styles.buttonPressed]}
              onPress={handleUpdateStatus}
            >
              <Text style={styles.actionButtonText}>{getButtonText(status)}</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.linkContainer}>
          <Link href="/(tabs)/deliveries" asChild>
            <Pressable style={({ pressed }) => [styles.textLink, pressed && styles.buttonPressed]}>
              <Text style={styles.textLinkText}>View All Deliveries</Text>
            </Pressable>
          </Link>
        </View>

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
  safeArea: {
    flex: 1,
    backgroundColor: '#EAE7D6',
  },
  header: {
    backgroundColor: '#5D7B6F',
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
    color: '#EAE7D6',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#A4C3A2',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#B0D4B8',
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
  statusCard: {
    backgroundColor: '#D7F9FA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#B0D4B8',
    elevation: 2,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 16,
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
  timelineCard: {
    backgroundColor: '#D7F9FA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#B0D4B8',
    elevation: 2,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 12,
  },
  contactCardContainer: {
    backgroundColor: '#D7F9FA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#B0D4B8',
    elevation: 2,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 16,
  },
  contactSelectedText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 12,
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAE7D6',
    borderWidth: 1,
    borderColor: '#B0D4B8',
  },
  contactAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAE7D6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0D4B8',
  },
  contactAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D7B6F',
  },
  contactDetails: {
    marginLeft: 16,
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D7B6F',
  },
  contactPhone: {
    fontSize: 14,
    color: '#5D7B6F',
    marginTop: 4,
  },
  noContactText: {
    fontSize: 15,
    color: '#5D7B6F',
    textAlign: 'center',
    marginVertical: 12,
  },
  photoCard: {
    backgroundColor: '#D7F9FA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#B0D4B8',
    elevation: 2,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 16,
  },
  photoStatusText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 12,
  },
  photoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#000000',
  },
  photoInfoContainer: {
    marginBottom: 12,
  },
  noPhotoText: {
    fontSize: 15,
    color: '#5D7B6F',
    textAlign: 'center',
    marginVertical: 12,
  },
  captureBtn: {
    backgroundColor: '#5D7B6F',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  captureBtnText: {
    color: '#EAE7D6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionContainer: {
    marginBottom: 16,
  },
  actionButton: {
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
  actionButtonText: {
    color: '#EAE7D6',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  completedContainer: {
    backgroundColor: '#A4C3A2',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0D4B8',
  },
  completedText: {
    color: '#5D7B6F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  completedTimestamp: {
    color: '#5D7B6F',
    fontSize: 13,
    marginTop: 4,
  },
  failedContainer: {
    backgroundColor: '#EAE7D6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A4C3A2',
  },
  failedText: {
    color: '#5D7B6F',
    fontWeight: 'bold',
    fontSize: 16,
  },
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
