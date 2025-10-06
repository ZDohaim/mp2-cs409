import { useState } from "react";
import { TVShow, searchTVShows } from "../api/products";
import DetailsView from "../details-view/DetailsView";
import { useNavigate } from "react-router-dom";
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
    navigate(`/details/${id}`);
  };

  return (
    <div>
      <h1>TVShow Finder</h1>

      <div className="searchBox">
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

        <div className="ASCDECS">
          <button onClick={() => setSortOrder("asc")}>Ascending</button>
          <button onClick={() => setSortOrder("desc")}>Descending</button>
        </div>
      </div>

      {sortedItems.length > 0 && (
        <ul className="autocomplete-list">
          {sortedItems.map((item) => (
            <li key={item.id} onClick={() => handleClick(item.id)}>
              <img
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.name}
                width={40}
              />
              {item.name} — Rating: {item.vote_average} — Popularity:{" "}
              {item.popularity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListView;
