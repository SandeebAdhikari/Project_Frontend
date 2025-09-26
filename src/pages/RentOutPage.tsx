import { Calendar, Clock, Star, User, Users } from "lucide-react";
import type { Film, Customer } from "../type";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchDropDown from "../components/SearchDropDown";

const RentOutPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/films/${id}`)
      .then((res) => res.json())
      .then((data: Film) => setFilm(data))
      .catch((err) => console.error("Error fetching film:", err));
  }, [apiUrl, id]);

  if (!film)
    return (
      <p className="mt-10 flex justify-center text-gray-400">Loading film...</p>
    );

  return (
    <div className="flex flex-col sm:flex-row sm:gap-5 p-6 sm:p-4 sm:mx-16">
      <div className="flex flex-col sm:w-1/2 p-6 rounded-lg border-r-1 border-b-1 border-gray-500 bg-gradient-to-tl from-gray-700 via-gray-800 to-gray-950">
        <div className="flex font-bold items-center gap-1">
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

        <div className=" font-semibold mt-6 p-6 flex flex-col gap-2 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950  rounded-lg text-sm sm:text-lg text-gray-300">
          <div className="flex justify-between">
            <span> Rates:</span>
            <span>{film.rental_rate}/day</span>
          </div>
          <div className="flex justify-between">
            <span> Duration:</span>
            <span>{film.rental_duration} days</span>
          </div>
          <div className="flex justify-between">
            <span>Available: </span>
            <span>{film.available}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:mt-0 sm:w-1/2 p-6 rounded-lg border-r-1 border-b-1 border-gray-500 bg-gradient-to-tl from-gray-700 via-gray-800 to-gray-950">
        <div className="relative border border-gray-500 rounded-lg px-4 mt-3">
          <div className="absolute top-[-14px] left-24 sm:top-[-18px] sm:left-36 flex font-bold  items-center gap-1 bg-gradient-to-b from-gray-transparent via-gray-800 to-gray-transparent">
            <span className="text-xl sm:text-3xl font-bold text-gray-400 ">
              RENTAL CHECKOUT
            </span>
          </div>
          <div className="mt-5 flex items-center gap-1">
            <User className=" w-4 h-4 sm:w-5 sm:h-5" />
            <h2 className="text-sm sm:text-lg text-gray-400 font-semibold">
              Select Customer
            </h2>
          </div>
          <SearchDropDown<Customer>
            apiUrl={`${apiUrl}/api/customers/search`}
            placeholder="Search customer..."
            queryKey="q"
            labelExtractor={(c) => `${c.firstName} ${c.lastName}`}
            onSelect={(c) => console.log("Selected customer:", c)}
          />
          <div className="mt-4 ">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentOutPage;
