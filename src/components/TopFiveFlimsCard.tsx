import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

type Film = {
  category: string;
  film_id: number;
  rented: number;
  title: string;
  release_year: number;
  rating: string;
};

interface FlimCardProps {
  films: Film[];
  label: string;
}

const FlimsCard: React.FC<FlimCardProps> = ({ films, label }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="sm:w-1/2 mt-4 p-4">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-gray-950 text-white flex flex-col items-center justify-center md:h-24 space-x-3 p-6 cursor-pointer transition-all duration-300
        ${open ? "rounded-t-2xl" : "rounded-2xl"}`}
      >
        <div className="flex gap-2">
          <TrendingUp className="w-7 h-7 sm:w-7 sm:h-7 lg:w-10 lg:h-10 font-bold" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{label}</h2>
        </div>
        <p>Most rented flims of all time</p>
      </div>

      {open && (
        <div className="bg-black/20 p-2 rounded-b-2xl shadow-inner transition-all duration-500">
          {films.length === 0 ? (
            <p className="text-gray-500">No films found</p>
          ) : (
            <div>
              {films.map((film, index) => (
                <div
                  key={film.film_id}
                  className="flex justify-between p-4 hover:bg-gray-950 hover:rounded-xl sm:h-24 sm:text-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 font-bold text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold cursor-pointer">
                        {film.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {film.release_year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-200">
                      {film.rating}
                    </span>

                    <div className="text-right">
                      <p className="font-medium text-xl">{film.rented}</p>
                      <p className="text-xs">rentals</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlimsCard;
