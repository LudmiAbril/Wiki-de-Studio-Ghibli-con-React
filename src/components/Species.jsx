import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { SearchBar } from "./SearchBar";
import { loadingStyles } from "../utils/utils";

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

  if (loading) {
    return <p className={loadingStyles}>Loading species...</p>;
  }

  return (
    <div className="flex-grow">
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row text-center justify-between my-10 mx-[5rem]">
        <h2 className="font-title text-4xl">Species</h2>
        <SearchBar
          data={species}
          setFilteredData={setFilteredSpecies}
          setMessage={setMessage}
          placeholder="Search by name..."
          filterKey="name"
        />
      </div>
      <div className="mx-10 lg:mx-[5rem]">
        <DataTable columns={columns} data={filteredspecies} className="fade-in" noDataComponent={message} />
      </div>
    </div>
  );
}
