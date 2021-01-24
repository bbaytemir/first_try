import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import Calls from "../views/Calls/Calls.vue";
import AddCall from "../views/Calls/AddCall.vue";
import CallDetails from "../views/Calls/CallDetails.vue";

import CategoryUser from "../views/Categories/CategoryUser.vue";
import AddCategory from "../views/Categories/AddCategory.vue";

import EditProfile from "../views/User/EditUserProfile.vue";

import AuthMiddleware from "./middleware/AuthMiddleware";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/Calls",
    name: "Calls",
    component: Calls,
    beforeEnter : AuthMiddleware,
  },
  {
    path: "/AddCall",
    name: "AddCall",
    component: AddCall,
    beforeEnter : AuthMiddleware,
  },
  
  {
    path: "/CallDetails/:callId",
    name: "CallDetails",
    component: CallDetails,
    beforeEnter : AuthMiddleware,
  },
  
  {
    path: "/Categories",
    name: "Categories",
    component: CategoryUser,
    beforeEnter : AuthMiddleware,
  },
  {
    path: "/AddCategory",
    name: "AddCategory",
    component: AddCategory,
    beforeEnter : AuthMiddleware,
  },
  {
    path: "/EditProfile",
    name: "EditProfile",
    component: EditProfile,
    beforeEnter : AuthMiddleware,
  },
  {
    path: "/about",
    name: "About",
    beforeEnter : AuthMiddleware,
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
