"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("./axios");
const list = () => axios_1.request.get("/category");
const create = data => axios_1.request.post("/category", data);
const update = payload => axios_1.request.put(`/category/${payload.id}`, payload);
const remove = id => axios_1.request.delete(`/category/${id}`);
const categoriesApi = {
    list,
    create,
    update,
    remove,
};
exports.default = categoriesApi;
//# sourceMappingURL=category.js.map