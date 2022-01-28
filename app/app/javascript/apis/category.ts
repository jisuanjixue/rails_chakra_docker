import { request } from "./axios";

const list = () => request.get("/category");
const create = data => request.post("/category", data);
const update = payload => request.put(`/category/${payload.id}`, payload);
const remove = id => request.delete(`/category/${id}`);

const categoriesApi = {
  list,
  create,
  update,
  remove,
};

export default categoriesApi;
