import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TVShow, getTVShow } from "../api/products";
import api from "../api/moviedb";

function DetailsView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState<TVShow | null>(null);

  const [error, setError] = useState<string | null>(null);

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
      <button onClick={() => navigate("/")}>← Back to Search</button>
      <h1>{show.name}</h1>
      <p>{show.overview}</p>
      {show.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} />
      )}
      <div>
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
