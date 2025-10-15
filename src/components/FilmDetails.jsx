import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { loadingStyles } from "../utils/utils";

export function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fecthFilms = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
        const data = await response.json()
        setFilm(data)
      } catch (error) {
        console.log("error", error)
      }
      finally {
        setLoading(false)
      }
    }
    fecthFilms();
  }, [id]);

  const filmInfo = [
    { label: "Original title", value: `"${film.original_title_romanised ?? ""}" (${film.original_title ?? ""})` },
    { label: "Year", value: film.release_date ?? "" },
    { label: "Director", value: film.director ?? "" },
    { label: "Producer", value: film.producer ?? "" },
    { label: "Running time", value: `${film.running_time ?? ""} min`, icon: <AccessTimeIcon className="text-sm" /> },
    { label: "Score", value: film.rt_score ?? "", icon: <StarIcon className="text-sm" /> },
  ];

  if (loading) {
    return <p className={loadingStyles}>Loading...</p>;
  }

  return (
    <div
      className="flex flex-col w-full flex-grow overflow-hidden fade-in bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `
      linear-gradient(to bottom, rgba(0, 0, 0, 0.27) 0%, rgba(0, 0, 0, 0.9) 100%),
      url(${film.movie_banner})
    `,
      }}
    >
      <Link to="/films" className="flex items-center justify-start p-6 drop-shadow-md shadow-black text-2xl text-white hover:text-slate-300 transition"><ArrowBackIosIcon />
        <p>Back</p>
      </Link>

      <div className="flex flex-col flex-grow lg:flex-row gap-16 justify-center items-center">
        <img
          src={film.image}
          alt={film.title + "image"}
          className="hidden lg:block lg:w-80"
        />

        <div className="flex flex-col justify-center items-center text-center lg:text-left lg:items-start gap-1 p-6 lg:p-0">
          <h3 className="font-title text-5xl mb-6 text-white drop-shadow-md shadow-black">
            {film.title}
          </h3>

          {filmInfo.map((info, index) => (
            <p
              key={index}
              className={`font-text text-white italic drop-shadow-md shadow-black flex items-center gap-1`}
            >
              {info.label && `${info.label}:`} {info.value} {info.icon}
            </p>
          ))}

          <p className="font-text text-white mt-8 drop-shadow-md shadow-black max-w-[22rem] lg:max-w-[60rem]">
            {film.description}
          </p>
        </div>

      </div>
    </div>
  );
}
