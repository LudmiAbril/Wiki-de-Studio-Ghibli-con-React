import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { SearchBar } from "./SearchBar";
import { loadingStyles } from "../utils/utils";

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

  if (loading) {
    return <p className={loadingStyles}>Loading vehicles...</p>;
  }

  return (
    <div className="flex-grow">
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row text-center justify-between my-10 mx-[5rem]">
        <h2 className="font-title text-4xl">Vehicles</h2>
        <SearchBar
          data={vehicles}
          setFilteredData={setFilteredVehicles}
          setMessage={setMessage}
          placeholder="Search by name..."
          filterKey="name"
        />
      </div>
      <div className="mx-10 lg:mx-[5rem]">
        <DataTable columns={columns} data={filteredVehicles} className="fade-in" noDataComponent={message} />
      </div>
    </div>
  );
}
