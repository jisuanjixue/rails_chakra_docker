import { request } from "./axios";

const create = data => request.post("/reset/send", data);

const sendApi = {
  create,
};

export default sendApi;
