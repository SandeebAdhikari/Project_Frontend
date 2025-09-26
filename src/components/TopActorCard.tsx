import React, { useState } from "react";
import { Star } from "lucide-react";
import type { Actor } from "../type";
import TopActorTopFiveMovieModal from "./TopActorTopFiveMovieModal";

interface TopActorCardProps {
  actors: Actor[];
  label: string;
}

const TopActorCard: React.FC<TopActorCardProps> = ({ actors, label }) => {
  const [open, setOpen] = useState(true);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);

  return (
    <div className="sm:w-1/2 mt-4 p-4">
      <div
        onClick={() => setOpen(!open)}
        className={`border border-gray-700 hover:border-gray-600 bg-gradient-to-t from-gray-900 via-gray-950 to-black flex flex-col items-center justify-center md:h-24 space-x-3 p-6 cursor-pointer transition-all duration-300
        ${open ? "rounded-t-2xl " : "rounded-2xl "}`}
      >
        <div className="flex gap-2">
          <Star className="w-7 h-7 sm:w-7 sm:h-7 lg:w-8 lg:h-8 font-bold text-gray-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-400">
            {label}
          </h2>
        </div>
        <p className="text-gray-500">Most featured actors in our store</p>
      </div>

      {open && (
        <div className="bg-black/20 p-2 rounded-b-2xl shadow-inner transition-all duration-500 cursor-pointer border border-gray-700">
          {actors.length === 0 ? (
            <p className="text-gray-500">No actors found</p>
          ) : (
            <div>
              {actors.map((actor, index) => (
                <div
                  key={actor.actor_id}
                  onClick={() => setSelectedActor(actor)}
                  className="flex justify-between p-4 hover:bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 hover:rounded-xl sm:h-24 sm:text-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 font-bold text-xl text-gray-400">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-gray-400 font-semibold cursor-pointer">
                        {actor.first_name} {actor.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {actor.film_count}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium text-xl text-gray-400">
                        {actor.rental_count}
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
      {selectedActor && (
        <TopActorTopFiveMovieModal
          actor={selectedActor}
          onClose={() => setSelectedActor(null)}
        />
      )}
    </div>
  );
};

export default TopActorCard;
