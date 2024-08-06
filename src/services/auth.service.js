import { http } from "./config";

export const authService = {
  signUp: (data) => {
    return http.post("/auth/signup", data);
  },
  signIn: (data) => {
    return http.post("/auth/signin", data);
  },
};
