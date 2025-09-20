import FilmCard from "../components/FilmCard";
import { useEffect, useState } from "react";

const FlimsPage = () => {
  const [films, setFilms] = useState<Film[]>([]);

  return (
    <div className="flex flex-row sm:mx-16 gap-4 p-4">
      <FilmCard />
      <FilmCard />
      <FilmCard />
    </div>
  );
};

export default FlimsPage;
