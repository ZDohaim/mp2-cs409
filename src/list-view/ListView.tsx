import { useState } from "react";
import { TVShow, searchTVShows } from "../api/products";
import { useNavigate } from "react-router-dom";
import "./ListView.scss";

function ListView() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<TVShow[]>([]);
  const [sortKey, setSortKey] = useState<
    "popularity" | "vote_average" | "name"
  >("popularity");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (!q) {
      setItems([]);
      return;
    }
    const results = await searchTVShows(q);

    const searchFilter = results.filter((item) =>
      item.name?.toLowerCase().includes(q.toLowerCase())
    );
    setItems(searchFilter);
  };

  const sortFunctions: Record<string, (a: TVShow, b: TVShow) => number> = {
    popularity: (a, b) => a.popularity - b.popularity,
    vote_average: (a, b) => a.vote_average - b.vote_average,
    name: (a, b) => a.name.localeCompare(b.name),
  };

  const sortedItems = [...items].sort((a, b) => {
    const sortFn = sortFunctions[sortKey];
    return sortOrder === "asc" ? sortFn(a, b) : -sortFn(a, b);
  });

  const handleClick = (id: number) => {
    const index = sortedItems.findIndex((item) => item.id === id);
    navigate(`/details/${id}`, {
      state: {
        shows: sortedItems,
        currentIndex: index,
      },
    });
  };

  return (
    <div>
      <div className="searchBox">
        <h1>TVShow Finder</h1>

        <div>
          <input
            type="text"
            placeholder="Search tvShows..."
            value={query}
            onChange={handleChange}
          />

          <label>
            Sort By:
            <select
              value={sortKey}
              onChange={(e) =>
                setSortKey(
                  e.target.value as "popularity" | "vote_average" | "name"
                )
              }
            >
              <option value="popularity">Popularity</option>
              <option value="vote_average">Rating</option>
              <option value="name">Title</option>
            </select>
          </label>
        </div>
        <div className="ASCDECS">
          <button
            className=".ASCDECS-button"
            onClick={() => setSortOrder("asc")}
          >
            Ascending
          </button>
          <button
            className=".ASCDECS-button"
            onClick={() => setSortOrder("desc")}
          >
            Descending
          </button>
        </div>
      </div>

      {sortedItems.length > 0 && (
        <ul className="autocomplete-list">
          {sortedItems.map((item) => (
            <div className="TvShowList">
              <li key={item.id} onClick={() => handleClick(item.id)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.name}
                  width={40}
                />
              </li>
              <h3 className="TvShowName">{item.name}</h3>
              <p>
                Rating: {item.vote_average} — Popularity: {item.popularity}
              </p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListView;
