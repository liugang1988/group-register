/**
 * 本地存储
 */
const localStorage = window.localStorage;
const deserialize = (value) => {
    if (typeof value !== 'string') {
        return undefined;
    }
    try {
        return JSON.parse(value);
    } catch (e) {
        return value || undefined;
    }
};
export default {
    set(key, val) {
        if (val === undefined) {
            return localStorage.removeItem(key);
        }
        localStorage.setItem(key, JSON.stringify(val));
        return val;
    },
    get(key, defaultVal) {
        const val = deserialize(localStorage.getItem(key));
        return (val === undefined ? defaultVal : val);
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
};
