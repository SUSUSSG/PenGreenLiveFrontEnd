<template>
  <Dropdown classMenuItems="w-[180px] top-[58px]">
    <div class="flex items-center">
      <div class="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div class="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img v-if="isAuthenticated" :src="profileImg" alt="Profile Image" class="block w-full h-full object-cover rounded-full"/>
          <Icon v-else icon="heroicons-outline:login"/>
        </div>
      </div>
      <div class="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span class="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block" @click="isAuthenticated ? null : handleLogin()">          
          {{ isAuthenticated ? userName : '로그인하세요' }}
        </span>
        <span class="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
    </div>
    <template #menus>
      <MenuItem v-for="(item, i) in filteredMenu" :key="i">
        <div
          type="button"
          :class="`${
            active
              ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-900 dark:text-slate-300'
              : 'text-slate-600 dark:text-slate-300'
          } `"
          class="inline-flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 first:rounded-t last:rounded-b font-normal cursor-pointer"
          @click="item.link()"
        >
          <div class="flex-none text-lg">
            <Icon :icon="item.icon" />
          </div>
          <div class="flex-1 text-sm">
            {{ item.label }}
          </div>
        </div>
      </MenuItem>
    </template>
  </Dropdown>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { MenuItem } from "@headlessui/vue";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import defaultProfileImg from "@/assets/images/all-img/user.png";  // 기본 이미지 경로

const router = useRouter();
const store = useStore();

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
const userName = computed(() => store.getters['auth/userName']);
const userUUID = computed(() => store.getters['auth/userUUID']);
const profileImg = ref(defaultProfileImg);

watch([userUUID, isAuthenticated], ([newUUID, isAuth]) => {
  console.log("isAuthenticated ", isAuthenticated.value);
  console.log("userUUID ", userUUID.value);
  console.log("userName ", userName.value);
  

  if (isAuth && newUUID) {
    profileImg.value = `/src/assets/images/users/user-1.jpg`; 
  } else {
    profileImg.value = defaultProfileImg;
  }
}, { immediate: true });

const filteredMenu = computed(() => {
  return [
    {
      label: "프로필",
      icon: "heroicons-outline:user",
      link: () => {
        router.push("profile");
      },
      requiresAuth: true,
    },
    {
      label: "주문 내역",
      icon: "heroicons-outline:clipboard-list",
      link: () => {
        router.push("order-list");
      },
      requiresAuth: true,
    },
    {
      label: "설정",
      icon: "heroicons-outline:cog",
      link: () => {
        router.push("settings");
      },
      requiresAuth: true,
    },
    {
      label: "대시보드",
      icon: "heroicons-outline:home",
      link: () => {
        router.push("dashboard");
      },
      requiresAuth: true,
    },
    {
      label: "Logout",
      icon: "heroicons-outline:logout",
      link: () => {
        store.dispatch('auth/logout');
        router.push("/");
      },
      requiresAuth: true,
    },
  ].filter(item => item.requiresAuth === isAuthenticated.value);
});

function handleLogin() {
  router.push("/member/login");
}

</script>

<style lang="scss" scoped>
</style>
