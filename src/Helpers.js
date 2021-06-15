export function isAuthentified () {
    return (localStorage.token !== undefined && localStorage.token !== null) &&
        (localStorage.user !== undefined && localStorage.user !== null);
}