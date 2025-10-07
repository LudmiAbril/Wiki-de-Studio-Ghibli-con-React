import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";

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

  const search = (event) => {
    setMessage("")
    const searchText = event.target.value.toLowerCase();
    const filteredData = locations.filter((l) =>
      l.name.toLowerCase().startsWith(searchText)
    );
    if (filteredData.length === 0) {
      setMessage("No Locations found.")
    }
    setFilteredLoc(filteredData);
  };

  if (loading) {
    return <p className="text-center p-4">Loading locations...</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between my-10 mx-[5rem]">
        <h2 className="font-title text-4xl">Locations</h2>
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
