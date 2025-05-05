export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_READACCESS_TOKEN,
  headers: {
    accept: "application/json",
    Authorization: process.env.EXPO_PUBLIC_MOVIE_READACCESS_TOKEN || "",
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    const error: Error & { statusText?: string } = new Error(
      "Failed to fetch movies"
    );
    error.statusText = response.statusText;
    throw error;
  }

  const data = await response.json();
  return data.results;
};

//'/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
