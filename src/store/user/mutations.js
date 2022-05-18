import { api } from "src/boot/axios";
import { Cookies } from 'quasar'

export function login(state, token) {
    state.IsUserAuthenticated = true;
    state.token = token;
    // Cookies.set('token', token, expires, 'Strict', true)
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
}
export function logout(state, ssrContext) {

    const cookies = process.env.SERVER
        ? Cookies.parseSSR(ssrContext)
        : Cookies // otherwise we're on client
    state.IsUserAuthenticated = false;
    state.token = '';
    api.defaults.headers.common["Authorization"] = "";
    cookies.remove('token', { sameSite: "Strict" })
    Cookies.remove("user");
}