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
      {
        path: "schedule",
        name: "home",
        component: () => import("@/views/main/schedule.vue"),
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
    path: "/member/login",
    name: "member-login",
    component: () => import("@/views/user/login.vue"),
  },
  {
    path: "/enterprise/join",
    name: "enterprise-join",
    component: () => import("@/views/enterprise/join.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/enterprise/login.vue"),
  },
  // {
  //   path: "/main",
  //   components: {
  //     default: () => import("@/Layout/main-index.vue"),
  //   },
  //   children: [
  //     {
  //       path: "",
  //       name: "main-home",
  //       component: () => import("@/views/main/index.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/",
  //   name: "main",
  //   component: () => import("@/Layout/main-index.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "main",
  //       component: () => import("@/views/main/index.vue"),
  //     },
  //   ],
  // },
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
  {
      path: "/liveboard",
      name: "Liveboard",
      component: () => import("@/views/broadcast/liveboard.vue")
  }
];
export default routes;