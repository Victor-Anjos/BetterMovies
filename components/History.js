import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const History = () => {
  const [movies, setMovies] = useState([
    {
      id: "1",
      title: "Matrix",
      year: "1999",
      description: "Um filme de ficção científica.",
    },
    {
      id: "2",
      title: "Inception",
      year: "2010",
      description: "Um filme de suspense e ação.",
    },
    {
      id: "3",
      title: "Interstellar",
      year: "2014",
      description: "Um épico de ficção científica.",
    },
    // Adicione mais filmes aqui
  ]);

  const [searchText, setSearchText] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
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
          onChangeText={(text) => handleSearch(text)}
          value={searchText}
        />
      </View>
      {filteredMovies.length === 0 ? (
        <Text style={styles.noMovies}>
          Nenhum filme no histórico encontrado
        </Text>
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieYear}>{item.year}</Text>
                <Text style={styles.movieDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
  movieYear: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
    marginTop: 8,
  },
  movieDescription: {
    fontSize: 16,
    color: "#fff",
  },
  continueButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    color: "#00CED1",
    fontWeight: "bold",
  },
  noMovies: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default History;
