import React, { useState } from "react";

type Film = {
  category: string;
  film_id: number;
  rented: number;
  title: string;
};

interface FlimCardProps {
  films: Film[];
  label: string;
}

const FlimsCard: React.FC<FlimCardProps> = ({ films, label }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-sm mx-auto p-4">
      <div
        onClick={() => setOpen(!open)}
        className="bg-black/20 shadow-lg rounded-2xl p-4 cursor-pointer transition text-center"
      >
        <h2 className="text-xl font-bold text-white-800">{label}</h2>
      </div>

      {open && (
        <div className="mt-4 bg-black/20 p-4 rounded-2xl shadow-inner transition-all duration-500 text-center">
          {films.length === 0 ? (
            <p className="text-gray-500">No films found</p>
          ) : (
            <div>
              {films.map((film) => (
                <div
                  key={film.film_id}
                  className=" border-b-black hover:bg-black hover:text-white hover:rounded-xl"
                >
                  <div className="text-white font-semibold cursor-pointer ">
                    {film.title}
                  </div>{" "}
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
