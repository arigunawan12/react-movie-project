import axios from "axios";

const key = "c63defe7dae36af0e37367adff7a5fb4";
const session = localStorage.getItem("sessionId");
const url = "https://api.themoviedb.org/3/";

export const getData = async () => {
  const movie = await axios.get(`${url}movie/popular?api_key=${key}`);

  return movie.data.results;
};

export const logout = () => {
  axios
    .delete(`${url}authentication/session?api_key=${key}`, {
      data: {
        session_id: session,
      },
    })
    .then((rest) => {
      console.log(rest);
    });
  localStorage.removeItem("sessionId");
  localStorage.removeItem("name");
  window.location.assign("/");
};
