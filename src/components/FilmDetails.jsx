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
    const fecthFilms = async () => {
      try {
        const response = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
        const data = await response.json()
        setFilm(data)
      } catch (error) {
        console.log("error", error)
      }
    }
    fecthFilms();
  }, [id]);

  return (
    <div
      className="flex flex-col w-full min-h-screen overflow-hidden fade-in bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `
      linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 100%),
      url(${film.movie_banner})
    `,
      }}
    >
      <Link to="/films" className="flex items-center justify-start p-6 drop-shadow-md shadow-black text-2xl text-white hover:text-slate-300 transition"><ArrowBackIosIcon />
        <p>Back</p>
      </Link>

      <div className="flex flex-col flex-grow md:flex-row gap-16 justify-center items-center">
        <img
          src={film.image}
          alt={film.title + "image"}
          className="w-80"
        />

        <div className="text-left">
          <h3 className="font-title text-5xl mb-4 text-white drop-shadow-md shadow-black">
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
            Running time: {film.running_time} min <AccessTimeIcon className="text-sm" />
          </p>
          <p className="font-text text-white italic text-left drop-shadow-md shadow-black flex items-center">
            Score: {film.rt_score} <StarIcon className="text-sm" />
          </p>
          <p className="font-text text-white mt-8 text-left drop-shadow-md shadow-black max-w-[60rem]">
            {film.description}
          </p>
        </div>
      </div>
    </div>
  );
}
