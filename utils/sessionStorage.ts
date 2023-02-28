const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const setSessionStorage = (key: string, item: string) => {
  sessionStorage?.setItem(key, item);
};

const getSessionStorage = (key: string) => {
  return sessionStorage?.getItem(key);
};

const removeSessionStorage = (key: string) => {
  sessionStorage?.removeItem(key);
};

export {
  sessionStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
};
