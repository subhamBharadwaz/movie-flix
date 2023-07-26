import { useEffect, useState } from "react";
import { View } from "tamagui";
import { StyleSheet } from "react-native";
import axios from "axios";

import { FlatList } from "react-native";
import { IMovie, IMovieAPIResponse } from "@/types/types";
import MovieCard from "@/components/MovieCard";

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
    <View flex={1} alignItems="center" justifyContent="center">
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
