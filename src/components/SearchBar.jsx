import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar({
  data = [],
  setFilteredData,
  setMessage,
  placeholder = "Search by name...",
  filterKey = "name",
}) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);

    if (setMessage) setMessage("");

    const filtered = data.filter((item) => {
      const value = item[filterKey];
      return value?.toLowerCase().includes(text);
    });

    if (filtered.length === 0 && setMessage) {
      setMessage("No results found.");
    }

    setFilteredData(filtered);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder={placeholder}
        className="border-2 border-slate-300 rounded-lg p-1 w-70 lg:w-80 focus:outline-none"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
        <SearchIcon />
      </div>
    </div>
  );
}
