import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { SearchBar } from "./SearchBar";
import { loadingStyles } from "../utils/utils";

export function Locations() {
  const [locations, setLocations] = useState([]);
  const [filteredLoc, setFilteredLoc] = useState([]);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://ghibliapi.vercel.app/locations");
        const data = await response.json();
        const enrichedData = await Promise.all(
          data.map(async (loc) => {
            const filmTitle = await (async () => {
              if (!loc.films?.length) return "Unknown";
              try {
                const filmRes = await fetch(loc.films[0]);
                const filmData = await filmRes.json();
                return filmData.title ?? "Unknown";
              } catch {
                return "Unknown";
              }
            })();
            return { ...loc, filmTitle };
          })
        );
        setLocations(enrichedData);
        setFilteredLoc(enrichedData);
      } catch (error) {
        setMessage("An Error ocurred");
        console.error("Error fetching locations:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

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
      cell: (row) => row.filmTitle,
    },
  ];

  if (loading) {
    return <p className={loadingStyles}>Loading locations...</p>;
  }

  return (
    <div className="flex-grow">
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row text-center justify-between my-10 mx-[5rem]">
        <h2 className="font-title text-4xl">Locations</h2>
        <SearchBar
          data={locations}
          setFilteredData={setFilteredLoc}
          setMessage={setMessage}
          placeholder="Search by name..."
          filterKey="name"
        />
      </div>
      <div className="mx-10 lg:mx-[5rem]">
        <DataTable
          columns={columns}
          data={filteredLoc}
          pagination
          className="fade-in"
          noDataComponent={message}
        />
      </div>
    </div>
  );
}
