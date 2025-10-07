import logo from "../assets/home-img.png";

export function Home() {
  return (
    <div className="fade-in flex items-center justify-center min-h-screen font-text">
      <img src={logo} width={400} alt="logo" />
      <div className="flex flex-col text-left">
        <h1 className="font-title text-4xl mb-8">
          Welcome to Ghibli Wiki!
        </h1>
        <p className="max-w-[60rem]">
          This is a personal project created with React and Tailwind CSS, using the <a href="https://ghibliapi.vercel.app/" target="_blank" className="no-underline hover:underline text-[#4381cc]">Studio Ghibli API.</a> Here you can find information about the movies, characters, and other elements that make up the narrative universe of Ghibli.
        </p>
      </div>
    </div>
  );
}