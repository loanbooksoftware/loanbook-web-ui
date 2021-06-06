import md5 from "md5";
import config from "../config";

const authProvider = {
  login: (params) => {
    const { username, password } = params;
    if (md5(`${username}${password}`) === "2caedae59160f38e72828ab2cdce5684") {
      localStorage.setItem("token", config.token);
      return Promise.resolve();
    } else {
      return Promise.reject("Incorrect password");
    }
  },
  checkError: (params) => {
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject({ redirectTo: "/login" });
    }
    return Promise.resolve();
  },
  checkAuth: (params, mode = "async") => {
    if (mode === "async") {
      return localStorage.getItem("token")
        ? Promise.resolve()
        : Promise.reject({ redirectTo: "/login" });
    } else {
      return localStorage.getItem("token") ? true : false;
    }
  },
  logout: (params) => {
    localStorage.removeItem("token");
    return Promise.resolve("/login");
  },
  getPermissions: (params) => {
    return Promise.resolve({});
  },
  getIdentity: () => {
    return Promise.resolve({
      id: 1,
      fullName: "Pappu lal",
    });
  },
};

export default authProvider;
