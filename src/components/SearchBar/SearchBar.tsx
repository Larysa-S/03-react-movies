// 1. Розділяємо імпорт: useState — це значення, решта — типи
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState<string>("");

  // 2. Використовуємо FormEvent тут, щоб він не вважався "невикористаним"
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim() === "") {
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
            name="query"
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
