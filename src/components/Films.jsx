import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';

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

  const search = (event) => {
    setMessage("");
    const searchText = event.target.value.toLowerCase();
    const filteredData = films.filter((f) =>
      f.title.toLowerCase().includes(searchText)
    );
    if (filteredData.length === 0) {
      setMessage("No films found.");
    }
    setFilteredFilms(filteredData);
  };

  if (loading) {
    return <p className="text-center p-4">Loading films...</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between my-10 mx-[5rem]">
        <h2 className="font-title text-4xl">Films</h2>
        <div className="relative">
          <input
            type="text"
            className=" border-2 border-slate-300 rounded-lg p-1 w-80 focus:outline-none "
            placeholder="Search by name..."
            onChange={search}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 rounded-l-md text-slate-400">
            <SearchIcon />
          </div>
        </div>
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
