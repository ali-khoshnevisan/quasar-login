<template>
  <div class="row q-mt-lg q-mx-lg">
    <q-scroll-area
      class="col-10"
      style="height: 80px"
      ref="timeRef"
      @scroll="onScrollTime"
    >
      <clock-component
        :d="d"
        :hr="hr"
        :min="min"
        :sec="sec"
        :style="{ right: clockRight - 230 + 'px' }"
      >
      </clock-component>
      <div dir="rtl" class="time-shedule q-mt-lg row no-wrap">
        <div
          class="time"
          v-for="time in timeArray"
          :key="time"
          style="width: 200px; height: 40px"
        >
          <div class="circle text-center">
            {{ time }}
          </div>
          <hr class="rotate" />
        </div>
      </div>
    </q-scroll-area>
    <div class="col q-ml-sm border text-center">
      <p class="q-mt-lg">هفته/ساعت</p>
    </div>
    <q-scroll-area class="col-10" ref="planRef" @scroll="onScrollPlan">
      <div
        class="row no-wrap plan-row q-mt-sm"
        style="width: 4800px; height: 25px"
        v-for="date in dates"
        :key="date"
        dir="rtl"
      >
        <div v-if="!isFilter">
          <div
            class="plan border q-pr-sm"
            v-for="plan in selectedMajorPlans.filter((el) => el.date === date)"
            :key="plan.id"
            :style="{
              background: plan.backgroundColor,
              right: calculateRight(plan) + 'px',
              width: claculatewidth(plan) + 'px',
            }"
          >
            {{ plan.title }}
          </div>
        </div>
        <div v-else>
          <div
            class="plan border q-pr-sm"
            v-for="plan in filteredPlans.filter((el) => el.date === date)"
            :key="plan.id"
            :style="{
              background: plan.backgroundColor,
              right: calculateRight(plan) + 'px',
              width: claculatewidth(plan) + 'px',
            }"
          >
            {{ plan.title }}
          </div>
        </div>
      </div>
    </q-scroll-area>
    <q-scroll-area
      class="col q-ml-sm"
      style="height: 450px"
      dir="rtl"
      ref="dateRef"
      @scroll="onScrollDate"
    >
      <div
        v-for="date in persianDates"
        :key="date"
        class="q-mt-sm text-center border"
        style="height: 25px"
      >
        {{ date[0] }}
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "@vue/runtime-core";
import clockComponent from "./clockComponent.vue";
export default {
  props: ["selectedMajorPlans", "filteredPlans", "isFilter", "dates"],
  setup(props) {
    const persianDates = reactive([]);
    const timeRef = ref(null);
    const planRef = ref(null);
    const dateRef = ref(null);
    const timeArray = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23,
    ];
    const d = ref(null);
    const hr = ref(null);
    const min = ref(null);
    const sec = ref(null);
    const clockRight = ref(null);

    setInterval(() => {
      d.value = new Date(); //object of date()
      hr.value = d.value.getHours();
      min.value = d.value.getMinutes();
      sec.value = d.value.getSeconds();
      clockRight.value = (hr.value + min.value / 60) * 200;
    }, 1000);

    let ignoreSource;

    function scrollX(source, position) {
      if (ignoreSource === source) {
        ignoreSource = null;
        return;
      }

      ignoreSource = source === "time" ? "plan" : "time";

      const areaRef = source === "time" ? planRef : timeRef;

      areaRef.value.setScrollPosition("horizontal", position);
    }

    function scrollY(source, position) {
      if (ignoreSource === source) {
        ignoreSource = null;
        return;
      }

      ignoreSource = source === "date" ? "plan" : "date";

      const areaRef = source === "date" ? planRef : dateRef;

      areaRef.value.setScrollPosition("vertical", position);
    }

    function toSeconds(time_str) {
      let parts = time_str.split(":");
      return (
        parts[0] * 3600 + //hours
        parts[1] * 60 + //minuets
        parts[2] * 1 // seconds
      );
    }
    function claculatewidth(plan) {
      let difference = toSeconds(plan.end) - toSeconds(plan.start);
      let width = (difference / 3600) * 200;
      return width;
    }
    function calculateRight(plan) {
      let distance = (toSeconds(plan.start) / 3600) * 200;
      return distance;
    }

    function miladi_be_shamsi(gy, gm, gd) {
      var g_d_m, jy, jm, jd, gy2, days;
      g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      gy2 = gm > 2 ? gy + 1 : gy;
      days =
        355666 +
        365 * gy +
        ~~((gy2 + 3) / 4) -
        ~~((gy2 + 99) / 100) +
        ~~((gy2 + 399) / 400) +
        gd +
        g_d_m[gm - 1];
      jy = -1595 + 33 * ~~(days / 12053);
      days %= 12053;
      jy += 4 * ~~(days / 1461);
      days %= 1461;
      if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
      }
      if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
      } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
      }
      return [jy + "/" + jm + "/" + jd];
    }

    onMounted(() => {
      for (let i = 0; i < props.dates.length; i++) {
        let date_convert_y = parseInt(props.dates[i].substr(0, 4));
        let date_convert_m = parseInt(props.dates[i].substr(5, 2));
        let date_convert_d = parseInt(props.dates[i].substr(8, 2));
        persianDates.push(
          miladi_be_shamsi(date_convert_y, date_convert_m, date_convert_d)
        );
      }
    });

    return {
      d,
      hr,
      min,
      sec,
      clockRight,
      timeRef,
      planRef,
      dateRef,
      timeArray,
      persianDates,
      claculatewidth,
      calculateRight,
      miladi_be_shamsi,
      onScrollPlan({ horizontalPosition, verticalPosition }) {
        scrollX("plan", horizontalPosition);
        scrollY("plan", verticalPosition);
      },

      onScrollTime({ horizontalPosition }) {
        scrollX("time", horizontalPosition);
      },

      onScrollDate({ verticalPosition }) {
        scrollY("date", verticalPosition);
      },
    };
  },
  components: {
    clockComponent,
  },
};
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid grey;
}
.plan-row {
  position: relative;
  background: rgb(240, 195, 195);
}
.time-shedule {
  background: linear-gradient(to right, #3e5480, #039be5);
}
.rotate {
  transform: rotate(90deg);
  width: 40px;
  margin-top: -13px;
}
.time {
  border-left: 2px solid red;
}
.circle {
  width: 30px;
  border: 1px solid black;
  border-radius: 50%;
  padding: 5px;
  background: white;
  margin-right: -15px;
}
.plan {
  position: absolute;
  border-radius: 10px;
}
</style>