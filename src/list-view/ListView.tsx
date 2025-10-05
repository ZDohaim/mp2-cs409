import { useEffect, useState } from "react";
import { Product, searchFoods } from "../api/products";
import ReactSearchBox from "react-search-box";

function ListView() {
  const [items, setItems] = useState<Product[]>([]);

  const handleSearch = async (query: string) => {
    if (!query) {
      setItems([]);
      return;
    }
    const results = await searchFoods(query);
    setItems(results);
  };

  return (
    <div>
      <ReactSearchBox
        placeholder="Search products.."
        value="test"
        data={[]}
        onChange={handleSearch}
      />
      ;
    </div>
  );
}
export default ListView;
