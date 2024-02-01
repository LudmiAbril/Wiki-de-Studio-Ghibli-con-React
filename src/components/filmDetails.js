import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState([]);

  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then((response) => response.json())
      .then((data) => setFilm(data));
  }, [id]);

  console.log(film);
  return (
    <>
      <div className="relative w-full h-[550px] overflow-hidden fade-in ">
     
        <img
          src={film.movie_banner}
          alt={film.title + "banner"}
          className="w-full h-full object-cover opacity-80"
        />

        <div className="absolute bottom-0 ">
          <div className="w-screen p-4 text-center bg-gradient-to-b from-transparent to-black bg-opacity-95 pb-10">
            <Link to="/films" className="flex drop-shadow-md shadow-black  justify-start items-center text-2xl text-white hover:text-slate-300 transition w-fit mb-3"><ArrowBackIosIcon/><p className="mb-1">Back</p></Link>
            <div className="flex gap-6">
              <img
                src={film.image}
                alt={film.title + "image"}
                className="w-72 "
              />

              <div className="m-2">
                <h3 className="font-title text-5xl mb-2 text-white text-left drop-shadow-md shadow-black">
                
                  {film.title}
                </h3>
                <p className="font-text text-white italic text-left drop-shadow-md shadow-black">
                  Original title: "{film.original_title_romanised}" ({film.original_title})
                </p>
                <p className="font-text text-white italic text-left drop-shadow-md shadow-black">
                  Year: {film.release_date}
                </p>
                <p className="font-text text-white italic text-left drop-shadow-md shadow-black">
                  Director: {film.director}
                </p>
                <p className="font-text text-white italic text-left drop-shadow-md shadow-black">
                  Producer: {film.producer}
                </p>
                <p className="font-text text-white italic text-left drop-shadow-md shadow-black gap-1">
                  Running time: {film.running_time} min <AccessTimeIcon className="text-sm"/>
                </p>
                <p className="font-text text-white italic text-left drop-shadow-md shadow-black flex items-center">
                  Score: {film.rt_score} <StarIcon className="text-sm"/>
                </p>
                <p className="font-text text-white mt-8 text-left drop-shadow-md shadow-black">
                  {film.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
