import { request } from "./axios";

const create = data => request.post("/avatar/upload", data);

const uploadApi = {
  create,
};

export default uploadApi;
