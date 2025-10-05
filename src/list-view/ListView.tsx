import { useState } from "react";
import { Product, searchFoods } from "../api/products";

function ListView() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Product[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (!q) {
      setItems([]);
      return;
    }
    const results = await searchFoods(q);

    const searchFilter = results.filter((item) =>
      item.product_name?.toLowerCase().includes(q.toLowerCase())
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
            <li key={item.code}>
              <img
                src={item.image_front_url}
                alt={item.product_name}
                width={40}
              />
              {item.product_name} ({item.nutriments?.caffeine_100g ?? "N/A"} mg
              caffeine)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListView;
