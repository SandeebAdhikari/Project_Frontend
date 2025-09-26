import React, { useState } from "react";
import { Clock, DollarSign } from "lucide-react";
import FilmDetail from "./FilmDetail";
import type { FilmList, FilmsDetail } from "../type";
import RentOutModal from "./RentOutModal";

interface FilmCardProps {
  film: FilmList;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const [expanded, setExpanded] = useState(false);
  const [showRentOut, setShowRentOut] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<FilmsDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const actorsArray: string[] = Array.isArray(film.actors)
    ? film.actors
    : typeof film.actors === "string"
    ? (film.actors as string).split(",").map((a) => a.trim())
    : [];

  const shown = actorsArray.slice(0, 2).join(", ");
  const remaining = actorsArray.length - 2;

  const handleViewDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/films/${film.film_id}`);
      if (!res.ok) throw new Error("Failed to fetch film details");
      const data: FilmsDetail = await res.json();
      setSelectedFilm(data);
    } catch (err) {
      console.error("Error fetching film detail:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-4 rounded-lg border-r-1 border-b-1 border-gray-500 bg-gradient-to-tl from-gray-700 via-gray-800 to-gray-950 hover:scale-105 hover:shadow-md shadow-gray-400">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-400">{film.title}</h2>
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-400">
            {film.rating}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">{film.description}</p>

        <div className="flex justify-between mt-10 text-gray-500">
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
          <h2 className="text-gray-400">Genres:</h2>
          <div className="mt-[1px]">
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-800 text-gray-500 hover:bg-gray-900 cursor-pointer">
              {film.category}
            </span>
          </div>
        </div>

        <div className="mt-2 font-bold">
          <h2 className="text-gray-400">Cast:</h2>
          <div className="mt-1 text-sm font-medium text-gray-500">
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
          <button
            onClick={handleViewDetails}
            className="flex-1 border-r-1 border-b-1 border-gray-700 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:scale-105 p-1 rounded-lg cursor-pointer text-center text-gray-300"
          >
            {loading ? "Loading..." : "View Details"}
          </button>

          <button
            onClick={() => setShowRentOut(true)}
            className="flex-1 border border-gray-800 hover:scale-105 hover:bg-gray-700 p-1 rounded-lg cursor-pointer text-center text-gray-300"
          >
            Rent Out
          </button>
        </div>
      </div>

      {selectedFilm && (
        <FilmDetail film={selectedFilm} onClose={() => setSelectedFilm(null)} />
      )}
      {showRentOut && (
        <RentOutModal
          filmId={film.film_id}
          onClose={() => setShowRentOut(false)}
        />
      )}
    </>
  );
};

export default FilmCard;
