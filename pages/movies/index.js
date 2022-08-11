import { useState, useEffect } from "react";
import Seo from "components/Seo";
import dynamic from "next/dynamic";
import ManualSlider from "components/ManualSlider";

export default function MovieHome() {
  // const ManualSliderNoSSR = dynamic(() => import("components/ManualSlider"), {
  //   ssr: false,
  // });
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [vote, setVote] = useState([]);

  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies/popular`)).json();
      setPopular(results);
    })();
    (async () => {
      const { results } = await (await fetch(`/api/movies/latest`)).json();
      setLatest(results);
    })();
    (async () => {
      const { results } = await (await fetch(`/api/movies/vote`)).json();
      setVote(results);
    })();
  }, []);

  return (
    <div className="container">
      <Seo title="Movies" />
      {popular && latest && vote && (
        <>
          <div className="contents_row">
            <h4>Popular</h4>
            <ManualSlider list={popular} dv="movies" />
          </div>
          <div className="contents_row">
            <h4>Latest</h4>
            <ManualSlider list={latest} dv="movies" />
          </div>
          <div className="contents_row">
            <h4>Top Rated</h4>
            <ManualSlider list={vote} dv="movies" />
          </div>
        </>
      )}
      <style jsx global>{`
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
