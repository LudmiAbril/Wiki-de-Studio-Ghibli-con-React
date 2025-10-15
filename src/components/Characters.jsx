import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { SearchBar } from "./SearchBar";

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

  if (loading) {
    return <p className="text-center p-4">Loading characters...</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row text-center justify-between my-10 mx-[5rem]">
        <h2 className="font-title text-4xl">Characters</h2>
        <SearchBar
          data={characters}
          setFilteredData={setFilteredCharacters}
          setMessage={setMessage}
          placeholder="Search by name..."
          filterKey="name"
        />
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
