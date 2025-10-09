import { Link } from "react-router-dom"
import isologo from "../assets/isologo.png";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const sections = [
        {
            name: "Home",
            route: "/"
        },
        {
            name: "Films",
            route: "/films"
        },
        {
            name: "Characters",
            route: "/characters"
        },
        {
            name: "Locations",
            route: "/locations"
        },
        {
            name: "Species",
            route: "/species"
        },
        {
            name: "Vehicles",
            route: "/vehicles"
        }
    ]

    return (
        <header className="relative bg-slate-950 shadow-md shadow-gray z-50">
            <div className="flex justify-between items-center py-3 px-10 shadow-md shadow-gray">
                <Link className="flex items-center gap-2" to="/">
                    <img src={isologo} width={30} alt="logo" />
                    <h1 className="font-title text-center text-3xl ml-2 font-medium text-white">
                        Ghibli Wiki
                    </h1>
                </Link>
                <button
                    className="lg:hidden text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
                </button>
                <nav className="hidden lg:flex">
                    <ul className="flex gap-3 font-text">
                        {sections.map((section, index) => (
                            <li key={index}>
                                <Link
                                    className="p-1 text-lg text-slate-400 hover:text-white transition ease-in duration-400"
                                    to={section.route}
                                >
                                    {section.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <nav
                className={`absolute w-full bg-slate-950 overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-120 opacity-100" : "max-h-0 opacity-0"
                    } lg:hidden`}
            >
                <ul className="flex flex-col items-center justify-center font-text space-y-8 p-6">
                    {sections.map((section, index) => (
                        <li key={index}>
                            <Link
                                to={section.route}
                                onClick={() => setMenuOpen(false)}
                                className="block text-slate-300 text-lg"
                            >
                                {section.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar