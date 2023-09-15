import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const Profile = () => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState("victoranjos820@gmail.com");

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Perfil</Text>

        <TouchableOpacity style={styles.profileImageContainer}>
          <View style={styles.iconContainer}>
            <Feather name="camera" color="white" size={30} />
          </View>
        </TouchableOpacity>

        <Text style={styles.user}>Usuario</Text>
      </View>
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
    alignItems: "center", // Centralize os elementos verticalmente.
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
  profileImageText: {
    fontSize: 16,
    color: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  user: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#8A2BE2",
    borderRadius: 5,
    padding: 10,
  },
  captureButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Profile;
