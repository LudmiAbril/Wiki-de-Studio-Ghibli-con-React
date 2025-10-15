import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";

export function Species() {
  const [species, setSpecies] = useState([]);
  const [filteredspecies, setFilteredSpecies] = useState([]);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fecthData = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://ghibliapi.vercel.app/species");
        const data = await response.json();
        setSpecies(data);
        setFilteredSpecies(data);
      } catch (error) {
        setMessage("An error Ocurred");
        console.error("an error occured:", error)
      }
      finally {
        setLoading(false)
      }
    }
    fecthData();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Classification",
      selector: (row) => row.classification,
    },
    {
      name: "Eye colors",
      selector: (row) => row.eye_colors,
    },
    {
      name: "Hair colors",
      selector: (row) => row.hair_colors,
    },
  ];

  const search = (event) => {
    setMessage("");
    const searchText = event.target.value.toLowerCase();
    const filteredData = species.filter((s) =>
      s.name.toLowerCase().includes(searchText)
    );
    if (filteredData.length === 0) {
      setMessage("No species found.");
    }
    setFilteredSpecies(filteredData);
  };

  if (loading) {
    return <p className="text-center p-4">Loading species...</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row text-center justify-between my-10 mx-[5rem]">
        <h2 className="font-title text-4xl">Species</h2>
        <div className="relative ">
          <input
            type="text"
            className="border-2 border-slate-300 rounded-lg p-1 w-70 lg:w-80 focus:outline-none"
            placeholder="Search by name..."
            onChange={search}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 rounded-l-md text-slate-400">
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="mx-10 lg:mx-[5rem]">
        <DataTable columns={columns} data={filteredspecies} className="fade-in" noDataComponent={message} />
      </div>
    </div>
  );
}
