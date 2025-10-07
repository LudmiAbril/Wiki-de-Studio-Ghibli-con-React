import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Locations } from "./components/Locations";
import { Species } from "./components/Species";
import { Vehicles } from "./components/Vehicles";
import { FilmDetails } from "./components/filmDetails";
import { Home } from "./components/Home";
import Navbar from "./components/Navbar";
import { Films } from "./components/Films";
import { Characters } from "./components/Characters";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/species" element={<Species />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/film/:id" element={<FilmDetails />} />
        </Routes>
      </Router>
      <div className="mt-auto text-center bg-black text-slate-500 italic p-2">
        <p>Ghibli Wiki - {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default App;
