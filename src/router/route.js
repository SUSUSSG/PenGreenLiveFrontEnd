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
        name: "상품목록",
        component: () => import("@/views/dashboard/product-list.vue")
      },
      {
        path: "live-register",
        name: "live-register",
        component: () => import("@/views/broadcast/live-register.vue")
      },
      {
        path: "shop-modify",
        name: "상점 정보 입력",
        component: () => import("@/views/dashboard/shop-modify.vue")
      },
      {
        path: "product-category",
        name: "상품 카테고리 목록",
        component: () => import("@/views/dashboard/product-category.vue")
      }
    ]
  },
];

export default routes;
