import { http } from "./config";

export const nguoiDungService = {
  getAllUsers: () => {
    return http.get("/users");
  },
  deleteUser: (id) => {
    return http.delete(`/users?id=${id}`);
  },
  addUser: (data) => {
    return http.post("/users", data);
  },
  uploadAvatar: (token, data) => {
    return http.post("/users/upload-avatar", data, {
      headers: {
        token,
      },
    });
  },
};
