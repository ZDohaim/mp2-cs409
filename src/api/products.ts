import api from "./moviedb";

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date?: string;
  last_air_date?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  genre_ids?: number[];
  number_of_episodes?: number;
  number_of_seasons?: number;
}

export interface TVShowResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

export async function searchTVShows(query: string): Promise<TVShow[]> {
  const res = await api.get<TVShowResponse>("search/tv", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return res.data.results;
}

export async function getTVShow(id: number): Promise<TVShow> {
  const res = await api.get<TVShow>(`/tv/${id}`);
  return res.data;
}

export interface Genre {
  id: number;
  name: string;
}

interface GenreResponse {
  genres: Genre[];
}
export async function getTVShowsByGenre(genreId: number): Promise<TVShow[]> {
  const res = await api.get<TVShowResponse>("/discover/tv", {
    params: {
      with_genres: genreId,
      language: "en-US",
      page: 1,
      sort_by: "popularity.desc",
    },
  });
  return res.data.results;
}

export async function getTVGenres(): Promise<Genre[]> {
  const res = await api.get<GenreResponse>("/genre/tv/list", {
    params: {
      language: "en-US",
    },
  });
  return res.data.genres;
}
