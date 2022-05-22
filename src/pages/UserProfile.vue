<template>
  <div class="q-pa-md row items-start q-gutter-md flex-center">
    <q-card class="my-card">
      <img src="..\assets\download.png" />
      <q-card-actions align="right">
        <q-btn flat round color="teal" @click="goToUpdate()" icon="edit" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>

      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="tag" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.first_name }}</q-item-label>
            <q-item-label caption>نام</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="red" name="tag" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.last_name }}</q-item-label>
            <q-item-label caption>نام خانوادگی</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="amber" name="man" />
          </q-item-section>

          <q-item-section>
            <q-item-label v-if="user.gender">{{
              user.gender.title
            }}</q-item-label>
            <q-item-label caption>جنسیت</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="green" name="map" />
          </q-item-section>

          <q-item-section>
            <q-item-label v-if="user.shahr">{{
              user.shahr.title
            }}</q-item-label>
            <q-item-label caption>شهر</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="grey" name="book" />
          </q-item-section>

          <q-item-section>
            <q-item-label v-if="user.major">{{
              user.major.title
            }}</q-item-label>
            <q-item-label caption>رشته</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  name: "UserProfile",

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const user = reactive({
      first_name: "",
      last_name: "",
      gender: "",
      shahr: "",
      major: "",
    });
    onMounted(() => {
      // user.first_name = $q.cookies.get("user").first_name;
      // user.last_name = $q.cookies.get("user").last_name;
      // user.gender = $q.cookies.get("user").gender;
      // user.shahr = $q.cookies.get("user").shahr;
      // user.major = $q.cookies.get("user").major;
      user.first_name = JSON.parse(localStorage.getItem("user")).first_name;
      user.last_name = JSON.parse(localStorage.getItem("user")).last_name;
      user.gender = JSON.parse(localStorage.getItem("user")).gender;
      user.shahr = JSON.parse(localStorage.getItem("user")).shahr;
      user.major = JSON.parse(localStorage.getItem("user")).major;
    });
    function goToUpdate() {
      router.push("/update");
    }
    return {
      user,
      goToUpdate,
    };
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>
