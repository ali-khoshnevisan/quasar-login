<template >
  <div class="sections q-ma-md bg-grey-4 scroll">
    <!-- <div class="bg-grey-2 q-pl-sm" style=" ">
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
  </div> -->
    <div v-for="(section, index) in sections" :key="index" class="q-mt-md body">
      <div v-if="section.isActive">
        <q-btn
          class="btn text-black"
          color="#f6f6f6"
          align="left"
          @click="showMenu(index)"
          style="width: 100%; overflow: auto"
          :label="section.title"
        >
        </q-btn>
        <q-separator class="q-mt-md" color="#3AB549" inset />
      </div>
      <q-list
        v-else
        class="
          list
          text-black
          q-py-md q-px-md q-mx-md q-my-md
          text-right
          column
          bg-grey-1
          rounded-borders
        "
      >
        <p @click="hideMenu(index)" style="cursor: pointer">
          {{ section.title }}
        </p>
        <ul>
          <li
            v-for="(session, index) in section.sessions"
            :key="index"
            class="flex justify-between"
          >
            <p>{{ session.title }}</p>
            <p>{{ session.duration }}</p>
          </li>
        </ul>
      </q-list>
    </div>
  </div>
</template>

<script>
// import { scroll } from "quasar";
// const { getVerticalScrollPosition, setVerticalScrollPosition } = scroll;
export default {
  data() {
    return {
      sections: [],
      sessions: [],
    };
  },
  // computed: {
  //   getSections() {
  //     return this.$store.getters.getSections;
  //   },
  //   getScrollTop() {
  //     return this.$store.getters.getScrollTop;
  //   },
  // },
  methods: {
    // setScrollTop(position) {
    //   this.$store.commit("setScrollTop", position);
    // },
    generateTitle() {
      let title = "";
      let name = "abcdefghijklmnopqrstuvwxyz";
      let titleLength = Math.floor(Math.random() * name.length + 1);
      for (let j = 0; j < titleLength; j++) {
        title += name.charAt(Math.floor(Math.random() * name.length));
      }
      return title;
    },
    generateId(number, max) {
      let id = [];
      while (id.length < number) {
        let r = Math.floor(Math.random() * max);
        if (id.indexOf(r) === -1) id.push(r);
      }
      return id;
    },
    generateSessions() {
      let session = [];
      let numberOfSessions = Math.floor(Math.random() * 15 + 1);
      let id = this.generateId(numberOfSessions, 15);
      for (let i = 0; i < numberOfSessions; i++) {
        session[i] = { title: "", duration: "", id: 0 };
        session[i].title = this.generateTitle();
        let minutes = 59 - Math.floor(Math.random() * 59);
        let seconds = 59 - Math.floor(Math.random() * 59);
        session[i].duration = minutes.toString() + ":" + seconds.toString();
        session[i].id = id[i];
        if (session[i].id == 0) {
          session[i].title = "این جلسه وجود ندارد";
          session[i].duration = "00:00";
        }
      }
      return session;
    },
    generateSections() {
      let section = [];
      let numberOfSections = Math.floor(Math.random() * 10);
      let id = this.generateId(numberOfSections, 10);
      for (let i = 0; i < numberOfSections; i++) {
        let sessions = this.generateSessions();
        section[i] = { title: "", isActive: true, id: 0, sessions: [] };
        section[i].title = this.generateTitle();
        section[i].sessions = sessions;
        section[i].id = id[i];
        if (section[i].id == 0) {
          section[i].title = "این سکشن وجود ندارد";
          section[i].sessions = [
            { title: "این سشن وجود ندارد", duration: "00:00", id: 0 },
          ];
        }
      }
      return section;
    },
    showMenu(index) {
      this.sections[index].isActive = false;
    },
    hideMenu(index) {
      this.sections[index].isActive = true;
    },
  },
  mounted() {
    this.sections = this.generateSections();
    // const ele = document.getElementsByClassName("sections")[0];
    // setVerticalScrollPosition(ele, this.getScrollTop);
  },
  // beforeUnmount() {
  //   const ele = document.getElementsByClassName("sections")[0];
  //   this.setScrollTop(getVerticalScrollPosition(ele));
  // },
};
// setup() {
//   const sections = reactive([
//     { name: "سکشن یک", isActive: true },
//     { name: "سکشن دو", isActive: true },
//     { name: "سکشن سه", isActive: true },
//     { name: "سکشن چهار", isActive: true },
//   ]);
//   const sessions = reactive(["جلسه 1", "جلسه 2", "جلسه 3"]);
//   function showMenu(id) {
//     sections[id].isActive = false;
//   }
//   function hideMenu(id) {
//     sections[id].isActive = true;
//   }

//   return {
//     showMenu,
//     hideMenu,
//     sections,
//     sessions,
//   };
// },
</script>

<style lang="scss" scoped>
* {
  font-family: yekan;
  font-size: 16px;
}
.body > .list > ul {
  list-style-type: none;
  font-family: yekan;
  padding: 0;
  margin: 0;
}
.body > .list > ul > li {
  padding-top: 15px;
  cursor: pointer;
}
.body > .list > ul > li p:hover {
  color: #3ab549;
}
.body > .list > ul > li:hover {
  color: #3ab549;
  list-style-type: disc;
  margin-right: 20px;
}
.sections {
  border-radius: 15px;
  background: #f6f6f6;
  overflow-y: scroll;
  max-height: 400px;
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