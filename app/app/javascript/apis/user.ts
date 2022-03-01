import { request } from "./axios";

// const list = () => axios.get("/category");
const create = data => request.post("/signup", { user: data });
const queryMe = () => request.get("/current_user");
const login = data => request.post("/login", { user: data });
const logout = () => request.delete("/logout");
const update = data => request.patch("/signup", data);
const remove = data => request.delete("/users", data);

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

export default userApi;
