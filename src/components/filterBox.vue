<template>
  <div>
    <div class="row justify-center q-my-lg">
      <div
        v-for="(major, index) in majors"
        :key="index"
        dir="rtl"
        :class="{ active1: major.isActive }"
        class="filter-box-1 row justify-around q-py-md"
        @click="
          getClass(index);
          changeMajor(major.id);
        "
      >
        <span>
          {{ major.title }}
        </span>
      </div>
    </div>
    <div dir="rtl" class="row justify-center q-py-md">
      <div
        v-for="(title, index) in titles"
        :key="index"
        @click="filterPlans(title.title, index)"
        :class="{ active2: title.isActive }"
        class="filter-box-2 row justify-around q-py-md q-px-sm"
      >
        <span>
          {{ title.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["titles"],
  setup(props, { emit }) {
    const majors = [
      { title: "ریاضی", id: 1, isActive: true },
      { title: "تجربی", id: 2, isActive: false },
      { title: "انسانی", id: 3, isActive: false },
    ];

    function getClass(index) {
      for (let i = 0; i < majors.length; i++) {
        majors[i].isActive = false;
      }
      majors[index].isActive = true;
    }

    function changeMajor(id) {
      emit("changeMajor", id);
    }

    function filterPlans(title, index) {
      emit("filterPlans", title, index);
    }

    return {
      majors,
      getClass,
      changeMajor,
      filterPlans,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter-box-1 {
  font-size: 20px;
  width: 100px;
  justify-items: center;
  background: #039be5;
  cursor: pointer;
}
.filter-box-1:hover {
  background: #0375ae;
}
.filter-box-1 > p {
  font-size: 20px;
}
.filter-box-2 {
  background: rgb(38, 183, 38);
  font-size: 15px;
  cursor: pointer;
}
.filter-box-2:hover {
  background: rgb(38, 124, 38);
}
.active1 {
  background: #0375ae;
}
.active2{
  background: rgb(26, 123, 26);
}
</style>