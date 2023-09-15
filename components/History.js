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
      id: 1,
      title: "A Odisseia Espacial",
      description:
        "Uma equipe de astronautas é enviada em uma missão para explorar os confins do espaço e descobrir segredos cósmicos.",
      releaseDate: "10 de Setembro de 2010",
      duration: "2h 30min",
    },
    {
      id: 2,
      title: "A Busca Pelo Tesouro Perdido",
      description:
        "Um grupo de aventureiros parte em uma jornada épica para encontrar um tesouro lendário escondido em uma ilha remota.",
      releaseDate: "12 de Setembro de 2013",
      duration: "2h 10min",
    },
    {
      id: 3,
      title: "Amor à Primeira Vista",
      description:
        "Dois estranhos se encontram por acaso em uma cidade estrangeira e experimentam uma conexão instantânea.",
      releaseDate: "15 de Setembro de 2018",
      duration: "1h 55min",
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
                <Text style={styles.movieRelease}>{item.releaseDate}</Text>
                <Text style={styles.movieDuration}>{item.duration}</Text>
              </View>
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
