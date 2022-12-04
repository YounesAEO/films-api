import "dotenv/config";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;
const LANG = "fr-FRA";
const ORIGINAL_LANG = "en";

export const buildSearchMovieQuery = (keywords) => {
  const cleanKeywords = keywords.split(" ").join("%20");
  return `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANG}&with_original_language=${ORIGINAL_LANG}&query=${cleanKeywords}&include_adult=false`;
};

export const buildGetLatestMoviesQuery = () => {
  return `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANG}`;
};
