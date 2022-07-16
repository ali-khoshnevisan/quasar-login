<template>
  <div>
    <filter-box
      :titles="titles"
      @changeMajor="changeMajor"
      @filterPlans="filterPlans"
    ></filter-box>
    <time-table
      :selectedMajorPlans="selectedMajorPlans"
      :filteredPlans="filteredPlans"
      :isFilter="isFilter"
      :dates="dates"
    ></time-table>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import StudyPlansData from "../assets/js/StudyPlansData";
import filterBox from "../components/filterBox.vue";
import timeTable from "../components/timeTable.vue";
import { onBeforeMount } from "@vue/runtime-core";
export default {
  setup() {
    const riaziTitles = reactive([]);
    const majorTitles = ref(null);
    const titles = ref([]);
    const dates = reactive([]);
    const sortedPlans = reactive([]);

    StudyPlansData.sort((a, b) => {
      let da = new Date(a.date);
      let db = new Date(b.date);
      return da - db;
    });
    StudyPlansData.forEach((e) => {
      sortedPlans.push(e);
    });
    const riaziPlans = reactive(sortedPlans.filter((e) => e.major.id == 1));
    const tajrobiPlans = reactive(sortedPlans.filter((e) => e.major.id == 2));
    const ensaniPlans = reactive([]);
    const selectedMajorPlans = ref(null);
    const filteredPlans = reactive([]);
    const isFilter = ref(false);

    for (let i = 0; i < sortedPlans.length; i++) {
      if (!dates.includes(sortedPlans[i].date)) {
        dates.push(sortedPlans[i].date);
      }
    }

    function setTitles(id) {
      let arr = StudyPlansData.filter((el) => el.major.id == id);
      majorTitles.value = [];
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (!majorTitles.value.includes(arr[i].title)) {
            majorTitles.value.push(arr[i].title);
          }
        }
      }
      if (id != 3) {
        for (let i = 0; i < majorTitles.value.length; i++) {
          titles.value[i] = [{ title: "", isActive: null }];
          titles.value[i].isActive = false;
          titles.value[i].title = majorTitles.value[i];
        }
      } else {
        titles.value = [];
      }
    }

    function changeMajor(id) {
      isFilter.value = false;
      selectedMajorPlans.value =
        id == 1 ? riaziPlans : id == 2 ? tajrobiPlans : ensaniPlans;
      setTitles(id);
    }

    function filterPlans(title, index) {
      isFilter.value = true;
      let arr = selectedMajorPlans.value.filter((el) => el.title === title);
      for (let i = 0; i < arr.length; i++) {
        let index = filteredPlans.indexOf(arr[i]);
        if (!filteredPlans.includes(arr[i])) {
          filteredPlans.push(arr[i]);
        } else {
          filteredPlans.splice(index, 1);
        }
      }
      if (filteredPlans.length == 0) {
        isFilter.value = false;
      }
      titles.value[index].isActive = !titles.value[index].isActive;
    }

    onBeforeMount(() => {
      (selectedMajorPlans.value = riaziPlans),
        (majorTitles.value = riaziTitles);
      setTitles(1);
    });

    return {
      riaziPlans,
      tajrobiPlans,
      dates,
      majorTitles,
      titles,
      selectedMajorPlans,
      filteredPlans,
      isFilter,
      changeMajor,
      filterPlans,
      setTitles,
    };
  },
  components: {
    filterBox,
    timeTable,
  },
};
</script>

<style lang="scss" scoped>
</style>