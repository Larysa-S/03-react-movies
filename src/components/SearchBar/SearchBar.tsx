import { useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState<string>("");

  // типізація для події сабміту
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim() === "") {
      // Згідно з ТЗ використовуємо toast замість alert
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(value);
    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <header className={css.header}>
      {}
      <Toaster position="top-right" />

      <div className={css.container}>
        <a
          className={css.link}
          href="https://themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            name="query" //
            type="text"
            value={value}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search movies..."
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
