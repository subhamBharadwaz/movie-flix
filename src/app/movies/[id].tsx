import { IMovie } from "@/types/types";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import { Text, View } from "tamagui";

const MovieDetails: React.FC = () => {
  const { id } = useLocalSearchParams();

  const [movie, setMovie] = React.useState<IMovie>();

  React.useEffect(() => {
    async function getMovies() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY}&language=en-US`
      );

      const moviesData = res.data;
      setMovie(moviesData.results);
    }

    getMovies();
  }, []);
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default MovieDetails;
