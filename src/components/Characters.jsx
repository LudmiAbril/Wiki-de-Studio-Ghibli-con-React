import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";

export function Characters() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://ghibliapi.vercel.app/people");
        const data = await response.json();

        const enrichedData = await Promise.all(
          data.map(async (char) => {
            const filmTitle = await (async () => {
              if (!char.films?.length) return "Unknown";
              try {
                const res = await fetch(char.films[0]);
                const film = await res.json();
                return film.title ?? "Unknown";
              } catch {
                return "Unknown";
              }
            })();

            const specieName = await (async () => {
              if (!char.species) return "Unknown";
              try {
                const res = await fetch(char.species);
                const specie = await res.json();
                return specie.name ?? "Unknown";
              } catch {
                return "Unknown";
              }
            })();
            return { ...char, filmTitle, specieName };
          })
        );
        setCharacters(enrichedData);
        setFilteredCharacters(enrichedData);
      } catch (error) {
        setMessage("An error ocurred");
        console.error("Error fetching characters:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Hair color",
      selector: (row) => row.hair_color,
    },
    {
      name: "Eye color",
      selector: (row) => row.eye_color,
    },
    {
      name: "Species",
      cell: (row) => row.specieName,
    },
    {
      name: "Film",
      cell: (row) => row.filmTitle,
    },
  ];

  const search = (event) => {
    setMessage("");
    const searchText = event.target.value.toLowerCase();
    const filteredData = characters.filter((character) =>
      character.name.toLowerCase().includes(searchText)
    );
    if (filteredData.length === 0) {
      setMessage("No characters found.");
    }
    setFilteredCharacters(filteredData);
  };

  if (loading) {
    return <p className="text-center p-4">Loading characters...</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row text-center justify-between my-10 mx-[5rem]">
        <h2 className="font-title text-4xl">Characters</h2>
        <div className="relative ">
          <input
            type="text"
            className="border-2 border-slate-300 rounded-lg p-1 w-70 lg:w-80 focus:outline-none"
            placeholder="Search by name..."
            onChange={search}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 rounded-l-md text-slate-400">
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="mx-10 lg:mx-[5rem]">
        <DataTable
          columns={columns}
          data={filteredCharacters}
          className="fade-in"
          pagination
          responsive
          highlightOnHover
          noDataComponent={message}
        />
      </div>
    </div>
  );
}
