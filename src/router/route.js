const routes = [
  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    component: () => import("@/Layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/index.vue"),
      },
    ],
  },
  {
    path: "/main",
    components: {
      default: () => import("@/Layout/main-index.vue"),
    },
    children: [
      {
        path: "",
        name: "main-home",
        component: () => import("@/views/main/index.vue"),
      },
    ],
  },
];

export default routes;
