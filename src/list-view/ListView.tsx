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
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
      />

      {items.length > 0 && (
        <ul className="autocomplete-list">
          {items.map((item) => (
            <img
              src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
              alt={item.name}
              width={40}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListView;
