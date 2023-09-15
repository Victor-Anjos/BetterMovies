import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";

const Profile = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      console.log("Photo taken:", uri);
      setPhoto(uri);
      setCameraVisible(false); // Fecha a câmera após tirar a foto
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Perfil</Text>

        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={() => setCameraVisible(true)}
        >
          {photo ? (
            <Image source={{ uri: photo }} style={styles.profileImage} />
          ) : (
            <View style={styles.iconContainer}>
              <Text style={styles.cameraText}>Tirar Foto</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={cameraVisible}
        onRequestClose={() => setCameraVisible(false)}
      >
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ratio="16:9"
        >
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => handleCapture()}
          >
            <View style={styles.captureButtonInner}>
              <View style={styles.captureButtonCircle}>
                <View style={styles.captureButtonCenter} />
              </View>
            </View>
          </TouchableOpacity>
        </Camera>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141839",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    alignSelf: "center",
    color: "white",
  },
  topBar: {
    flexDirection: "column",
    backgroundColor: "#15214F",
    marginBottom: 15,
    alignItems: "center",
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#141839",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#141839",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraText: {
    fontSize: 16,
    color: "white",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  captureButton: {
    alignSelf: "center",
    marginBottom: 20,
  },
  captureButtonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonCenter: {
    captureButton: {
      alignSelf: "center",
      marginBottom: 20,
      backgroundColor: "fff",
      borderRadius: 5,
      padding: 10,
    },
    captureButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "gray",
  },
  captureButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Profile;
