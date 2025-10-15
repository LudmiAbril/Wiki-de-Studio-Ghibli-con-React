import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { SearchBar } from "./SearchBar";

export function Films() {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://ghibliapi.vercel.app/films");
        if (!response.ok) {
          const errorMessage = await response.text()
          throw new Error(errorMessage)
        }
        const data = await response.json();
        setFilms(data);
        setFilteredFilms(data);
      } catch (error) {
        setMessage("An error ocurred");
        console.error("Error: ", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFilms();
  }, []);

  if (loading) {
    return <p className="text-center p-4">Loading films...</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row text-center justify-between my-10 mx-[5rem]">
        <h2 className="font-title text-4xl">Films</h2>
        <SearchBar
          data={films}
          setFilteredData={setFilteredFilms}
          setMessage={setMessage}
          placeholder="Search by title..."
          filterKey="title"
        />
      </div>
      <div className="flex justify-center items-center mb-14">
        <div className="flex flex-wrap gap-16 justify-center items-center" >
          {filteredFilms.map((f, index) => (
            <Link
              to={`/film/${f.id}`}
              key={index}
              className="fade-in flex flex-col cursor-pointer bg-white shadow-md shadow-gray w-60 hover:scale-105 transform transition duration-400"
            >
              <div className="text-center">
                <img src={f.image} className="object-cover" alt={f.title} />
              </div>
              <h2 className="text-center font-title text-lg text-black mt-2">
                {f.title}
              </h2>
              <div className="text-center mt-1">
                <p className="font-text text-slate-800 mb-2 text-sm">
                  {f.release_date} - {f.director}
                </p>
              </div>
            </Link>
          ))}
          {message && (<p className="text-gray-600 italic">{message}</p>)}
        </div>
      </div>
    </div>
  );
}
