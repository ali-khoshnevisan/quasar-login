// import { Cookies } from 'quasar'
import { api } from "src/boot/axios";


const state = {
    IsUserAuthenticated: false,
    token: "",
}

const getters = {
    isAuthGetter(state) {
        return state.IsUserAuthenticated;
    }
}

const mutations = {
    login(state, token) {
        state.IsUserAuthenticated = true;
        state.token = token;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = "Bearer " + token;
    },
    logout(state, ssrContext) {

        // const cookies = process.env.SERVER
        //     ? Cookies.parseSSR(ssrContext)
        //     : Cookies // otherwise we're on client
        state.IsUserAuthenticated = false;
        state.token = '';
        api.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // cookies.remove('token', { sameSite: "Strict" })
        // Cookies.remove("user");
    }
}

const actions = {
    onStart({ commit }, ssrContext) {
        // const cookies = process.env.SERVER
        //     ? Cookies.parseSSR(ssrContext)
        //     : Cookies // otherwise we're on client
        // let token = cookies.get('token');
        let token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.common['Authorization'] = "Bearer " + token;
            commit('login', token);
        }
        else {
            commit("logout");
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}