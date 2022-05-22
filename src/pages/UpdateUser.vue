<template>
  <div class="flex-center">
    <div class="q-pa-md q-ma-xl q-py-lg q-px-md bg-grey-1">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md text-center"
      >
        <q-input
          filled
          v-model="firstName"
          label="نام *"
          hint="Name and surname"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          style="text-align: right"
          filled
          inline
          v-model="lastName"
          label="نام خانوادگی *"
          hint="family name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-select
          filled
          v-model="province"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="provinceOptions"
          @update:model-value="
            (val) => {
              provinceChanged(val);
            }
          "
          @filter="filterFn"
          label="استان خود را انتخاب کنید"
          hint="province"
          style="text-align: right !important"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                استان مورد نظر وجود ندارد
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <br />

        <q-select
          filled
          v-model="city"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="cityOptions"
          @update:model-value="
            (val) => {
              cityChanged(val);
            }
          "
          @filter="filterFn2"
          label="شهر خود را انتخاب کنید"
          hint="city"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section v-if="province" class="text-grey">
                شهر مورد نظر وجود ندارد
              </q-item-section>
              <q-item-section v-else class="text-grey">
                ابتدا استان خود را مشخص کنید
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <br />

        <q-select
          filled
          v-model="major"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="majorOptions"
          @update:model-value="
            (val) => {
              majorChanged(val);
            }
          "
          @filter="filterFn3"
          label="رشته خود را انتخاب کنید"
          hint="major"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                رشته مورد نظر وجود ندارد
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <br />

        <q-select
          filled
          v-model="gender"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="genderOptions"
          @update:model-value="
            (val) => {
              genderChanged(val);
            }
          "
          @filter="filterFn4"
          label="جنسیت"
          hint="gender"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> بدون نتیجه </q-item-section>
            </q-item>
          </template>
        </q-select>
        <br />

        <div>
          <q-btn label="Submit" @click="onSubmit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>


<script>
import { useQuasar } from "quasar";
import { ref, onBeforeMount, reactive, onMounted } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const user = reactive([]);
    const id = ref(0);
    const firstName = ref(null);
    const lastName = ref(null);
    const province = ref(null);
    const provinces = reactive([]);
    // this variable used to store provinces.title
    const provincesTitle = reactive([]);
    const provinceOptions = ref(provinces);
    const city = ref(null);
    const cities = reactive([]);
    // this variable used to store cities.title
    const citiesTitle = reactive([]);
    const shahr_id = ref(0);
    const cityOptions = ref(cities);
    const major = ref(null);
    const majors = reactive([]);
    // this variable used to store majors.title
    const majorsTitle = reactive([]);
    const major_id = ref(0);
    const majorOptions = ref(majors);
    const gender = ref(null);
    const genders = reactive([]);
    // this variable used to store genders.title
    const gendersTitle = reactive([]);
    const gender_id = ref(0);
    const genderOptions = ref(genders.value);
    // this variable is used to store specific cities that is for user's province
    const selectedCities = reactive([]);
    const accept = ref(false);

    onMounted(() => {
      // user.value = $q.cookies.get("user");
      user.value = JSON.parse(localStorage.getItem("user"));
      id.value = user.value.id;
      firstName.value = user.value.first_name;
      lastName.value = user.value.last_name;
      province.value = user.value.province;
      if (user.value.shahr) {
        city.value = user.value.shahr.title;
        shahr_id.value = user.value.shahr.id;
      }
      if (user.value.major) {
        major.value = user.value.major.title;
        major_id.value = user.value.major.id;
      }
      if (user.value.gender) {
        gender.value = user.value.gender.title;
        gender_id.value = user.value.gender.id;
      }
      if (
        firstName.value &&
        lastName.value &&
        major_id.value &&
        gender_id.value &&
        shahr_id.value
      ) {
        accept.value = true;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        onSubmit();
      }
    });

    function getData() {
      api.get("/megaroute/getUserFormData").then((res) => {
        genders.value = res.data.data.genders;
        for (let index = 0; index < genders.value.length; index++) {
          gendersTitle.push(genders.value[index].title);
        }
        majors.value = res.data.data.majors;
        for (let index = 0; index < majors.value.length; index++) {
          majorsTitle.push(majors.value[index].title);
        }
        provinces.value = res.data.data.provinces;
        for (let index = 0; index < provinces.value.length; index++) {
          provincesTitle.push(provinces.value[index].title);
        }
        cities.value = res.data.data.cities;
      });
    }

    getData();

    function provinceChanged(e) {
      province.value = e;
      citiesTitle.splice(0);
      city.value = null;
      let selectedProvince = provinces.value.filter(
        (province) => province.title == e
      );
      selectedCities.value = cities.value.filter(
        (city) => city.province.title == selectedProvince[0].title
      );
      for (let index = 0; index < selectedCities.value.length; index++) {
        citiesTitle.push(selectedCities.value[index].title);
      }
    }
    function cityChanged(e) {
      city.value = e;
      let selectedcity = cities.value.filter((city) => city.title == e);
      shahr_id.value = selectedcity[0].id;
    }
    function majorChanged(e) {
      major.value = e;
      let selectedmajor = majors.value.filter((major) => major.title == e);
      major_id.value = selectedmajor[0].id;
    }
    function genderChanged(e) {
      gender.value = e;
      let selectedgender = genders.value.filter((gender) => gender.name == e);
      gender_id.value = selectedgender[0].id;
    }

    function onSubmit() {
      if (accept.value !== true) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to complete all the fields",
        });
      } else {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
        editUser();
      }
    }
    function onReset() {
      province.value = null;
      city.value = null;
      major.value = null;
      gender.value = null;
      accept.value = false;
    }

    function editUser() {
      const userUpdated = {
        first_name: firstName.value,
        last_name: lastName.value,
        major_id: major_id.value,
        gender_id: gender_id.value,
        shahr_id: shahr_id.value,
        grade_id: 0,
        _method: "PUT",
      };
      api
        .post(`/user/${id.value}`, userUpdated)
        .then((res) => {
          user.value = res.data.data;
          user.value.province = province.value;
          // $q.cookies.set("user", user.value);
          localStorage.setItem("user", JSON.stringify(user.value));
          router.push("/Profile");
        })
        .catch((err) => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
          console.log(err);
        });
    }

    return {
      user,
      id,
      firstName,
      lastName,
      province,
      provinces,
      provincesTitle,
      provinceOptions,
      city,
      cities,
      citiesTitle,
      cityOptions,
      shahr_id,
      major,
      majors,
      majorsTitle,
      majorOptions,
      major_id,
      gender,
      genders,
      gendersTitle,
      genderOptions,
      gender_id,
      selectedCities,
      accept,
      getData,
      provinceChanged,
      cityChanged,
      majorChanged,
      genderChanged,
      onSubmit,
      onReset,

      filterFn(val, update) {
        if (val === "") {
          update(() => {
            provinceOptions.value = provincesTitle;

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          provinceOptions.value = provincesTitle.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },

      filterFn2(val, update) {
        if (val === "") {
          update(() => {
            cityOptions.value = citiesTitle;

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          cityOptions.value = citiesTitle.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },

      filterFn3(val, update) {
        if (val === "") {
          update(() => {
            majorOptions.value = majorsTitle;

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          majorOptions.value = majorsTitle.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      filterFn4(val, update) {
        if (val === "") {
          update(() => {
            genderOptions.value = gendersTitle;

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          genderOptions.value = gendersTitle.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>

<style>
</style>