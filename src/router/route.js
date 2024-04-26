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
    path: "/join-first",
    name: "join-first",
    component: () => import("@/views/user/join-first.vue"),
  },
  {
    path: "/join",
    name: "join",
    component: () => import("@/views/user/join.vue"),
  },
  {
    path: "/enterprise/join",
    name: "enterprise-join",
    component: () => import("@/views/enterprise/join.vue"),
  },
];

export default routes;
