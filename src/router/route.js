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
  {
      path: "/liveboard",
      name: "Liveboard",
      component: () => import("@/views/broadcast/liveboard.vue")
  },
  {
    path: "/",
    component: () => import("@/Layout/user-index.vue"),
    children: [
      {
        path: "order-list",
        name: "주문내역",
        component: () => import("@/views/mypage/order-list.vue")
      }
    ],
  }
];
export default routes;