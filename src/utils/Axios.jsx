import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjdiN2IyZmMzNmZlZTIyYzVkYmM1ZDI4ZjlmNGVkOCIsIm5iZiI6MTczOTUyNTM2NC43MTQsInN1YiI6IjY3YWYwY2Y0YzYwODBjNTYzNjhlNjVlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WB8itRJHwEo8NsyYimzHJgIdByFmnunlEaOuguExNPc",
  },
});
export default instance;