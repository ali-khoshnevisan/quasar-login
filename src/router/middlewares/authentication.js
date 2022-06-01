export default function auth({ next, store }) {
    if (store.state.user.IsUserAuthenticated) {
        return next();
    }

    return next('/login');
}