export const setLocalStorage = (key, value) => {
  if (value && typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value)); // convert arrays or objects into strings
  }
}

export const getItem = (key) => {
  return JSON?.parse(localStorage?.getItem(key));
}