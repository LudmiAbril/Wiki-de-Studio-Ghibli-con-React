import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';

export function Films() {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films")
      .then((response) => response.json())
      .then((data) => {setFilms(data); setFilteredFilms(data)});
    console.log(films);
  }, []);

  const search = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredData = films.filter((f) =>
      f.title.toLowerCase().startsWith(searchText)
    );
    setFilteredFilms(filteredData);
  };

  return (
    
    <>
    <div className="flex justify-between mt-2
     ml-4 mr-4">
    <h2 className="font-title text-3xl">Films</h2>
    <div className="relative ">
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
    <div className="flex justify-center items-center ">
     

      <div className="grid gap-10 grid-cols-4 m-14" >
        {filteredFilms.map((f, index) => (
          <Link
            to={`/film/${f.id}`}
            key={index}
            className="fade-in flex flex-col cursor-pointer bg-white shadow-md shadow-gray w-60  hover:scale-105 transform transition duration-400"
          >
            <div className="text-center">
              <img src={f.image} className="object-cover" alt={f.title} />
            </div>
            <h2 className="text-center font-title text-lg  text-black mt-2 ">
              {f.title}
            </h2>
            <div className="text-center mt-1">
              <p className="font-text text-slate-800 mb-2 text-sm">
                {f.release_date} - {f.director}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
