import { request } from "./axios";

// const list = () => axios.get("/category");
const create = data => request.post("/markets", data);
const list = () => request.get("/markets");
const update = payload => request.put(`/markets/${payload.id}`, payload);
const remove = id => request.delete(`/markets/${id}`);

const marketApi = {
  update,
  list,
  create,
  remove,
};

export default marketApi;
