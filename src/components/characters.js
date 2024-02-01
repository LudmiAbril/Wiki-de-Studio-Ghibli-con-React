import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";

export function Characters() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ghibliapi.vercel.app/people");
        const data = await response.json();
        setCharacters(data);
        setFilteredCharacters(data);
      } catch (error) {
        console.error("Error trying to get the data.", error);
      }
    };

    fetchData();
    console.log(characters);
  }, []);

  const GetMovieTitle = (row) => {
    const [movieTitle, setMovieTitle] = useState("Loading...");

    useEffect(() => {
      if (row.films && row.films.length > 0) {
        const filmUrl = row.films[0];
        fetch(filmUrl)
          .then((response) => response.json())
          .then((data) => setMovieTitle(data.title));
      }
    }, [row.films]);

    return movieTitle;
  };

  const GetCharacterSpecie = (row) => {
    const [species, setSpecies] = useState("Loading...");

    useEffect(() => {
      const specieUrl = row.species;
      fetch(specieUrl)
        .then((response) => response.json())
        .then((data) => setSpecies(data.name));
    }, [row.species]);

    return species;
  };

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
      cell: (row) => GetCharacterSpecie(row),
    },
    {
      name: "Film",
      cell: (row) => GetMovieTitle(row),
    },
  ];

  const search = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredData = characters.filter((character) =>
      character.name.toLowerCase().startsWith(searchText)
    );
    setFilteredCharacters(filteredData);
  };

  return (
    <>
      <div className="flex justify-between m-2">
        <h2 className="font-title text-3xl">Characters</h2>
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

      <DataTable
        columns={columns}
        data={filteredCharacters}
        className="fade-in"
        pagination
      />
    </>
  );
}
