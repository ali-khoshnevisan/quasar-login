<template>
  <div class="row justify-between" dir="rtl">
    <div class="section1 q-mx-md">
      <h5 class="text-right yekan">امتحان نهایی فیزیک تجربی</h5>
      <img src="..\assets\Group724.png" alt="pic" style="width: 100%" />
      <div class="row justify-between q-my-sm">
        <p dir="rtl" class="col-grow" style="font-size: 20px; width: 70%">
          10 راهکار رفع تنبلی و بی‌انگيزگي-جلسه يك
        </p>
        <div class="icon">
          <q-icon
            class="q-px-sm"
            name="bookmark_border"
            color="positive"
            size="30px"
            style="cursor: pointer"
          />
          <q-icon
            class="q-px-sm"
            name="share"
            color="positive"
            size="30px"
            style="cursor: pointer"
          />
        </div>
      </div>
      <p dir="rtl">
        تابلو راهنما، بررسی روند سوالات امتحان نهایی امتحان نهایی دین و زندگی
        دوازدهم-(نظام آموزشی جدید) (00-99) فیلم جلسه 0 - تابلو راهنما، بررسی
        روند سوالات امتحان نهایی امتحان نهایی دین و زندگی دوازدهم-(نظام آموزشی
        جدید) (00-99) فیلم ...
      </p>
    </div>
    <div class="section2 column q-mx-md">
      <h5 class="text-right yekan">لیست فیلم ها</h5>
      <keep-alive>
        <component :is="selectedComponent" />
      </keep-alive>
      <!-- <dropdownContainer /> -->
    </div>
  </div>
</template>

<script>
import dropdownContainer from "../components/dropdownContainer.vue";
export default {
  data() {
    return {
      selectedComponent: "dropdownContainer",
    };
  },
  components: {
    dropdownContainer,
  },
};
</script>

<style lang="scss" scoped>
p {
  font-family: yekan;
  font-size: 16px;
}
.section1 {
  width: 900px;
}
.section2 {
  width: 100%;
}
.icon {
  display: none;
}
@media (min-width: 351px) {
  .icon {
    display: block;
  }
}
@media (min-width: 577px) {
  .section1 {
    width: 55%;
  }
  .section2 {
    width: 100px;
    flex-grow: 1;
  }
}
</style>