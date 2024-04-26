const routes = [
  {
    path: "/",
    name: "Layout",
    // redirect: "/home",
    component: () => import("@/Layout/main-index.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/main/index.vue"),
      },
      // {
      //   path: "/broadcast/live-register",
      //   name: "register-live",
      //   component: () => import("@/views/broadcast/register-live.vue")
      // }
    ],
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
    path:"/", 
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
