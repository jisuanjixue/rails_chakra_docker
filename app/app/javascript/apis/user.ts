import axios from "axios";

// const list = () => axios.get("/category");
const create = data => axios.post("/signup", {user: data});
// const update = ( payload ) => axios.put(`/category/${payload.id}`, payload);
const remove = (data) => axios.delete("/users", data)

const userApi = {
//   list,
  create,
//   update,
  remove
};

export default userApi;