import axios from "axios";

const list = () => axios.get("/category");
const create = data => axios.post("/category", data);
const update = ( payload ) => axios.put(`/category/${payload.id}`, payload);
const remove = (id) => axios.delete(`/category/${id}`)

const categoriesApi = {
  list,
  create,
  update,
  remove
};

export default categoriesApi;
