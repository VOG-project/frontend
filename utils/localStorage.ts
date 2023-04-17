const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

const setLocalStorage = (key: string, item: string) => {
  localStorage?.setItem(key, item);
};

const getLocalStorage = (key: string) => {
  return localStorage?.getItem(key);
};

const removeLocalStorage = (key: string) => {
  localStorage?.removeItem(key);
};

export { localStorage, setLocalStorage, getLocalStorage, removeLocalStorage };
