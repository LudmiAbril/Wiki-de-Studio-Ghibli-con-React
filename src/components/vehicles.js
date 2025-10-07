import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";

export function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/vehicles")
      .then((response) => response.json())
      .then((data) => { setVehicles(data); setFilteredVehicles(data) });
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

  const GetPilot = (row) => {
    const [pilot, setPilot] = useState("Loading...");

    useEffect(() => {
      const pilotUrl = row.pilot;
      fetch(pilotUrl)
        .then((response) => response.json())
        .then((data) => setPilot(data.name));
    }, [row.pilot]);

    return pilot;
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },

    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Pilot",
      selector: (row) => GetPilot(row),
    },
    {
      name: "Type",
      selector: (row) => row.vehicle_class,
    },
    {
      name: "Length",
      selector: (row) => row.length + " m",
    },
    {
      name: "Film",
      selector: (row) => GetMovieTitle(row)
    },
  ];

  const search = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredData = vehicles.filter((v) =>
      v.name.toLowerCase().startsWith(searchText)
    );
    setFilteredVehicles(filteredData);
  };


  return (
    <>
      <div className="flex justify-between m-2">
        <h2 className="font-title text-3xl">Vehicles</h2>
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

      <DataTable columns={columns} data={filteredVehicles} className="fade-in" />
    </>
  );
}
