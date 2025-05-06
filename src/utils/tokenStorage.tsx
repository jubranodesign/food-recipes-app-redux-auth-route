const TOKEN_KEY = 'auth_token';

export function saveToken(token: string) {
    const encrypted = btoa(token);
    localStorage.setItem(TOKEN_KEY, encrypted);
}

export function getToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? atob(token) : null;
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export { }