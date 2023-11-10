import { createRouter, createWebHistory } from "vue-router";
import PublicLayout from "../layouts/PublicLayout.vue";

const routes = [
  {
    path: "/",
    name: "layout",
    component: PublicLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../pages/HomeView.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("../pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "user_index",
    component: () => import("../layouts/playerLayout.vue"),
    children: [
      {
        path: ":uid",
        name: "user_home",
        component: () => import("../pages/user/IndexPage.vue"),
        children: [
          {
            path: "",
            name: "user",
            component: () => import("../pages/user/UserPage.vue"),
          },
          {
            path: "memory-game",
            name: "memory",
            component: () => import("../pages/user/games/MemoryGame.vue"),
          },
          {
            path: "numbers-game",
            name: "numbers",
            component: () => import("../pages/user/games/NumbersGame.vue"),
          },
          {
            path: "words-game",
            name: "word",
            component: () => import("../pages/user/games/WordsGame.vue"),
          },
          {
            path: "tic-tac-toe",
            name: "tic-tac-toe",
            component: () => import("../pages/user/games/TicTacToe.vue"),
          },
          {
            path: "users",
            name: "users",
            component: () => import("../pages/user/UsersPage.vue"),
          },
          {
            path: "ranking",
            name: "ranking",
            component: () => import("../pages/user/RankingUser.vue"),
          },
          {
            path: "user_config",
            name: "user_config",
            component: () => import("../pages/user/UserConfig.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transition = toDepth < fromDepth ? "slide-right" : "slide-left";
});

export default router;
