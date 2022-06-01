<template >
  <div class="bg-grey-2 q-pl-sm" style=" ">
    <div
      class="sections q-px-md q-py-md"
      style="max-height:300px; border-radius: 15px"
    >
      <q-list
        v-for="(section, index) in sections"
        :key="index"
        class="list border-radius-inherit"
      >
        <q-expansion-item
          class="border-radius-inherit q-mb-sm"
          :label="section"
          header-class="grey-2"
        >
          <q-separator color="#3AB549" inset />
          <div
            class="q-mx-md"
            v-for="(session, index) in sessions"
            :key="index"
          >
            <ul>
              <li class="row justify-between">
                <p>
                  {{ session }}
                </p>
                <p>55:55</p>
              </li>
            </ul>
          </div>
        </q-expansion-item>
        <q-separator color="#E6E6E6" inset />
      </q-list>
    </div>
  </div>
  <!-- <div class="q-ma-md bg-grey-4">
    <div v-for="(section, index) in sections" :key="index" class="">
      <q-btn
        v-if="show"
        class="text-black btn"
        color="#f6f6f6"
        align="left"
        @click="showMenu()"
        style="width: 100%; overflow: auto"
        :label="section"
      >
      </q-btn>
    </div>
    <q-list
      v-else
      class="text-black q-py-md q-px-md text-right column bg-grey-1"
    >
      <p @click="showMenu()" style="cursor: pointer">{{ section }}</p>
      <q-separator class="q-mb-md" color="#3AB549" inset />
      <ul>
        <li
          v-for="(session, index) in sessions"
          :key="index"
          class="row justify-between"
        >
          <p>{{ session }}</p>
          <p>55:55</p>
        </li>
      </ul>
    </q-list>
    <q-separator class="q-mb-md" color="#E6E6E6" inset />
  </div> -->
</template>

<script>
import { reactive, ref } from "@vue/reactivity";

export default {
  setup() {
    const sections = reactive(["سکشن یک", "سکشن دو", "سکشن سه", "سکشن چهار"]);
    const sessions = reactive(["جلسه 1", "جلسه 2", "جلسه 3"]);
    const show = ref(true);
    function showMenu() {
      if (show.value) {
        show.value = false;
      } else {
        show.value = true;
      }
    }

    return {
      showMenu,
      show,
      sections,
      sessions,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: yekan;
  font-size: 16px;
}
ul {
  list-style-type: none;
  font-family: yekan;
  padding: 0;
  margin: 0;
}
li {
  padding-top: 15px;
  cursor: pointer;
}
li p:hover {
  color: #3ab549;
}
li:hover {
  color: #3ab549;
  list-style-type: disc;
  margin-right: 20px;
}
.sections {
  border-radius: 10px;
  background: #f6f6f6;
  overflow-y: scroll;
}

.sections::-webkit-scrollbar {
  width: 5px;
  justify-items: center;
}

.sections::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 5px;
}

.sections::-webkit-scrollbar-thumb {
  background: #3ab549;
  border-radius: 5px;
}
.sections::-webkit-scrollbar-track-piece:end {
  background: transparent;
  margin-bottom: 20px;
}

.sections::-webkit-scrollbar-track-piece:start {
  background: transparent;
  margin-top: 20px;
}
.q-expansion-item--expanded {
  background-color: rgb(255, 255, 255);
  box-shadow: 5px 5px 5px 5px rgb(198, 197, 197);
}
</style>