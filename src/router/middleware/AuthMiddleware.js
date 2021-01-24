import store from "../../store/index";
export default (to, from, next) => {
  console.log("checking");
  let auth = store.getters.isUser;
  if (!auth) {
    next({ name: "Login" });
    return false;
  }
  next();
  return true;
};
