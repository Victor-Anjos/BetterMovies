import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

const Config = () => {
  const [language, setLanguage] = useState("Português");
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

  const toggleNotifications = () => {
    setNotifications((prevState) => !prevState);
  };

  const togglePrivacy = () => {
    setPrivacy((prevState) => !prevState);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setLanguageModalVisible(false); // Close the language modal
  };

  const languageOptions = ["Português", "Español", "English"];

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Configurações</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Idioma:</Text>
        <TouchableOpacity
          onPress={() => setLanguageModalVisible(true)}
          style={styles.languageButton}
        >
          <Text style={styles.languageText}>{language}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações:</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            {notifications ? "Ativado" : "Desativado"}
          </Text>
          <Switch value={notifications} onValueChange={toggleNotifications} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacidade:</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            {privacy ? "Ativado" : "Desativado"}
          </Text>
          <Switch value={privacy} onValueChange={togglePrivacy} />
        </View>
      </View>

      <Modal
        visible={isLanguageModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.languageModal}>
          {languageOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleLanguageChange(option)}
              style={[
                styles.languageOption,
                option === language && styles.selectedLanguageOption,
              ]}
            >
              <Text
                style={[
                  styles.languageOptionText,
                  option === language && styles.selectedLanguageOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => setLanguageModalVisible(false)}
            style={styles.closeModal}
          >
            <Text style={styles.closeModalText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141839", // Changed background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    alignSelf: "center",
    marginTop: 30,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: "#15214F",
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  section: {
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: "#252b56",
    padding: 20,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  languageButton: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    borderRadius: 5,
  },
  languageText: {
    fontSize: 16,
  },
  languageModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  languageOption: {
    width: "80%",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
  },
  selectedLanguageOption: {
    backgroundColor: "#252b56",
  },
  languageOptionText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  selectedLanguageOptionText: {
    color: "#FFFFFF",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    fontSize: 16,
  },
  closeModal: {
    marginTop: 20,
    backgroundColor: "#252b56",
    paddingHorizontal: 130,
    padding: 10,
  },
  closeModalText: {
    fontSize: 18,
    color: "white",
  },
});

export default Config;
