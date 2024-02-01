import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";

export function Locations() {
  const [locations, setLocations] = useState([]);
  const [filteredLoc, setFilteredLoc] = useState([]);
  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/locations")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
        setFilteredLoc(data);
      });
  }, []);

  const GetMovieTitle = (row) => {
    const [movieTitle, setMovieTitle] = useState("Loading...");

    useEffect(() => {
      if (row.films && row.films.length > 0) {
        const filmUrl = row.films[0];
        fetch(filmUrl)
          .then((response) => response.json())
          .then((data) => setMovieTitle(data.title));
      }
    }, [row.films]);

    return movieTitle;
  };

  const GetResidentsNames = (row) => {
    const [residentsNames, setResidentsNames] = useState("Loading...");

    useEffect(() => {
      if (row.residents && row.residents.length > 0) {
        const residentPromises = row.residents.map((resident) => {
          if (resident.startsWith("http")) {
            return fetch(resident)
              .then((response) => response.json())
              .then((data) => data.name);
          } else if (resident.startsWith("TODO")) {
            return Promise.resolve("all characters");
          }
        });

        Promise.all(residentPromises)
          .then((names) => setResidentsNames(names.join(", ")))
          .catch((error) =>
            console.error("Error al obtener nombres de residentes", error)
          );
      } else {
        setResidentsNames("None");
      }
    }, [row.residents]);

    return residentsNames;
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Terrain",
      selector: (row) => row.terrain,
    },
    {
      name: "Climate",
      selector: (row) => row.climate,
    },
    {
      name: "Surface water",
      selector: (row) => row.surface_water,
    },

    {
      name: "Film",
      cell: (row) => GetMovieTitle(row),
    },
  ];

  const search = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredData = locations.filter((l) =>
      l.name.toLowerCase().startsWith(searchText)
    );
    setFilteredLoc(filteredData);
  };

  return (
    <>
      <div className="flex justify-between m-2">
        <h2 className="font-title text-3xl">Locations</h2>
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

      <DataTable
        columns={columns}
        data={filteredLoc}
        pagination
        className="fade-in"
      />
    </>
  );
}
