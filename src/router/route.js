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
        path: "/broadcast/register-live",
        name: "register-live",
        component: () => import("@/views/broadcast/live-register.vue")
      }
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
  {
    path: "/liveboard",
    name: "Liveboard",
    component: () => import("@/views/broadcast/liveboard.vue")
  }
];

export default routes;
