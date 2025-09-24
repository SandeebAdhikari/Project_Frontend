import { useEffect, useState } from "react";
import FilmCard from "../components/FilmCard";
import { Search } from "lucide-react";

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

const FilmsPage = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("film");

  useEffect(() => {
    fetch("http://localhost:4000/api/films/all-films")
      .then((res) => res.json())
      .then((data: Film[]) => setFilms(data))
      .catch((err) => console.error("Error fetching films:", err));
  }, []);

  const filteredFilms = films.filter((film) => {
    const searchLower = searchTerm.toLowerCase();

    if (searchType === "film") {
      return film.title.toLowerCase().includes(searchLower);
    } else if (searchType === "actor") {
      const actorsArray: string[] = Array.isArray(film.actors)
        ? film.actors
        : typeof film.actors === "string"
        ? (film.actors as string).split(",").map((a: string) => a.trim())
        : [];
      return actorsArray.join(" ").toLowerCase().includes(searchLower);
    } else if (searchType === "genre") {
      return film.category.toLowerCase().includes(searchLower);
    }
    return true;
  });

  return (
    <div className="p-6 sm:mx-10">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 "
              size={20}
            />
            <input
              type="text"
              placeholder="Search films..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2  rounded-md  border-r-1 border-b-1 border-gray-500 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
        <label htmlFor="searchType" className="sr-only">
          Search Type
        </label>
        <select
          id="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-full  sm:w-[180px] px-4 py-2 rounded-md border-r-1 border-b-1 border-gray-500 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 text-white focus:outline-none "
        >
          <option value="film">By Film Name</option>
          <option value="actor">By Actor</option>
          <option value="genre">By Genre</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredFilms.map((film) => (
          <FilmCard key={film.film_id} film={film} />
        ))}
      </div>
      {filteredFilms.length === 0 && (
        <div className="text-center py-12">
          <p>No films found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default FilmsPage;
