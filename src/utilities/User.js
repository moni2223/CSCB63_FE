/* eslint-disable */
const User = {
  isAuthenticated: localStorage.getItem("cscb63_token") !== null,
  // isAdmin: localStorage.getItem("amarant-iute-role") === "admin" || localStorage.getItem("role") === "super-admin",
  token: localStorage.getItem("cscb63_token"),
  user: localStorage.getItem("user") && JSON?.parse(localStorage?.getItem("user")),
  role: localStorage.getItem("user") && JSON?.parse(localStorage?.getItem("user"))?.role,
  getToken() {
    return User.token;
  },
  getUser() {
    return User.user;
  },
  // getRole() {
  //   return User.role;
  // },

  setUserKey(key, value) {
    return new Promise((resolve, reject) => {
      User.user[key] = value;
      localStorage.setItem("user", JSON.stringify(User.user));
      resolve();
    });
  },
  authenticate(token, user) {
    return new Promise((resolve, reject) => {
      console.log(user);
      User.isAuthenticated = true;
      // user?.role === "admin" ? (User.isAdmin = true) : (User.isAdmin = false);
      User.token = token;
      User.user = user;
      // User.role = user?.role;
      localStorage.setItem("cscb63_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("phoneNumber", user.phoneNumber);
      // localStorage.setItem("amarant-iute-role", user?.role);
      resolve();
    });
  },
  authenticateFromToken(token, user) {
    return new Promise((resolve, reject) => {
      User.isAuthenticated = true;
      // user.role === "admin" ? (User.isAdmin = true) : (User.isAdmin = false);
      User.token = token;
      User.user = user;
      // User.role = user.role;
      localStorage.setItem("cscb63_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("phoneNumber", user.phoneNumber);
      // localStorage.setItem("role", user.role);
      resolve();
    });
  },
  signout(cb) {
    return new Promise((resolve, reject) => {
      User.isAuthenticated = false;
      User.isAdmin = false;
      User.token = null;
      User.user = null;
      User.role = null;
      localStorage.removeItem("cscb63_token");
      localStorage.removeItem("user");
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("cscb63_role");
      resolve();
    });
  },
};

export { User };
