export function getPersistedAccessToken() {
    return localStorage.getItem('access_token') || '';
}

export function persistAccessToken(accessToken = '') {
    localStorage.setItem('access_token', accessToken);
    return accessToken;
}

export function persistUser(user = {}) {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

export function getPersistedUser() {
    return JSON.parse(localStorage.getItem('user')) || undefined;
}

export function removePersistedUser() {
    localStorage.removeItem('user');
    return undefined;
}


export function removePersistedAccessToken() {
    localStorage.removeItem('access_token');
    return '';
}
