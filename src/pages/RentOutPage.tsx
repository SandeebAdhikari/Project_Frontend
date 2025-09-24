import { Calendar, Clock, Star } from "lucide-react";
import type { Film } from "../type";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RentOutPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/films/${id}`)
      .then((res) => res.json())
      .then((data: Film) => setFilm(data))
      .catch((err) => console.error("Error fetching film:", err));
  }, [id]);

  if (!film) return <p>Loading film...</p>;

  return (
    <div className=" sm:flex-row p-6 sm:p-4 sm:mx-16 ">
      <div className="flex flex-col sm:w-1/2 p-6 rounded-lg border-r-1 border-b-1 border-gray-500 bg-gradient-to-tl from-gray-700 via-gray-800 to-gray-950">
        <div className="flex font-bold  border-gray-700 items-center gap-1">
          <span className="text-xl sm:text-3xl font-bold text-gray-400">
            {" "}
            {film.title}
          </span>
        </div>

        <div className="flex gap-3  text-gray-500 mt-1 text-xs sm:text-sm">
          <span className="inline-flex items-center px-2 py-1 font-semibold rounded-full bg-gray-700 text-gray-400">
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
            <span className="text-gray-400">8.2</span>
            <span>/10</span>
          </div>
        </div>

        <div className="text-gray-400 text-sm sm:text-lg mt-4">
          {film.description}
        </div>

        <div className="mt-6 p-6 flex flex-col gap-2 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950  rounded-lg text-sm sm:text-lg">
          <div className="flex justify-between">
            <span className=""> Rates:</span>
            <span className="">{film.rental_rate}/day</span>
          </div>
          <div className="flex justify-between">
            <span className=""> Duration:</span>
            <span className="">{film.rental_duration} days</span>
          </div>
          <div className="flex justify-between">
            <span className="">Available: </span>
            <span className="">{film.available}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:w-1/2 p-6 rounded-lg border-r-1 border-b-1 border-gray-500 bg-gradient-to-tl from-gray-700 via-gray-800 to-gray-950">
        <div></div>
      </div>
    </div>
  );
};

export default RentOutPage;
