import axios from "axios";
import axiosInstance from "../../http";
const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmU0MTIxYmFjYjZjYTZjNTgwZjM4ZGY2NjY1YTBhMyIsInN1YiI6IjY1N2Q5Zjg5MDgxNmM3MDc4YjA5NTNhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y2Al7m6NZCtQGV3qpeaQkoVdV0WHnJ-KkAN9WUWLhGA";
const MoviesApi = {
  async getAll(params) {
    const formData = new FormData();
    formData.set("include_adult", params.adult || "false");
    formData.set("include_video", params.video || "false");
    formData.set("language", params.language || "en-US");
    formData.set("page", params.page || 1);
    formData.set("sort_by", params.sortBy || "popularity.desc");
    return await axiosInstance.get(
      "discover/movie?" + new URLSearchParams(formData).toString(),
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },
  async getByID(id) {
    const formData = new FormData();
    formData.set("language", "en-US");

    return await axiosInstance.get("/movie/" + id, {
      headers: {
        Authorization: token,
      },
    });
  },
  async searchMovie(params) {
    const formData = new FormData();
    formData.set("query", params.searchQry);
    formData.set("include_video", params.video || "false");
    formData.set("language", params.language || "en-US");
    formData.set("page", params.page || 1);
    return await axiosInstance.get("/search/movie?" + new URLSearchParams(formData).toString(), {
      headers: {
        Authorization: token,
      },
    })
  },

  async getGenres() {
    return await axiosInstance.get('genre/movie/list?language=en', {
      headers: {
        Authorization: token,
      },
    })
  },

  async getByGenres(id) {
    return await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${id.id}`, {
      headers: {
        Authorization: token,
      },
    })
  }
};
export default MoviesApi;
