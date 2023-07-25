import { FC, useEffect, useState } from "react";

import { StyleSheet } from "react-native";

import axios from "axios";

import { Text, View } from "@/components/Themed";
import { FlatList, Image } from "react-native";
import { IMovie, IMovieAPIResponse } from "@/types/types";

export default function TabOneScreen() {
  const [movies, setMovies] = useState<IMovie[]>();

  useEffect(() => {
    async function getMovies() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${1}&with_watch_monetization_types=flatrate`
      );

      const moviesData = res.data as IMovieAPIResponse;
      setMovies(moviesData.results);
    }

    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <Movie movie={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

interface MovieProps {
  movie: IMovie;
}

const Movie: FC<MovieProps> = ({ movie }) => {
  return (
    <View>
      <Text>{movie?.title}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  image: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
});
