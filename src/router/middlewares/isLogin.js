
export default function login({ next, router, store }) {
    console.log(store)
    if (!store.state.user.IsUserAuthenticated) {
        return next();
    }

    return next( '/profile' );
}
