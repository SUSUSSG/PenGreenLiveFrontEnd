<template>
  <Dropdown classMenuItems="w-[180px] top-[58px]">
    <div class="flex items-center">
      <div class="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div class="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img v-if="isAuthenticated" :src="userProfileImg" alt="Profile Image" class="block w-full h-full object-cover rounded-full"/>
          <img v-else/>
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

const router = useRouter();
const store = useStore();
const defaultProfileImg = "https://kr.object.ncloudstorage.com/susussg-img-bucket/user-profile/default-img.png";

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
const userName = computed(() => store.getters['auth/userName']);
const userUUID = computed(() => store.getters['auth/userUUID']);
const userRole = computed(() => store.getters['auth/userRole'])
const profileImg = computed(() => store.getters['auth/profileImg']);
const userProfileImg = ref(null);

watch([userUUID, isAuthenticated], ([newUUID, isAuth]) => {
  console.log("isAuthenticated ", isAuthenticated.value);
  console.log("userUUID ", userUUID.value);
  console.log("userName ", userName.value);
  console.log("userRole ", userRole.value);
  console.log("userProfileImg", userProfileImg.value);
  

  if (isAuth && profileImg.value) {
    userProfileImg.value = profileImg.value; 
  } else {
    userProfileImg.value = defaultProfileImg;
  }
}, { immediate: true });

const filteredMenu = computed(() => {
  return [
    {
      label: "마이페이지",
      icon: "heroicons-outline:user",
      link: () => {
        router.push("/member/edit-profile");
      },
      requiresAuth: true,
    },
    {
      label: "대시보드",
      icon: "heroicons-outline:home",
      link: () => {
        router.push("review-statistics");
      },
      requiresAuth: true,
      requiredRole: 'VENDOR',
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
    ].filter(item => {
      if (item.requiresAuth && !isAuthenticated.value) {
        return false;
      }
      if (item.requiredRole && item.requiredRole !== userRole.value) {
        return false;
      }
      return true;
    });
});

function handleLogin() {
  router.push("/member/login");
}

</script>

<style lang="scss" scoped>
</style>
