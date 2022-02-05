"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("./axios");
// const list = () => axios.get("/category");
const create = data => axios_1.request.post("/signup", { user: data });
const queryMe = () => axios_1.request.get("/current_user");
const login = data => axios_1.request.post("/login", { user: data });
const logout = () => axios_1.request.delete("/logout");
const update = data => axios_1.request.put("/signup", data);
const remove = data => axios_1.request.delete("/users", data);
const userApi = {
    login,
    queryMe,
    update,
    logout,
    //   list,
    create,
    //   update,
    remove,
};
exports.default = userApi;
//# sourceMappingURL=user.js.map