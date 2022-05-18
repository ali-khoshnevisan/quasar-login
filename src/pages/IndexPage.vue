<template>
  <q-page class="flex flex-center text-dark">
    <div class="bg-grey-1 text-center q-pa-xl">
      <h3>hello</h3>
      <h3 v-if="user.first_name">{{ user.first_name }} {{ user.last_name }}</h3>
    </div>
  </q-page>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useQuasar } from "quasar";
export default {
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const user = reactive({ first_name: "", last_name: "" });
    onMounted(() => {
      if ($q.cookies.get("user")) {
        user.first_name = $q.cookies.get("user").first_name;
        user.last_name = $q.cookies.get("user").last_name;
        // user.first_name = JSON.parse(localStorage.getItem("user")).first_name;
        // user.last_name = JSON.parse(localStorage.getItem("user")).last_name;
      }
    });
    return {
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-grey-1 {
  width: 50%;
  height: 60%;
  border: 2px solid black;
  border-radius: 0.9rem;
}
</style>