import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Clock,
  DollarSign,
  Star,
  Calendar,
  Play,
  Heart,
  Share2,
} from "lucide-react";

type Film = {
  film_id: number;
  title: string;
  description: string;
  release_year: number;
  rating: string;
  language: string;
  length: number;
  rental_rate: number;
  categories: string[];
  actors: string[];
};

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/films/${id}`)
      .then((res) => res.json())
      .then((data) => setFilm(data))
      .catch((err) => console.error(err));
  }, [id, apiUrl]);

  if (!film) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex flex-col sm:mt-20 m-6 sm:mx-16 sm:flex-row text-white gap-6 sm:gap-10">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center w-74 h-106 sm:w-84 sm:h-130 rounded-xl bg-gradient-to-t from-gray-700 via-gray-800 to-gray-950">
          <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full mb-2 bg-gray-700 ">
            <Play className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm text-gray-400">Movie Poster</p>
          <p className="text-xs text-gray-400">Coming Soon</p>
        </div>
      </div>

      <div className="text-center sm:text-left sm:mt-10">
        <h1 className="text-3xl sm:text-6xl font-bold text-gray-300 leading-tight mb-4">
          {film.title}
        </h1>
        <div className="flex gap-3 justify-center sm:justify-start text-gray-400 mb-6">
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-200">
            {film.rating}
          </span>
          <div className="flex gap-1 items-center">
            <Calendar className="w-4 h-4" />
            <span>{film.release_year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 " />
            <span>{film.length} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-gray-500" />
            <span className="text-gray-50">8.2</span>
            <span>/10</span>
          </div>
        </div>
        <p className="text-gray-400 mb-4">{film.description}</p>
        <div className="flex gap-3 justify-center sm:justify-start mb-6 ">
          <button className=" flex p-[6px] text-sm sm:px-3 sm:py-2 rounded-lg bg-gradient-to-bl from-gray-500 via-gray-600 to-gray-700 hover:scale-105 cursor-pointer items-center">
            {" "}
            <Play className="mr-2 h-4 w-4" />
            Rent Now -
            <DollarSign className="w-4 h-4" />
            {film.rental_rate}
          </button>
          <button className=" flex text-sm px-3 py-2 rounded-lg bg-gradient-to-bl from-gray-600 via-gray-700 to-gray-800 hover:scale-105 cursor-pointer items-center">
            {" "}
            <Play className="mr-2 h-4 w-4" />
            Watch Trailer
          </button>
          <button
            className="flex px-3 py-2 rounded-lg hover:bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 cursor-pointer items-center"
            title="Add to favorites"
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            className="flex px-3 py-2 rounded-lg hover:bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 cursor-pointer items-center"
            title="Share"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col text-gray-400 mb-6">
          <span className="font-bold text-gray-200">GENRES</span>{" "}
          <div className="flex flex-wrap gap-2 mt-1 justify-center sm:justify-start">
            {film.categories.map((cat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-200 hover:cursor-pointer hover:bg-gray-800 w-fit"
              >
                {cat.trim()}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="font-bold text-gray-200">CAST</span>
          <div className="flex flex-wrap gap-2 mt-1 justify-center sm:justify-start">
            {film.actors.map((actor, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 cursor-pointer"
              >
                {actor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
