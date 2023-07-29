export interface IMovie {
  id: number;
  title: string;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  backdrop_path: string;
  adult: boolean;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
}

export interface IMovieAPIResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ICast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface IReview {
  id: string;
  author: string;
  content: string;
  created_at: string;
  updatedA_at: string;
  url: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
}
