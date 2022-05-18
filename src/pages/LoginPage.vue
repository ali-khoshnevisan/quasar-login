<template>
  <div class="flex-center">
    <div
      class="
        q-gutter-md
        rounded-borders
        text-center
        q-ma-xl q-py-lg q-px-md
        bg-grey-1
      "
    >
      <h4>login/sign up</h4>
      <q-input
        class="text-right"
        v-model="mobile"
        filled
        :rules="[(val) => !!val || 'Field is required']"
        hint="username"
      />
      <p v-if="errorMobile" style="color: red">
        {{ mobileError.a }} / {{ mobileError.b }}
      </p>

      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        hint="Password with toggle"
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <p v-if="errorPass" style="color: red">
        {{ passwordError.a }} / {{ passwordError.b }}
      </p>

      <q-btn
        :loading="loading"
        color="primary"
        @click="dologin()"
        style="width: 95%"
      >
        sign in
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
          Loading...
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    // const Mobile = ref(null);
    // const Password = ref(null);
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);
    const progress = ref(false);
    const errorMobile = ref(false);
    const errorPass = ref(false);
    const mobileError = reactive({ error_1: "", error_2: "" });
    const passwordError = reactive({ error_1: "", error_2: "" });

    function token(token) {
      store.commit("user/login", token);
    }
    function dologin() {
      // we set loading state
      loading.value = true;
      api
        .post("/login", {
          mobile: this.mobile,
          password: this.password,
        })
        .then((response) => {
          $q.cookies.set("user", response.data.data.user);
          token(response.data.data.access_token);
          $q.cookies.set("token", response.data.data.access_token, {
            sameSite: "Strict",
          });
          router.push("/profile");
        })
        .catch((error) => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
          if (error.response.data.errors.mobile) {
            errorMobile.value = true;
            mobileError.error_1 = error.response.data.errors.mobile[0];
            mobileError.error_2 = error.response.data.errors.mobile[1];
          }
          if (error.response.data.errors.nationalCode) {
            errorPass.value = true;
            passwordError.error_1 = error.response.data.errors.nationalCode[0];
            passwordError.error_2 = error.response.data.errors.nationalCode[1];
          }
        });
      // simulate a delay

      setTimeout(() => {
      // we're done, we reset loading state
      loading.value = false;
      }, 1000);
    }
    return {
      mobile:ref(""),
      password:ref(""),
      isPwd: ref(true),
      loading,
      progress,
      dologin,
      token,
      errorMobile,
      errorPass,
      mobileError,
      passwordError,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-grey-1 {
  border: 2px solid black;
  border-radius: 0.9rem;
}
</style>