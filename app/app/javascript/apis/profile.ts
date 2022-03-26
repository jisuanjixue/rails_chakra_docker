import { request } from "./axios";

const update = data => request.patch("/profile/update", data);

const profileApi = {
  update,
};

export default profileApi;
