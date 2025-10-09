import logo from "../assets/home-img.png";

export function Home() {
  return (
    <div className="fade-in flex flex-col lg:flex-row items-center justify-center min-h-screen font-text">
      <img src={logo} alt="logo" className="w-full max-w-xs lg:max-w-md xl:max-w-lg mb-6 "
      />
      <div className="flex flex-col text-center items-center lg:text-left lg:items-start">
        <h1 className="font-title text-4xl mb-8">
          Welcome to Ghibli Wiki!
        </h1>
        <p className="px-6 lg:px-0 lg:max-w-[60rem]">
          This is a personal project created with React and Tailwind CSS, using the <a href="https://ghibliapi.vercel.app/" target="_blank" className="no-underline hover:underline text-[#4381cc]">Studio Ghibli API.</a> Here you can find information about the movies, characters, and other elements that make up the narrative universe of Ghibli.
        </p>
      </div>
    </div>
  );
}