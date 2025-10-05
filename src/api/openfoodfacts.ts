import axios from "axios";

const api = axios.create({
  baseURL: "https://world.openfoodfacts.net/api/v2",
  headers: { "User-Agent": "MyReactApp/1.0 (ziada2@illinois.edu)" },
});
export default api;
