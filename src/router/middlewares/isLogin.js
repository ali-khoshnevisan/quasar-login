export default function login({ next, store }) {
    if (!store.getters['user/isAuthGetter']) {
        return next();
    }

    return next({ name: 'profile' });
}
