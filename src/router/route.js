import store from '@/store';


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
        name: "일정표",
        component: () => import("@/views/main/schedule.vue"),
      },
      {
        path: "environment",
        name: "환경이야기",
        component: () => import("@/views/main/environment.vue"),
      },
      {
        path: "join-first",
        name: "회원가입구분",
        component: () => import("@/views/user/join-first.vue"),
      },
      {
        path: "join",
        name: "회원가입",
        component: () => import("@/views/user/join.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters['auth/isAuthenticated']) {
            next('/');
          } else {
            next();
          }
        },
      },
      {
        path: "member/login",
        name: "일반회원로그인",
        component: () => import("@/views/user/login.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters['auth/isAuthenticated']) {
            next('/');
          } else {
            next();
          }
        },
      },
      {
        path: "enterprise/join",
        name: "판매자회원가입",
        component: () => import("@/views/enterprise/join.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters['auth/isAuthenticated']) {
            next('/');
          } else {
            next();
          }
        },
      },
      {
        path: "login",
        name: "판매자로그인",
        component: () => import("@/views/enterprise/login.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters['auth/isAuthenticated']) {
            next('/');
          } else {
            next();
          }
        },
      },
      {
        path: "live-viewing",
        name: "라이브시청",
        component: () => import("@/views/broadcast/live-viewing.vue"),
      },
      {
        path: "success",
        name: "결제완료",
        component: () => import("@/components/Pay/SuccessView.vue"),
        meta: { requiresAuth: true, role: 'USER' },
      },
      {
        path: "fail",
        name: "결제실패",
        component: () => import("@/components/Pay/FailView.vue"),
        meta: { requiresAuth: true, role: 'USER' },
      },
      {
        path: "brandpay/success",
        name: "브랜드페이결제완료",
        component: () => import("@/components/Pay/brandpay-success.vue"),
        meta: { requiresAuth: true, role: 'USER' },
      },
      {
        path: "brandpay/fail",
        name: "브랜드페이결제실패",
        component: () => import("@/components/Pay/brandpay-fail.vue"),
        meta: { requiresAuth: true, role: 'USER' },
      },
      {
        path: "brandpay-test",
        name: "브랜드페이",
        component: () =>
          import("@/components/Pay/tosspayments-brandpay-module.vue"),
        meta: { requiresAuth: true, role: 'USER' },
      },
      {
        path: "/live-viewing/:broadcastId",
        name: "방송시청",
        component: () => import("@/views/broadcast/live-viewing.vue"),
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
        component: () => import("@/views/dashboard/product-list.vue"),
        meta: { requiresAuth: true, role: 'VENDOR' },
      },
      {
        path: "live-register",
        name: "라이브등록",
        component: () => import("@/views/broadcast/live-register.vue"),
        meta: { requiresAuth: true, role: 'VENDOR' },
      },
      {
        path: "shop-modify",
        name: "상점정보관리",
        component: () => import("@/views/dashboard/shop-modify.vue"),
        meta: { requiresAuth: true, role: 'VENDOR' },
      },
      {
        path: "product-category",
        name: "상품카테고리",
        component: () => import("@/views/dashboard/product-category.vue"),
        meta: { requiresAuth: true, role: 'VENDOR' },
      },
      {
        path: "product-statistics",
        name: "상품통계",
        component: () => import("@/views/dashboard/product-statistics.vue"),
        meta: { requiresAuth: true, role: 'VENDOR' },
      },
      {
        path: "broadcast-statistics",
        name: "방송통계",
        component: () => import("@/views/dashboard/broadcast-statistics.vue"),
        meta: { requiresAuth: true, role: 'VENDOR' },
      },
      {
        path: "review-statistics",
        name: "리뷰통계",
        component: () => import("@/views/dashboard/review-statistics.vue"),
        meta: { requiresAuth: true, role: 'VENDOR' },
      },
      {
        path: "live-prepare",
        name: "라이브 예정 목록",
        component: () => import("@/views/broadcast/live-prepare.vue"),
        meta: { requiresAuth: true, role: 'VENDOR' },
      },
      {
        path: "user-info",
        name: "계정 정보 관리",
        component: () => import("@/views/dashboard/user-info.vue"),
        meta: { requiresAuth: true, role: 'VENDOR' },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/Layout/user-index.vue"),
    children: [
      {
        path: "order-list",
        name: "주문내역",
        component: () => import("@/views/mypage/order-list.vue"),
        meta: { requiresAuth: true, role: 'USER' },
      },
      {
        path: "broadcast-history",
        name: "방송시청기록",
        component: () => import("@/views/mypage/broadcast-history.vue"),
        meta: { requiresAuth: true, role: 'USER' },
      },
      {
        path: "member/edit-profile",
        name: "정보수정",
        component: () => import("@/views/mypage/edit-profile.vue"),
        meta: { requiresAuth: true, role: 'USER' },
      },
      {
        path: "payment-register",
        name: "결제수단 등록",
        component: () => import("@/components/Pay/brandpay-setting.vue"),
        meta: { requiresAuth: true, role: 'USER' },
      },
      {
        path: "subscription-settings",
        name: "채널 구독 관리",
        component: () => import("@/views/mypage/subscription-settings.vue"),
        meta: { requiresAuth: true, role: 'USER' },
      },
    ],
  },
  {
    path: "/liveboard/:broadcastId",
    name: "라이브보드",
    component: () => import("@/views/broadcast/liveboard.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/views/chat-view.vue"),
  },
  {
    path: "/daum-map",
    name: "우편번호 찾기",
    component: () => import("@/components/Map/map.vue"),
  },
];


export default routes;
