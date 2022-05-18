<template>
  <q-layout view="hHh lpR fFf" class="bg-info">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Login page
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs v-if="!isAuth" align="left">
        <q-route-tab to="/login" label="Login" icon="login" />
      </q-tabs>

      <q-tabs v-else align="left">
        <q-route-tab to="/" label="Home" icon="home" />
        <q-route-tab to="/profile" label="Profile" icon="account_circle" />
        <q-route-tab
          @click="logoutUser()"
          to="/"
          label="logout"
          icon="logout"
        />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed, onMounted } from "vue";

import { useStore } from "vuex";

export default {
  setup() {
    // const isAuth = ref(null);
    const rightDrawerOpen = ref(false);
    const store = useStore();

    function logoutUser() {
      store.commit("user/logout");
      window.location.reload();
    }

    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      logoutUser,
      isAuth: computed(() => store.state.user.IsUserAuthenticated),
    };
  },
};
</script>