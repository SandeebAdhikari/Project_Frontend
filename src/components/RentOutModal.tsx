import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Star,
  User,
  Users,
  X,
  Clapperboard,
} from "lucide-react";
import type { FilmsDetail, Customer } from "../type";
import SearchDropDown from "./SearchDropDown";

interface RentOutModalProps {
  filmId: number;
  onClose: () => void;
}

const RentOutModal: React.FC<RentOutModalProps> = ({ filmId, onClose }) => {
  const [film, setFilm] = useState<FilmsDetail | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/films/${filmId}`)
      .then((res) => res.json())
      .then((data: FilmsDetail) => setFilm(data))
      .catch((err) => console.error("Error fetching film:", err));
  }, [apiUrl, filmId]);

  if (!film)
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <p className="text-gray-400">Loading film...</p>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-gradient-to-t from-gray-transparent via-gray-950 to-transparent border border-gray-800 rounded-xl p-6 w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
          title="Close"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col sm:flex-row sm:gap-5 py-5 sm:p-6">
          <div className="flex flex-col sm:w-1/2 p-6 rounded-lg border-r-1 border-b-1 border-gray-500 bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-950">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-400">
              {film.title}
            </h2>

            <div className="flex gap-3 text-gray-500 mt-1 text-xs sm:text-sm">
              <span className="inline-flex items-center px-2 py-1 font-semibold rounded-full bg-gray-700 text-gray-400">
                {film.rating}
              </span>
              <div className="flex gap-1 items-center">
                <Calendar className="w-4 h-4" />
                <span>{film.release_year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{film.length} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-gray-500" />
                <span className="text-gray-400">8.2</span>
                <span>/10</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm sm:text-lg mt-4">
              {film.description}
            </p>

            <div className="font-semibold mt-6 p-6 flex flex-col gap-2 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 rounded-lg text-sm sm:text-lg text-gray-400">
              <div className="flex justify-between">
                <span>Rates:</span>
                <span>{film.rental_rate}/day</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{film.rental_duration} days</span>
              </div>
              <div className="flex justify-between">
                <span>Available:</span>
                <span>{film.available}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:w-1/2 p-6 rounded-lg border-r-1 border-b-1 border-gray-500 bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-950">
            <div className="relative border border-gray-500 rounded-lg px-4 mt-3">
              <div className="absolute sm:-top-5 sm:left-21 -top-4 left-21 bg-gradient-to-t from-gray-transparent via-gray-800 to-gray-transparent px-2  rounded-lg">
                <span className="text-xl sm:text-2xl font-bold text-gray-400">
                  RENTAL CHECKOUT
                </span>
              </div>

              <div className="mt-5 flex items-center gap-1">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <h2 className="text-sm sm:text-lg text-gray-400 font-semibold">
                  Select Customer
                </h2>
              </div>
              <SearchDropDown<Customer>
                apiUrl={`${apiUrl}/api/customers/search`}
                placeholder="Search Customer..."
                queryKey="q"
                labelExtractor={(c) => `${c.firstName} ${c.lastName}`}
                onSelect={(c) => console.log("Selected customer:", c)}
              />

              <div className="mt-5 flex items-center gap-1">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <h2 className="text-sm sm:text-lg text-gray-400 font-semibold">
                  Select Staff
                </h2>
              </div>
              <SearchDropDown<Customer>
                apiUrl={`${apiUrl}/api/customers/search`}
                placeholder="Search Staff..."
                queryKey="q"
                labelExtractor={(c) => `${c.firstName} ${c.lastName}`}
                onSelect={(c) => console.log("Selected staff:", c)}
              />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <Clapperboard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <h2 className="text-gray-400 text-sm sm:text-lg font-semibold  mt-5">
                    Copies
                  </h2>
                </div>

                <input
                  type="text"
                  placeholder="Total Copies..."
                  className="w-full px-3 py-2 rounded-md  bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 text-gray-400 placeholder-gray-400 focus:outline-none border-r-1 border-b-1 border-gray-500 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentOutModal;
