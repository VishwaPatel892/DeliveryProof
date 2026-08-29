import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import deliveries from '../../../data/deliveries';

export default function CameraScreen() {
  const { id } = useLocalSearchParams();
  const delivery = deliveries.find((d) => d.id === id);

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState("back");
  const [torch, setTorch] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  if (!permission) {
    return <View style={styles.loadingContainer} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.permissionContainer}>
          <Text style={styles.title}>Camera Permission Required</Text>
          <Text style={styles.subtitle}>
            Please allow camera access to capture delivery proof.
          </Text>
          <Pressable style={styles.primaryButton} onPress={requestPermission}>
            <Text style={styles.primaryButtonText}>Allow Camera</Text>
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

  const handleCapture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.8 };
      const photo = await cameraRef.current.takePictureAsync(options);
      setPhotoUri(photo.uri);
    }
  };

  const handleUsePhoto = () => {
    router.replace({
      pathname: `/delivery/${id}`,
      params: {
        photoUri: photoUri,
        photoTimestamp: formatTime(new Date())
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Delivery Proof Photo</Text>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Delivery:</Text>
              <Text style={styles.infoValue}>{delivery ? delivery.orderId : id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Captured:</Text>
              <Text style={styles.infoValue}>{formatTime(new Date())}</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <Pressable style={styles.secondaryButton} onPress={() => setPhotoUri(null)}>
              <Text style={styles.secondaryButtonText}>RETAKE</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={handleUsePhoto}>
              <Text style={styles.primaryButtonText}>USE PHOTO</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <View style={styles.header}>
            <Pressable style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Text style={styles.headerTitle}>Capture Photo</Text>
            <View style={styles.headerSpacer} />
          </View>

          <CameraView
            style={styles.camera}
            facing={facing}
            enableTorch={torch}
            ref={cameraRef}
          />

          <View style={styles.controlsBar}>
            <Pressable style={styles.controlButton} onPress={() => setFacing(facing === "back" ? "front" : "back")}>
              <Text style={styles.controlButtonText}>FLIP</Text>
            </Pressable>

            <Pressable style={styles.captureButtonOuter} onPress={handleCapture}>
              <View style={styles.captureButtonInner} />
            </Pressable>

            <Pressable style={styles.controlButton} onPress={() => setTorch(!torch)}>
              <Text style={styles.controlButtonText}>{torch ? "FLASH: ON" : "FLASH: OFF"}</Text>
            </Pressable>
          </View>
        </View>
      )}
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
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5D7B6F',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cancelButton: {
    paddingVertical: 4,
  },
  cancelButtonText: {
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
    width: 50,
  },
  camera: {
    flex: 1,
  },
  controlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#5D7B6F',
    paddingVertical: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  controlButton: {
    padding: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#EAE7D6',
    fontSize: 14,
    fontWeight: 'bold',
  },
  captureButtonOuter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#EAE7D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EAE7D6',
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  previewTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 350,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: '#000000',
  },
  infoCard: {
    backgroundColor: '#D7F9FA',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#B0D4B8',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5D7B6F',
  },
  infoValue: {
    fontSize: 15,
    color: '#5D7B6F',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#5D7B6F',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#EAE7D6',
    fontWeight: 'bold',
    fontSize: 15,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#A4C3A2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#B0D4B8',
  },
  secondaryButtonText: {
    color: '#5D7B6F',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
