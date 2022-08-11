import Seo from "components/Seo";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AutoSlider from "components/AutoSlider";

export default function Home() {
  // const AutoSliderNoSSR = dynamic(() => import("components/AutoSlider"), {
  //   ssr: false,
  // });
  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);
  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies/popular`)).json();
      setMovies(results);
      // console.log(`movies: ${results}`);
    })();
    (async () => {
      const { results } = await (await fetch(`/api/tv/popular`)).json();
      setTvs(results);
      // console.log(`tvs: ${results}`);
    })();
  }, []);

  return (
    <div className="container">
      <Seo title="Home" />
      {movies && tvs && (
        <>
          <div className="contents_row">
            <h4>Movies</h4>
            <AutoSlider list={movies} dv="movies" />
          </div>
          <div className="contents_row">
            <h4>TV</h4>
            <AutoSlider list={tvs} dv="tv" />
          </div>
        </>
      )}

      <style jsx>{`
        .container {
          display: grid;
          padding: 20px 0;
        }
        .contents_row {
          overflow-x: visible;
          overflow-y: visible;
        }
        .contents_row h4 {
          text-align: left;
        }
        h4 {
          text-align: center;
          margin: 10px 0 -10px;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}

// export async function getServerSideProps() {
//   const { results } = await (
//     await fetch(`http://localhost:3000/api/movies`)
//   ).json();
//   return {
//     props: { results },
//   };
// }
