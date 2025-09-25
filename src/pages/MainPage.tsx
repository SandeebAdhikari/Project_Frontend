import { useEffect, useState } from "react";
import TopFiveFlimsCard from "../components/TopFiveFlimsCard";
import TopActorCard from "../components/TopActorCard";

type Film = {
  category: string;
  film_id: number;
  rented: number;
  title: string;
  release_year: number;
  rating: string;
};

type Actor = {
  actor_id: number;
  first_name: string;
  last_name: string;
  film_count: number;
  rental_count: number;
};

const MainPage = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    Promise.all([
      fetch(`${apiUrl}/api/films/top-films`),
      fetch(`${apiUrl}/api/actors/top-actors`),
    ])
      .then(async ([filmsRes, actorsRes]) => {
        if (!filmsRes.ok) throw new Error("Error fetching films");
        if (!actorsRes.ok) throw new Error("Error fetching actors");

        const filmsData: Film[] = await filmsRes.json();
        const actorsData: Actor[] = await actorsRes.json();

        setFilms(filmsData);
        setActors(actorsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return <p>Loading films...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="flex flex-col sm:mx-12 sm:flex-row">
      <TopFiveFlimsCard films={films} label="Top 5 Rented Films" />
      <TopActorCard actors={actors} label="Top 5 Actors" />
    </div>
  );
};

export default MainPage;
