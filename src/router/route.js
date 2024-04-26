const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/Layout/main-index.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/main/index.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/Layout/index.vue"),
    children: [
      {
        path: "product-list",
        name: "product-list",
        component: () => import("@/views/dashboard/dashboard-index.vue")
      },
      {
        path: "live-register",
        name: "live-register",
        component: () => import("@/views/broadcast/live-register.vue")
      }
    ]
  },
];

export default routes;
