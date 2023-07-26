import { Spinner, View } from "tamagui";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { FlatList } from "react-native";
import { IMovie } from "@/types/types";
import MovieCard from "@/components/MovieCard";

export default function TabOneScreen() {
  const { data: movies, isLoading } = useQuery<IMovie[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${1}&with_watch_monetization_types=flatrate`
      );
      return await res.data.results;
    },
  });

  return (
    <View flex={1} alignItems="center" justifyContent="center">
      {isLoading ? (
        <Spinner size="large" color="$green10" />
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
