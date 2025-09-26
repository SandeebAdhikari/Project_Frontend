import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import FilmDetail from "./FilmDetail";
import type { FilmTop, FilmsDetail } from "../type";

interface FlimCardProps {
  films: FilmTop[];
  label: string;
}

const FlimsCard: React.FC<FlimCardProps> = ({ films, label }) => {
  const [open, setOpen] = useState(true);
  const [selectedFilm, setSelectedFilm] = useState<FilmsDetail | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSelectFilm = async (filmId: number) => {
    try {
      const res = await fetch(`${apiUrl}/api/films/${filmId}`);
      const data: FilmsDetail = await res.json();
      setSelectedFilm(data);
    } catch (err) {
      console.error("Error fetching film details:", err);
    }
  };

  return (
    <div className="sm:w-1/2 mt-4 p-4">
      <div
        onClick={() => setOpen(!open)}
        className={`border border-gray-700 hover:border-gray-600 bg-gradient-to-t from-gray-900 via-gray-950 to-black flex flex-col items-center justify-center md:h-24 space-x-3 p-6 cursor-pointer transition-all duration-300
        ${open ? "rounded-t-2xl" : "rounded-2xl"}`}
      >
        <div className="flex gap-2">
          <TrendingUp className="w-7 h-7 sm:w-7 sm:h-7 lg:w-10 lg:h-10 font-bold text-gray-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-400">
            {label}
          </h2>
        </div>
        <p className="text-gray-500">Most rented films of all time</p>
      </div>

      {open && (
        <div className="bg-black/20 p-2 rounded-b-2xl shadow-inner transition-all duration-500 cursor-pointer border border-gray-700">
          {films.length === 0 ? (
            <p className="text-gray-500">No films found</p>
          ) : (
            <div>
              {films.map((film, index) => (
                <div
                  key={film.film_id}
                  onClick={() => handleSelectFilm(film.film_id)}
                  className="flex justify-between p-4 hover:bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 hover:rounded-xl sm:h-24 sm:text-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 font-bold text-xl text-gray-400">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-gray-400 font-semibold cursor-pointer">
                        {film.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {film.release_year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-400">
                      {film.rating}
                    </span>

                    <div className="text-right">
                      <p className="font-medium text-xl text-gray-400">
                        {film.rented}
                      </p>
                      <p className="text-xs text-gray-500">rentals</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedFilm && (
        <FilmDetail film={selectedFilm} onClose={() => setSelectedFilm(null)} />
      )}
    </div>
  );
};

export default FlimsCard;
