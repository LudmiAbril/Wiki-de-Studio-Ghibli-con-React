import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Locations } from "./components/Locations";
import { Species } from "./components/Species";
import { Vehicles } from "./components/Vehicles";
import { Home } from "./components/Home";
import Navbar from "./components/Navbar";
import { Films } from "./components/Films";
import { Characters } from "./components/Characters";
import { FilmDetails } from "./components/FilmDetails";
import Footer from "./components/Footer";

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
      <Footer />
    </div>
  );
}

export default App;
