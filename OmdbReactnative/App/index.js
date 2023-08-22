import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = '614d6c31';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
      setMovies(response.data.Search || []);
      setLoading(false);
    } catch (error) {
      console.error('Error searching for movies:', error);
      setLoading(false);
    }
  };

  const getMovieDetails = async (imdbID) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
      setSelectedMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    searchContainer: {
      marginBottom: 10,
      padding: 10,
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor: '#ffffff',
    },
    movieContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      overflow: 'hidden',
    },
    moviePoster: {
      width: 100,
      height: 150,
    },
    movieDetails: {
      flex: 1,
      padding: 10,
    },
    movieTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    movieButton: {
      marginTop: 5,
    },
    movieDetailsContainer: {
      marginTop: 20,
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 8,
    },
    movieDetailsImage: {
      width: 200,
      height: 300,
      marginBottom: 10,
      borderRadius: 8,
    },
    movieDetailsText: {
      fontSize: 16,
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ marginBottom: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
        />
        <Button title="Search" onPress={searchMovies} />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {selectedMovie ? (
        
        <View style={styles.movieDetailsContainer}>
          <Image source={{ uri: selectedMovie.Poster }} style={styles.movieDetailsImage} />
          <Text style={styles.movieDetailsText}>Title: {selectedMovie.Title}</Text>
          <Text style={styles.movieDetailsText}>Year: {selectedMovie.Year}</Text>
          <Text style={styles.movieDetailsText}>Plot: {selectedMovie.Plot}</Text>
          <Text style={styles.movieDetailsText}>Genre: {selectedMovie.Genre}</Text>
          <Text style={styles.movieDetailsText}>Actors: {selectedMovie.Actors}</Text>
          <Text style={styles.movieDetailsText}>Country: {selectedMovie.Country}</Text>
          <Text style={styles.movieDetailsText}>Language: {selectedMovie.Language}</Text>
          <Text style={styles.movieDetailsText}>Rating: {selectedMovie.imdbRating}</Text>
          <Button title="Back to Results" onPress={() => setSelectedMovie(null)} />
        </View>
      ) : (
        <ScrollView>
          {movies.map(movie => (
            <View key={movie.imdbID} style={styles.movieContainer}>
              <Image source={{ uri: movie.Poster }} style={styles.moviePoster} />
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{movie.Title}</Text>
                <Button
                  title="View Details"
                  onPress={() => getMovieDetails(movie.imdbID)}
                  style={styles.movieButton}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default App;
