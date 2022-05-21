<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    const router = useRoute();
    onMounted(() => {
      store.dispatch("user/onStart");
    });
    watch(router, () => {
      store.dispatch("user/onStart");
    });
    return {};
  },
});
</script>
