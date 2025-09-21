import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, DollarSign } from "lucide-react";

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

interface FilmCardProps {
  film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const [expanded, setExpanded] = useState(false);

  const actorsArray: string[] = Array.isArray(film.actors)
    ? film.actors
    : typeof film.actors === "string"
    ? (film.actors as string).split(",").map((a) => a.trim())
    : [];

  const shown = actorsArray.slice(0, 2).join(", ");
  const remaining = actorsArray.length - 2;
  return (
    <div className="border border-gray-700 p-4 rounded-lg bg-gray-900 text-white hover:scale-105 shadow hover:shadow-md shadow-gray-400">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{film.title}</h2>
        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-200">
          {film.rating}
        </span>
      </div>
      <p className="text-sm text-gray-400 mt-2">{film.description}</p>
      <div className="flex justify-between mt-10 text-gray-400">
        <div className="flex items-center gap-1">
          <Clock size={18} />
          {film.length} min
        </div>
        <div className="flex items-center gap-1">
          <DollarSign size={18} />
          {film.rental_rate}
        </div>
      </div>

      <div className="mt-4 font-bold">
        Categories:
        <div className="mt-[1px]">
          <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-200">
            {film.category}
          </span>
        </div>
      </div>

      <div className="mt-2 font-bold">
        Featured Actor:
        <div className="mt-1 text-sm font-medium text-gray-400">
          {expanded ? (
            actorsArray.join(", ")
          ) : (
            <>
              {shown}
              {remaining > 0 && (
                <button
                  onClick={() => setExpanded(true)}
                  className="ml-1 text-gray-300 hover:underline focus:outline-none cursor-pointer"
                >
                  +{remaining} more
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <Link
          to={`/films/${film.film_id}`}
          className="flex-1 border border-gray-700 bg-gray-950 p-1 rounded-lg cursor-pointer text-center"
        >
          View Details
        </Link>
        <button className="flex-1 border border-gray-700 p-1 rounded-lg cursor-pointer">
          Rent Out
        </button>
      </div>
    </div>
  );
};

export default FilmCard;
