import { createRouter, createWebHistory } from "vue-router";

import store from '@/store';
import routes from "./route";

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  base: import.meta.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to, from, next) => {
  // const titleText = to.name;
  // const words = titleText.split(" ");
  // const wordslength = words.length;
  // for (let i = 0; i < wordslength; i++) {
  //   words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  // }

  document.title = "SUSUSSG";

  next();
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      next({
        path: '/member/login',
        query: { redirect: to.fullPath },
      });
    } else if (to.matched.some(record => record.meta.role) && store.getters['auth/userRole'] !== to.meta.role) {
      alert('접근 권한이 없습니다.');
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
