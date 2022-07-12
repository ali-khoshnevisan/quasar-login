export default function auth({ next, store }) {
    if (store.getters.isAuthGetter) {
        return next();
    }

    return next({name:'login'});
}