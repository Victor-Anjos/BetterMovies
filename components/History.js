import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const History = ({ navigation }) => {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Quando a tela é focada, carregue os filmes assistidos do AsyncStorage
      loadWatchedMoviesFromStorage();
    });

    return unsubscribe;
  }, [navigation]);

  const loadWatchedMoviesFromStorage = async () => {
    try {
      const storedMovies = await AsyncStorage.getItem("watchedMovies");
      if (storedMovies !== null) {
        setWatchedMovies(JSON.parse(storedMovies));
      }
    } catch (error) {
      console.error(
        "Erro ao carregar filmes assistidos do AsyncStorage:",
        error
      );
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = watchedMovies.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleRemoveMovieFromHistory = async (movieTitle) => {
    const updatedWatchedMovies = watchedMovies.filter(
      (movie) => movie.title !== movieTitle
    );
    setWatchedMovies(updatedWatchedMovies);

    try {
      await AsyncStorage.setItem(
        "watchedMovies",
        JSON.stringify(updatedWatchedMovies)
      );
    } catch (error) {
      console.error(
        "Erro ao atualizar filmes assistidos no AsyncStorage:",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Histórico</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Pesquisar no histórico..."
          style={styles.searchInput}
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <FlatList
        data={searchText ? filteredMovies : watchedMovies}
        keyExtractor={(item) => item.title}
        ListEmptyComponent={
          <Text style={styles.noMovies}>
            Nenhum filme no histórico encontrado
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <View style={styles.movieDetails}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieRelease}>{item.releaseDate}</Text>
              <Text style={styles.movieDuration}>{item.duration}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveMovieFromHistory(item.title)}
            >
              <View style={styles.removeButton}>
                <Text style={styles.removeButtonText}>
                  Remover do Histórico
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141839",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: "#15214F",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  searchInput: {
    margin: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
  },
  movieItem: {
    backgroundColor: "#252b56",
    padding: 10,
    margin: 16,
    marginBottom: 2,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movieDetails: {
    flex: 1,
    marginLeft: 16,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  movieRelease: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
    marginTop: 8,
  },
  movieDuration: {
    fontSize: 15,
    color: "#00CED1",
  },
  removeButton: {
    backgroundColor: "#FF5733",
    borderRadius: 5,
    padding: 8,
  },
  removeButtonText: {
    color: "white",
  },
  noMovies: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default History;
