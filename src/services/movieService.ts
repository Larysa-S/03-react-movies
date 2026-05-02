import axios from "axios";
import type { MovieResponse } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: "application/json",
  },
});

export const fetchMoviesByQuery = async (
  query: string,
  page: number = 1,
): Promise<MovieResponse> => {
  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  };

  const response = await movieInstance.get<MovieResponse>(
    "/search/movie",
    config,
  );
  return response.data;
};

export const getMovieImageUrl = (
  path: string | null,
  size: string = "w500",
): string => {
  if (!path) {
    // Додаємо розміри, щоб заглушка реально працювала
    return "https://placeholder.com";
  }

  // ПРАВИЛЬНО: домен, шлях, розмір і шлях до файлу
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

const MovieService = {
  fetchMoviesByQuery, // Переконайтеся, що ця функція оголошена вище в цьому ж файлі
  getMovieImageUrl,
};

export default MovieService;
