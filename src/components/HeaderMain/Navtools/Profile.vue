<template>
  <Dropdown classMenuItems=" w-[180px] top-[58px] ">
    <div class="flex items-center">
      <div class="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div class="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img v-if="isLoggedIn" :src="profileImg" alt="Profile Image" class="block w-full h-full object-cover rounded-full"/>
          <Icon v-else icon="heroicons-outline:login"/>
        </div>
      </div>
      <div class="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span class="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block" @click="isLoggedIn ? null : login()">          
          {{ isLoggedIn ? user.name : '로그인하세요' }}
        </span>
        <span class="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]"
          ><Icon icon="heroicons-outline:chevron-down" ></Icon
        ></span>
      </div>
    </div>
    <template #menus>
      <MenuItem v-slot="{ active }" v-for="(item, i) in filteredMenu" :key="i">
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

<script>
import { MenuItem } from "@headlessui/vue";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import profileImg from "@/assets/images/all-img/user.png";
import defaultProfileImg from "@/assets/images/all-img/default-user.png";

export default {
  components: {
    Icon,
    Dropdown,
    MenuItem,
  },
  data() {
    return {
      isLoggedIn: false,
      user: {},
      profileImg,
      defaultProfileImg,
      ProfileMenu: [
        {
          label: "프로필",
          icon: "heroicons-outline:user",
          link: () => {
            this.$router.push("profile");
          },
          requiresAuth: true,
        },
        {
          label: "주문 내역",
          icon: "heroicons-outline:clipboard-list",
          link: () => {
            this.$router.push("order-list");
          },
          requiresAuth: true,
        },
        {
          label: "설정",
          icon: "heroicons-outline:cog",
          link: () => {
            this.$router.push("settings");
          },
          requiresAuth: true,
        },
        {
          label: "대시보드",
          icon: "heroicons-outline:home",
          link: () => {
            this.$router.push("dashboard");
          },
          requiresAuth: true,
        },
        {
          label: "Logout",
          icon: "heroicons-outline:logout",
          link: () => {
            this.logout();
          },
          requiresAuth: true,
        },
      ],
    };
  },
  methods: {
    checkLoginStatus() {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    logout() {
      sessionStorage.removeItem('user');
      this.isLoggedIn = false;
      this.user = {};
      this.$router.push("/");
    },
    login() {
      this.$router.push("/member/login");
    },
  },
  mounted() {
    this.checkLoginStatus();
  },
  computed: {
    filteredMenu() {
      return this.ProfileMenu.filter(item => item.requiresAuth === this.isLoggedIn);
    }
  }
};
</script>


<style lang="scss" scoped>
/* 추가적인 스타일링이 필요하면 여기에 작성하세요 */
</style>
