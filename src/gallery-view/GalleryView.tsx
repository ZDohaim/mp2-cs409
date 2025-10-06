import { useEffect, useState } from "react";
import { TVShow, getTVShowsByGenre, getTVGenres, Genre } from "../api/products";
import "./GalleryView.scss";
function GalleryView() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      } else {
        return [...prev, genreId];
      }
    });
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
    if (selectedGenres.length === 0) {
      setShows([]);
      return;
    }

    setLoading(true);
    setError(null);

    getTVShowsByGenre(selectedGenres[0])
      .then((showList) => {
        setShows(showList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch shows", err);
        setError("Failed to load TV shows");
        setLoading(false);
      });
  }, [selectedGenres]);

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
                selectedGenres.includes(genre.id) ? "checked" : ""
              }`}
            >
              <input
                type="checkbox"
                id={`genre-${genre.id}`}
                checked={selectedGenres.includes(genre.id)}
                onChange={() => handleGenreToggle(genre.id)}
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedGenres.length > 0 && (
        <div className="selected-genres">
          <strong>Filtering by:</strong>{" "}
          {selectedGenres
            .map((id) => genres.find((g) => g.id === id)?.name)
            .join(", ")}
        </div>
      )}

      {loading && <div className="loading">Loading shows...</div>}

      {error && <div className="error">{error}</div>}

      {!loading && shows.length === 0 && selectedGenres.length > 0 && (
        <div className="no-results">No shows found for selected genres</div>
      )}

      {!loading && shows.length > 0 && (
        <div className="gallery-grid">
          {shows.map((show) => (
            <div key={show.id} className="gallery-item">
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
