import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Actor, FilmTop } from "../type";

interface TopActorTopFiveMovieModalProps {
  actor: Actor;
  onClose: () => void;
}

const TopActorTopFiveMovieModal: React.FC<TopActorTopFiveMovieModalProps> = ({
  actor,
  onClose,
}) => {
  const [films, setFilms] = useState<FilmTop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/api/actors/${actor.actor_id}/top-films`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch films");
        return res.json();
      })
      .then((data: FilmTop[]) => {
        setFilms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load films for this actor.");
        setLoading(false);
      });
  }, [apiUrl, actor.actor_id]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative backdrop-blur-sm rounded-xl p-6 w-[30%] max-w-5xl max-h-[90vh] border border-gray-700 ">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
          title="Close"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col p-4 items-center">
          <h2 className="text-2xl font-bold text-gray-400 mb-2">
            {actor.first_name} {actor.last_name}
          </h2>
          <p className="text-gray-500 mb-6">
            Featured in{" "}
            <span className="font-semibold">{actor.film_count}</span> films,
            with <span className="font-semibold">{actor.rental_count}</span>{" "}
            rentals.
          </p>

          {loading && <p className="text-gray-500">Loading films...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && films.length > 0 && (
            <div className="space-y-2 text-gray-400 text-center">
              {films.slice(0, 5).map((film) => (
                <div
                  key={film.film_id}
                  className="pb-1 hover:scale-101 cursor-pointer"
                >
                  {film.title}{" "}
                  <span className="text-gray-500 text-sm">({film.rented})</span>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && films.length === 0 && (
            <p className="text-gray-500">No films found for this actor.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopActorTopFiveMovieModal;
