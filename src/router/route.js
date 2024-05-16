const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/Layout/main-index.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/main/index.vue') },
      { path: 'schedule', name: '일정표', component: () => import('@/views/main/schedule.vue') },
      { path: 'environment', name: '환경이야기', component: () => import('@/views/main/environment.vue') },
      { path: 'join-first', name: '회원가입구분', component: () => import('@/views/user/join-first.vue') },
      { path: 'join', name: '회원가입', component: () => import('@/views/user/join.vue') },
      { path: 'member/login', name: '일반회원로그인', component: () => import('@/views/user/login.vue') },
      { path: 'enterprise/join', name: '판매자로그인', component: () => import('@/views/enterprise/join.vue') },
      { path: 'login', name: '로그인', component: () => import('@/views/enterprise/login.vue') },
      { path: 'live-viewing', name: '라이브시청', component: () => import('@/views/broadcast/live-viewing.vue') },
      { path: 'success', name: '결제완료', component: () => import('@/components/Pay/SuccessView.vue') },
      { path: 'fail', name: '결제실패', component: () => import('@/components/Pay/FailView.vue') },
      { path: 'brandpay-test', name: '브랜드페이', component: () => import('@/components/Pay/tosspayments-brandpay-module.vue') },
      {
        path: '/live-viewing/:broadcastId',
        name: '방송시청',
        component: () => import('@/views/broadcast/live-viewing.vue')
      },
      { path: 'test', name: '테스트', component: () => import('@/views/test/test-openvidu.vue')},
      { path: 'test-viewer', name: '테스트시청자', component: () => import('@/views/test/test-viewer.vue')}
    ],
  },
  {
    path: '/',
    component: () => import('@/Layout/index.vue'),
    children: [
      { path: 'product-list', name: '상품목록', component: () => import('@/views/dashboard/product-list.vue') },
      { path: 'live-register', name: '라이브등록', component: () => import('@/views/broadcast/live-register.vue') },
      { path: 'shop-modify', name: '상점정보관리', component: () => import('@/views/dashboard/shop-modify.vue') },
      { path: 'product-category', name: '상품카테고리', component: () => import('@/views/dashboard/product-category.vue') },
      { path: 'product-statistics', name: '상품통계', component: () => import('@/views/dashboard/product-statistics.vue') },
      { path: 'broadcast-statistics', name: '방송통계', component: () => import('@/views/dashboard/broadcast-statistics.vue') },
      { path: 'review-statistics', name: '리뷰통계', component: () => import('@/views/dashboard/review-statistics.vue') },
      { path: 'live-prepare', name: '실시간 라이브 준비', component: () => import('@/views/dashboard/live-prepare.vue')},
      { path: 'user-info', name: '계정 정보 관리', component: () => import('@/views/dashboard/user-info.vue')},
    ],
  },
  {
    path: '/',
    component: () => import('@/Layout/user-index.vue'),
    children: [
      { path: 'order-list', name: '주문내역', component: () => import('@/views/mypage/order-list.vue') },
      { path: 'broadcast-history', name: '방송시청기록', component: () => import('@/views/mypage/broadcast-history.vue') },
      { path: 'member/edit-profile', name: '정보수정', component: () => import('@/views/mypage/edit-profile.vue') },
      { path: 'payment-register', name: '결제수단 등록', component: () => import('@/components/Pay/brandpay-register.vue') },
      { path: 'callback-auth', name: '결제수단 등록 성공', component: () => import('@/components/Pay/callback-auth.vue') }
    ]
  },
  { path: '/liveboard/:broadcastId', name: '라이브보드', component: () => import('@/views/broadcast/liveboard.vue') },
  { path: '/chat', name: 'chat', component: () => import('@/views/chat-view.vue') },

];

export default routes;