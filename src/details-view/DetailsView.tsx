import { useParams, useNavigate, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { TVShow, getTVShow } from "../api/products";
import "./DetailsView.scss";
import api from "../api/moviedb";

function DetailsView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState<TVShow | null>(null);

  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { shows, currentIndex } = location.state || {};

  let prevId: number | null = null;
  let nextId: number | null = null;

  if (shows && currentIndex !== undefined) {
    if (currentIndex > 0) {
      prevId = shows[currentIndex - 1].id;
    }
    if (currentIndex < shows.length - 1) {
      nextId = shows[currentIndex + 1].id;
    }
  }

  const handleNav = (newId: number) => {
    navigate(`/details/${newId}`, {
      state: {
        shows: shows,
        currentIndex: shows.findIndex((s: any) => s.id === newId),
      },
    });
  };

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("Invalid TV Show ID");
      return;
    }

    setError(null);
    getTVShow(Number(id)).then((data) => {
      setShow(data);
    });
  }, [id]);

  if (!show)
    return (
      <div>
        No show found <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );

  return (
    <div className="detailsBox">
      <button
        className="prevbackButton"
        onClick={() => handleNav(prevId!)}
        disabled={!prevId}
      >
        BACK
      </button>
      <button
        className="prevbackButton"
        onClick={() => handleNav(nextId!)}
        disabled={!nextId}
      >
        NEXT
      </button>
      <h1>{show.name}</h1>
      {show.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} />
      )}
      <div>
        <p className="overview">{show.overview}</p>
        <p>
          <strong>Rating:</strong> {show.vote_average}/10
        </p>
        <p>
          <strong>Popularity:</strong> {show.popularity}
        </p>
        {show.first_air_date && (
          <p>
            <strong>First Aired:</strong> {show.first_air_date}
          </p>
        )}
        {show.number_of_seasons && (
          <p>
            <strong>Seasons:</strong> {show.number_of_seasons}
          </p>
        )}
        {show.number_of_episodes && (
          <p>
            <strong>Episodes:</strong> {show.number_of_episodes}
          </p>
        )}
      </div>
    </div>
  );
}

export default DetailsView;
