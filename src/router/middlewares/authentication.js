export default function auth({ next, store }) {
    if (store.getters['user/isAuthGetter']) {
        return next();
    }

    return next({name:'login'});
}