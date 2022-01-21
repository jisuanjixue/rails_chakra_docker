import {request} from "./axios";

// const list = () => axios.get("/category");
const create = data => request.post("/signup", {user: data});
const queryMe = () => request.get("/current_user");
const login =  data => request.post("/login", {user: data});
const update = ( data ) => request.put("/signup", data);
const remove = (data) => request.delete("/users", data)

const userApi = {
  login,
  queryMe,
  update,
//   list,
  create,
//   update,
  remove
};

export default userApi;