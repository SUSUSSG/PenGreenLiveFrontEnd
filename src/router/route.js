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
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
      },
    ],
  },
];

export default routes;
