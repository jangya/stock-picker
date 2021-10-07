import { localStoreKey } from "./constants";

export const getStorage = () => {
  return JSON.parse(localStorage.getItem(localStoreKey)) || [];
}

export const setStorage = (value) => {
  const preValue = getStorage();
  const newValue = [...preValue, value];
  localStorage.setItem(localStoreKey, JSON.stringify(newValue));
}

export const removeStorage = () => {
  localStorage.removeItem(localStoreKey);
}
