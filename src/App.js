import "./App.css";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Films } from "./components/films";
import { Characters } from "./components/characters";
import { Locations } from "./components/locations";
import { Species } from "./components/species";
import { Vehicles } from "./components/vehicles";
import { FilmDetails } from "./components/filmDetails";
import { Home } from "./components/home";

function App() {
  return (
    <div className="min-h-svh flex flex-col">
      <Router className="bg-gray-900 p-2">
        <div className="flex justify-between items-center bg-slate-950 p-3 shadow-md shadow-gray">
          <div className="flex items-center ml-3">
            <img src="isologo.png" width={30} alt="logo" />
            <h1 className="font-title text-center text-3xl ml-2 font-medium text-white">
              Ghibli Wiki
            </h1>
          </div>

          <nav className="pr-4">
            <ul className="flex gap-3 font-text">
              <li>
                <Link
                  className="p-1 text-lg text-slate-400 hover:text-white transition ease-in duration-400"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="p-1 text-lg text-slate-400 hover:text-white transition ease-in duration-400"
                  to="/films"
                >
                  Films
                </Link>
              </li>
              <li>
                <Link
                  className="p-1 text-lg text-slate-400 hover:text-white transition ease-in duration-400"
                  to="/characters"
                >
                  Characters
                </Link>
              </li>
              <li>
                <Link
                  className="p-1 text-lg text-slate-400 hover:text-white transition ease-in duration-400"
                  to="/locations"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  className="p-1 text-lg text-slate-400 hover:text-white transition ease-in duration-400"
                  to="/species"
                >
                  Species
                </Link>
              </li>
              <li>
                <Link
                  className="p-1 text-lg text-slate-400 hover:text-white transition ease-in duration-400"
                  to="/vehicles"
                >
                  Vehicles
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/films" element={<Films />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/species" element={<Species />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/film/:id" element={<FilmDetails />} />
        </Routes>
      </Router>
     <div className="mt-auto text-center bg-black text-slate-500 italic p-2">
      <p>Ghibli Wiki - 2024</p>
     </div>
    </div>
  );
}

export default App;
