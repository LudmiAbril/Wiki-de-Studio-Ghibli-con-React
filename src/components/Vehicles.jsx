import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";

export function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://ghibliapi.vercel.app/vehicles");
        const data = await response.json();

        const enrichedData = await Promise.all(
          data.map(async (vehicle) => ({
            ...vehicle,
            pilotName: await fetchPilotName(vehicle.pilot),
            filmTitle: await fetchFilmTitle(vehicle.films?.[0]),
          }))
        );
        setVehicles(enrichedData);
        setFilteredVehicles(enrichedData);
      } catch (error) {
        setMessage("An error Ocurred");
        console.error("Error fetching vehicles:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const fetchFilmTitle = async (filmUrl) => {
    if (!filmUrl) return "Unknown";
    try {
      const res = await fetch(filmUrl);
      const film = await res.json();
      return film.title ?? "Unknown";
    } catch {
      return "Unknown";
    }
  };

  const fetchPilotName = async (pilotUrl) => {
    if (!pilotUrl) return "Unknown";
    try {
      const res = await fetch(pilotUrl);
      const pilot = await res.json();
      return pilot.name ?? "Unknown";
    } catch {
      return "Unknown";
    }
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
      selector: (row) => row.pilotName,
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
      selector: (row) => row.filmTitle
    },
  ];

  const search = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredData = vehicles.filter((v) =>
      v.name.toLowerCase().includes(searchText)
    );
    if (filteredData.length === 0) {
      setMessage("No vehicles found.")
    }
    setFilteredVehicles(filteredData);
  };


  if (loading) {
    return <p className="text-center p-4">Loading characters...</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between my-10 mx-[5rem]">
        <h2 className="font-title text-4xl">Vehicles</h2>
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
      <div className="mx-[5rem]">
        <DataTable columns={columns} data={filteredVehicles} className="fade-in" noDataComponent={message} />
      </div>
    </div>
  );
}
