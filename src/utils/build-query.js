import "dotenv/config";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;
const LANG = "fr-FRA";
const LANG2 = "en-US";
const ORIGINAL_LANG = "en";

export const buildSearchMovieQuery = (keywords) => {
  const cleanKeywords = keywords.split(" ").join("%20");
  return `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANG}&with_original_language=${ORIGINAL_LANG}&query=${cleanKeywords}&include_adult=false`;
};

export const buildGetLatestMoviesQuery = () => {
  return `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANG}`;
};


export const buildFindIdQuery = (id) => {

  const queries = [
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${LANG}`,
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=${LANG}`,
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=${LANG}`,
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=${LANG2}`,
  ];

  return queries;

  //return `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${LANG}`;
};