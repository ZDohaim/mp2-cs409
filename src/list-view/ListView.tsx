import { useState } from "react";
import { TVShow, searchTVShows } from "../api/products";

function ListView() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<TVShow[]>([]);

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

  return (
    <div>
      <h1>TVShow Finder</h1>

      <button>Search</button>
      <button>Gallery</button>

      <div className="searchBox">
        <input
          type="text"
          placeholder="Search tvShows..."
          value={query}
          onChange={handleChange}
        />

        <label>
          Sort By:
          <select>
            <option value="RANK">Rank</option>
            <option value="TITLE">Title</option>
          </select>
        </label>

        <div className="ASCDECS">
          <button>Ascending</button>
          <button>Descending</button>
        </div>
      </div>

      {items.length > 0 && (
        <ul className="autocomplete-list">
          {items.map((item) => (
            <li key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.name}
                width={40}
              />
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListView;
