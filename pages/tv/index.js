import { useState, useEffect } from "react";
import Seo from "components/Seo";
import dynamic from "next/dynamic";

export default function MovieHome() {
  const ManualSliderNoSSR = dynamic(() => import("components/ManualSlider"), {
    ssr: false,
  });
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [vote, setVote] = useState([]);
  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/tv/popular`)).json();
      setPopular(results);
    })();
    (async () => {
      const { results } = await (await fetch(`/api/tv/latest`)).json();
      setLatest(results);
    })();
    (async () => {
      const { results } = await (await fetch(`/api/tv/vote`)).json();
      setVote(results);
    })();
  }, []);

  return (
    <div className="container">
      <Seo title="TV" />
      {popular && (
        <div className="contents_row">
          <h4>Popular</h4>
          <ManualSliderNoSSR list={popular} dv="tv" />
        </div>
      )}
      {latest && (
        <div className="contents_row">
          <h4>Latest</h4>
          <ManualSliderNoSSR list={latest} dv="tv" />
        </div>
      )}
      {vote && (
        <div className="contents_row">
          <h4>Top Rated</h4>
          <ManualSliderNoSSR list={vote} dv="tv" />
        </div>
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
