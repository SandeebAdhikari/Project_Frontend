import { useEffect, useState } from "react";

type Film = {
  category: string;
  film_id: number;
  rented: number;
  title: string;
};

export default function TopFilms() {
  const [films, setFilms] = useState<Film[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/films/top-films/")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Film[]) => {
        setFilms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching films:", err);
        setError("Failed to load films");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading films...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="flex flex-col text-center mt-10 w-full p-4 border">
      <div className="flex flex-col border">
        <h2 className="font-bold text-center">Top 5 Rented Films</h2>
        {films.length === 0 ? (
          <p>No films found</p>
        ) : (
          <div>
            {films.map((film) => (
              <div key={film.film_id}>{film.title}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
