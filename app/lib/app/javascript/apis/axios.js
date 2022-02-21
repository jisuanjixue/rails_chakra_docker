"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const axios_1 = require("axios");
const react_router_dom_1 = require("react-router-dom");
const confing = {
    baseURL: "/",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};
const instance = axios_1.default.create(confing);
function handInterceptor() {
    const token = localStorage.getItem("token");
    const navigate = (0, react_router_dom_1.useHistory)();
    instance.interceptors.request.use(config => {
        //判断token是否存在 token存在 请求头才添加token 否则不添加
        config.headers.Authorization = config.url === "/login" ? "" : token;
        return config;
    }, error => {
        return Promise.reject(error);
    });
    instance.interceptors.response.use(
    // 服务器状态码未200
    response => response, 
    // 服务器状态码不是200的情况
    // eslint-disable-next-line consistent-return
    error => {
        if (error.response && error.response.status === 401) {
            navigate("/login");
        }
        return Promise.reject(error);
    });
}
exports.default = handInterceptor;
exports.request = instance;
//# sourceMappingURL=axios.js.map