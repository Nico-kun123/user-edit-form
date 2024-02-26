import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/welcome",
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("../views/UserEditView.vue"),
    },
    // {
    //   path: "/home",
    //   name: "home",
    //   component: () => import("../views/HomeView.vue"),
    // },
  ],
});

export default router;
