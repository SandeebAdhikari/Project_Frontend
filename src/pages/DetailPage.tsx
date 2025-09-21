import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Film = {
  film_id: number;
  title: string;
  description: string;
  release_year: number;
  rating: string;
  language: string;
  length: number;
  rental_rate: number;
  category: string;
  actors: string[];
};

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/films/${id}`)
      .then((res) => res.json())
      .then((data) => setFilm(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!film) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">{film.title}</h1>
      <p className="mt-2">{film.description}</p>
      <p>
        <span className="font-semibold">Year:</span> {film.release_year}
      </p>
      <p>
        <span className="font-semibold">Rating:</span> {film.rating}
      </p>
      <p>
        <span className="font-semibold">Language:</span> {film.language}
      </p>
      <p>
        <span className="font-semibold">Category:</span> {film.category}
      </p>
      <p>
        <span className="font-semibold">Actors:</span> {film.actors.join(", ")}
      </p>
    </div>
  );
};

export default FilmDetail;
