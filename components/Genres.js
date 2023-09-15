import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import GenreDetail from "./GenreDetail";

const Stack = createNativeStackNavigator();

const Genres = () => {
  const allGenres = ["Ficção Científica", "Aventura", "Romance"];
  const [searchText, setSearchText] = useState("");
  const [filteredGenres, setFilteredGenres] = useState(allGenres);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = allGenres.filter((genre) =>
      genre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredGenres(filtered);
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Genres">
        <Stack.Screen
          name="Genres"
          options={{
            headerShown: false,
          }}
        >
          {({ navigation }) => (
            <View style={styles.containerPrincipal}>
              <View style={styles.topBar}>
                <Text style={styles.logo}>BetterMovies</Text>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                  <View style={styles.searchBar}>
                    <TextInput
                      placeholder="Pesquisar gêneros..."
                      style={styles.input}
                      onChangeText={(text) => handleSearch(text)}
                      value={searchText}
                    />
                  </View>
                  <Text style={styles.title}>Gêneros</Text>
                  {filteredGenres.length === 0 ? (
                    <Text style={styles.noGenres}>
                      Nenhum gênero encontrado
                    </Text>
                  ) : (
                    <FlatList
                      data={filteredGenres}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <Pressable
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed ? "#002D5E" : "#252b56",
                              opacity: pressed ? 0.5 : 1,
                              borderRadius: 10,
                              padding: 10,
                              margin: 5,
                            },
                            styles.customButton,
                          ]}
                          onPress={() =>
                            navigation.navigate("GenreDetail", {
                              genre: item,
                            })
                          }
                        >
                          <Text style={styles.customButtonText}>{item}</Text>
                        </Pressable>
                      )}
                    />
                  )}
                </View>
              </View>
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="GenreDetail"
          component={GenreDetail}
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => {
                  navigation.navigate("Genres");
                }}
              />
            ),
            title: "BetterMovies",
            headerStyle: {
              backgroundColor: "#15214F",
            },
            headerTintColor: "white",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: "#141839",
    flexDirection: "column",
  },
  topBar: {
    flexDirection: "row",
    height: 100,
    backgroundColor: "#15214F",
  },
  customButton: {
    margin: 15,
  },
  logo: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 25,
    marginLeft: 30,
  },
  contentContainer: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    marginTop: 12,
    margin: 10,
  },
  input: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 32,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    paddingBottom: 10,
  },
  noGenres: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  customButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
});

export default Genres;
