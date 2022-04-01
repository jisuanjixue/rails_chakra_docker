import axios from "axios";
import { useHistory } from "react-router-dom";

const confing = {
  baseURL: "/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
const instance = axios.create(confing);

export default function handInterceptor() {
  const token = localStorage.getItem("token");
  const navigate = useHistory();
  instance.interceptors.request.use(
    config => {
      config.headers["Content-Type"] = config.url === "/avatar/upload" ? "multipart/form-data" : "application/json";
      //判断token是否存在 token存在 请求头才添加token 否则不添加
      config.headers.Authorization = config.url === "/login" ? "" : token;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    // 服务器状态码未200
    response => response,
    // 服务器状态码不是200的情况
    // eslint-disable-next-line consistent-return
    error => {
      if (error.response && error.response.status === 401) {
        navigate.push("/auth/signin");
      }

      return Promise.reject(error);
    }
  );
}

export const request = instance;
