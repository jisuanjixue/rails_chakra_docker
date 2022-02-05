"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("./axios");
// const list = () => axios.get("/category");
const create = data => axios_1.request.post("/markets", data);
const list = () => axios_1.request.get("/markets");
const update = payload => axios_1.request.put(`/markets/${payload.id}`, payload);
const remove = id => axios_1.request.delete(`/markets/${id}`);
const marketApi = {
    update,
    list,
    create,
    remove,
};
exports.default = marketApi;
//# sourceMappingURL=market.js.map