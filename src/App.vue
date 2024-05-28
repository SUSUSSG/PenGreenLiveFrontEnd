<template>
  <router-view />
</template>

<script>
import { useThemeSettingsStore } from "@/store/themeSettings";
import { useStore } from 'vuex';

export default {
  mounted() {
    this.$store.themeSettingsStore = useThemeSettingsStore()
  },
  setup() {
    const store = useStore();
    const userState = store.getters['auth/isAuthenticated'];
    const userName = store.getters['auth/userName'];
    const userUUID = store.getters['auth/userUUID'];

    const logout = () => {
      store.dispatch('auth/logout');
    };

    return { userState, userName, userUUID, logout };
  },
}
</script>

<style></style>
