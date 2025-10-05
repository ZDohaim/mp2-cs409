import api from "./openfoodfacts";

export interface Product {
  code: string;
  product_name: string;
  image_front_url?: string;
  nutriments?: {
    caffeine_100g: number;
    energy_kcal_100g?: number;
    [key: string]: number | undefined;
  };
}

export async function searchFoods(query: string): Promise<Product[]> {
  const res = await api.get<{ products: Product[] }>("/search", {
    params: {
      search_terms: query,
      fields: "product_name,nutriments,image_front_url,code",
      page_size: 20,
    },
  });
  return res.data.products;
}
