import router from "..";

export default function auth({ next, store }) {
    console.log(store)
    if (store.state.user.IsUserAuthenticated) {
        return next();
    }

    return next('/login');
}