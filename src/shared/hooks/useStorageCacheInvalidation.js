import useLocalStorage from './useLocalStorage';
import useSSE from './useSSE';

const useStorageCacheInvalidation = ({
  key,
  initialValue,
  url,
  canInvalidateCache
}) => {
  const [storedItem, setItem, removeItem] = useLocalStorage(key, initialValue);

  useSSE(url, (data) => {
    if (canInvalidateCache(data)) {
      removeItem();
    }
  });

  return [storedItem, setItem];
};

export default useStorageCacheInvalidation;
