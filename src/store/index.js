import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import user from "./modules/user"

// import user from './user'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state: {
      // sections: [
      //   { name: "سکشن یک", isActive: true },
      //   { name: "سکشن دو", isActive: true },
      //   { name: "سکشن سه", isActive: true },
      //   { name: "سکشن چهار", isActive: true },
      // ],
      // scrollTop: 0
    },
    getters: {
      // getSections(state) {
      //   return state.sections;
      // },
      // getScrollTop(state) {
      //   return state.scrollTop
      // },
    },
    mutations: {
      // showMenu(state, index) {
      //   state.sections[index].isActive = false;
      // },
      // hideMenu(state, index) {
      //   state.sections[index].isActive = true;
      // },
      // setScrollTop(state, position) {
      //   state.scrollTop = position
      // }
    },
    actions: {},
    modules: {
      user
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})


