export function Home() {
  return (
    <div className="m-10 fade-in">
     
      <div className="flex items-center font-text">
        <img src="home-img.png" width={400} alt="home-img" />
        <div className="flex flex-col text-left gap-10">
          <h1 className="font-title  text-4xl ">
            Welcome to Ghibli Wiki!
          </h1>
          <p>
          This is a personal project created with React and TailwindCSS, using the <a href="https://ghibliapi.vercel.app/" target="_blank" className="no-underline hover:underline text-[#4381cc]">Studio Ghibli API.</a> Here you can find information about the movies, characters, and other elements that make up the narrative universe of Ghibli.
          </p>
        </div>
      </div>
    </div>
  );
}
