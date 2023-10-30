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

const GenreDetail = ({ route }) => {
  const { genre } = route.params;

  let movies = [];

  if (genre === "Ficção Científica") {
    movies = [
      {
        title: "A Odisseia Espacial",
        description:
          "Uma equipe de astronautas é enviada em uma missão para explorar os confins do espaço e descobrir segredos cósmicos.",
        releaseDate: "10 de Setembro de 2023",
        duration: "2h 30min",
      },
      {
        title: "A Rebelião dos Androides",
        description:
          "Em um futuro distópico, os androides começam a desenvolver consciência e questionar sua existência.",
        releaseDate: "15 de Outubro de 2023",
        duration: "2h 15min",
      },
      {
        title: "A Viagem no Tempo",
        description:
          "Um cientista brilhante inventa uma máquina do tempo e se aventura em diferentes épocas da história.",
        releaseDate: "5 de Novembro de 2023",
        duration: "2h 20min",
      },
    ];
  } else if (genre === "Aventura") {
    movies = [
      {
        title: "A Busca Pelo Tesouro Perdido",
        description:
          "Um grupo de aventureiros parte em uma jornada épica para encontrar um tesouro lendário escondido em uma ilha remota.",
        releaseDate: "12 de Setembro de 2023",
        duration: "2h 10min",
      },
      {
        title: "A Expedição à Montanha Misteriosa",
        description:
          "Um grupo de alpinistas experientes decide escalar uma montanha supostamente amaldiçoada.",
        releaseDate: "20 de Outubro de 2023",
        duration: "2h 25min",
      },
      {
        title: "O Segredo da Ilha Deserta",
        description:
          "Após um acidente de avião, um grupo de sobreviventes fica preso em uma ilha aparentemente deserta.",
        releaseDate: "8 de Novembro de 2023",
        duration: "2h 15min",
      },
    ];
  } else if (genre === "Romance") {
    movies = [
      {
        title: "Amor à Primeira Vista",
        description:
          "Dois estranhos se encontram por acaso em uma cidade estrangeira e experimentam uma conexão instantânea.",
        releaseDate: "15 de Setembro de 2023",
        duration: "1h 55min",
      },
      {
        title: "Corações Entrelaçados",
        description:
          "Duas pessoas com passados complicados se cruzam e, juntas, descobrem a cura para as feridas emocionais uma da outra.",
        releaseDate: "22 de Outubro de 2023",
        duration: "2h 10min",
      },
      {
        title: "A Promessa Eterna",
        description:
          "Um casal de idosos relembra os momentos mais significativos de sua vida juntos enquanto enfrentam os desafios do envelhecimento.",
        releaseDate: "10 de Novembro de 2023",
        duration: "1h 50min",
      },
    ];
  }

  const [watchedMovies, setWatchedMovies] = useState([]); // Estado para os filmes assistidos

  // Carregar os filmes assistidos do AsyncStorage quando o componente é montado
  useEffect(() => {
    loadWatchedMoviesFromStorage();
  }, []);

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

  const handleWatchMovie = async (movieTitle) => {
    const watchedMovie = movies.find((movie) => movie.title === movieTitle);
    if (watchedMovie) {
      // Verifique se o filme já está no histórico
      if (!watchedMovies.some((movie) => movie.title === watchedMovie.title)) {
        // Adicionar o filme assistido ao histórico
        const updatedWatchedMovies = [...watchedMovies, watchedMovie];
        // Atualizar o estado com os filmes assistidos
        setWatchedMovies(updatedWatchedMovies);
        try {
          // Atualizar o AsyncStorage com os filmes assistidos
          await AsyncStorage.setItem(
            "watchedMovies",
            JSON.stringify(updatedWatchedMovies)
          );
        } catch (error) {
          console.error("Erro ao salvar filmes assistidos:", error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{genre}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieDescription}>{item.description}</Text>
            <Text
              style={styles.movieDetails}
            >{`Data de Lançamento: ${item.releaseDate}`}</Text>
            <View style={styles.movieDurationButtonContainer}>
              <Text
                style={styles.movieDetails}
              >{`Duração: ${item.duration}`}</Text>
              <TouchableOpacity onPress={() => handleWatchMovie(item.title)}>
                <View style={styles.watchButton}>
                  <Text style={styles.watchButtonText}>Ver Filme</Text>
                </View>
              </TouchableOpacity>
            </View>
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
    flexDirection: "column",
    paddingBottom: 60,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  movieItem: {
    padding: 16,
    backgroundColor: "#252b56",
    borderRadius: 10,
    margin: 12,
    borderBottomWidth: 3,
    borderColor: "#00CED1",
    borderStyle: "solid",
  },
  movieTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  movieDescription: {
    color: "white",
    fontSize: 16,
  },
  movieDetails: {
    color: "#00CED1",
    fontSize: 14,
    marginTop: 8,
  },
  movieDurationButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  watchButton: {
    backgroundColor: "#141839",
    borderRadius: 10,
    padding: 8,
    alignItems: "center",
    marginTop: 8,
  },
  watchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GenreDetail;
