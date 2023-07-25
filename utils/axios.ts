import axios from "axios";

const baseURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY}`;

export async function getAllMovies(page: number) {
  const response = await axios.get(
    `${baseURL}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${1}&with_watch_monetization_types=flatrate`
  );
  return response.data;
}
