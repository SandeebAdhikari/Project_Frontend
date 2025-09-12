import { useEffect, useState } from "react";

type Film = {
  category: string;
  film_id: number;
  rented: number;
  title: string;
};

export default function TopFilms() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/top-films")
      .then((res) => res.json())
      .then((data) => setFilms(data))
      .catch((err) => console.error("Error fetching films:", err));
  }, []);

  return (
    <div>
      <h2>Top Rented Films</h2>
      <ul>
        {films.map((film) => (
          <li key={film.film_id}>
            {film.title} — Rented {film.rented} times
          </li>
        ))}
      </ul>
    </div>
  );
}
