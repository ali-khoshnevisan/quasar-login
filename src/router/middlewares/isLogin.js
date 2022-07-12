export default function login({ next, store }) {
    if (!store.getters.isAuthGetter) {
        return next();
    }

    return next({ name: 'profile' });
}
