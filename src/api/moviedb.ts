import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDA2ZWE3ZTE1MjUyNzYzZGQwMGU3ZTY3OTU0NzhlOSIsIm5iZiI6MTc1OTYzMzA1MS45NTcsInN1YiI6IjY4ZTFkZTliZmQ2YWRkMzRmZWMyNmNmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z_ynV6tXTzD2zFEc1fMlR90hxNLi5zvJZNGEnH2J8k4`,
  },
});

export default api;
