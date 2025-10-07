import { Link } from "react-router-dom"
import isologo from "../assets/isologo.png";

const Navbar = () => {
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
        <div className="flex justify-between items-center bg-slate-950 py-3 px-10 shadow-md shadow-gray">
            <Link className="flex items-center gap-2" to="/">
                <img src={isologo} width={30} alt="logo" />
                <h1 className="font-title text-center text-3xl ml-2 font-medium text-white">
                    Ghibli Wiki
                </h1>
            </Link>
            <nav>
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
    )
}

export default Navbar