import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";


export function Species() {
  const [species, setSpecies] = useState([]);
  const [filteredspecies, setFilteredSpecies] = useState([]);
  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/species")
      .then((response) => response.json())
      .then((data) => {setSpecies(data); setFilteredSpecies(data);});
    console.log(species);
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
    const searchText = event.target.value.toLowerCase();
    const filteredData = species.filter((s) =>
      s.name.toLowerCase().startsWith(searchText)
    );
    setFilteredSpecies(filteredData);
  };
  

  return (
    <>
    <div className="flex justify-between m-2">
    <h2 className="font-title text-3xl">Species</h2>
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

      <DataTable columns={columns} data={filteredspecies} className="fade-in"/>
    </>
  );
}
