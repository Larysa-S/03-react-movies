import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import MovieService from "../../services/movieService";
import type { Movie } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import css from "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false); // Стан помилки як boolean
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]); // Очищення перед новим пошуком за ТЗ
      setLoading(true);
      setError(false);

      const data = await MovieService.fetchMoviesByQuery(query);
      setMovies(data.results);

      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {/* Контейнер для сповіщень */}
      <Toaster position="top-right" />

      <main className={css.container}>
        {/* Рендеримо Error, Loader або Grid залежно від стану */}
        {error && <ErrorMessage />}
        {loading && <Loader />}

        {movies.length > 0 && !error && (
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}
      </main>

      {/* Модал відкривається, якщо є вибраний фільм */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
