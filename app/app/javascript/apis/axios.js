import axios from "axios";

axios.defaults.baseURL = "/";

export const setAuthHeaders = () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token ? "Bearer " + token : "",
  };
};
