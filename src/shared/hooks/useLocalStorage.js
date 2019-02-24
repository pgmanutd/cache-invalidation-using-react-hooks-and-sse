import { useState } from 'react';

import parseJSON from '../utils/parseJSON';

const removeItemFromLocalStorage = key => {
  localStorage.removeItem(key);
};

const addItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItemFromLocalStorage = (key, fallbackValue) => {
  return parseJSON(localStorage.getItem(key), fallbackValue);
};

const useLocalStorage = (key, initialValue) => {
  const [storedItem, setStoredItem] = useState(() => {
    return getItemFromLocalStorage(key, initialValue);
  });

  const setItem = item => {
    setStoredItem(item);

    addItemToLocalStorage(key, item);
  };

  const removeItem = () => {
    setStoredItem(initialValue);

    removeItemFromLocalStorage(key);
  };

  return [storedItem, setItem, removeItem];
};

export default useLocalStorage;
