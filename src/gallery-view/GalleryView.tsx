import { useEffect, useState } from "react";
import { TVShow, getTVShowsByGenre, getTVGenres, Genre } from "../api/products";
import { useNavigate } from "react-router-dom";
import "./GalleryView.scss";

function GalleryView() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    const index = shows.findIndex((show) => show.id === id);

    navigate(`/details/${id}`, {
      state: {
        shows: shows,
        currentIndex: index,
      },
    });
  };

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenre((prev) => (prev === genreId ? null : genreId));
  };

  useEffect(() => {
    getTVGenres()
      .then((genreList) => {
        setGenres(genreList);
      })
      .catch((err) => {
        console.error("Failed to fetch genres", err);
        setError("Failed to load genres");
      });
  }, []);

  useEffect(() => {
    if (selectedGenre === null) {
      setShows([]);
      return;
    }

    setError(null);

    getTVShowsByGenre(selectedGenre)
      .then((showList) => {
        setShows(showList);
      })
      .catch((err) => {
        console.error("Failed to fetch shows", err);
        setError("Failed to load TV shows");
      });
  }, [selectedGenre]);

  return (
    <div>
      <h2>TV Shows by Genre</h2>

      <div className="genre-selector">
        <p className="selector-label">Select Genres:</p>
        <div className="checkbox-group">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className={`checkbox-label ${
                selectedGenre === genre.id ? "checked" : ""
              }`}
            >
              <input
                type="checkbox"
                id={`genre-${genre.id}`}
                checked={selectedGenre === genre.id}
                onChange={() => handleGenreToggle(genre.id)}
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedGenre !== null && <div className="selected-genres"></div>}

      {error && <div className="error">{error}</div>}

      {shows.length === 0 && selectedGenre === null && (
        <div className="no-results">Select Genre</div>
      )}

      {shows.length > 0 && (
        <div className="gallery-grid">
          {shows.map((show) => (
            <div
              key={show.id}
              className="gallery-item"
              onClick={() => handleClick(show.id)}
            >
              {show.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                  alt={show.name}
                />
              ) : (
                <div className="no-poster">No Image</div>
              )}
              <h3>{show.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryView;
