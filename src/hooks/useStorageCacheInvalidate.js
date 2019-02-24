import useLocalStorage from './useLocalStorage';
import useSSE from './useSSE';

const useStorageCacheInvalidate = ({
  key,
  initialValue,
  url,
  canInvalidateCache
}) => {
  const [storedItem, setItem, removeItem] = useLocalStorage(key, initialValue);
  const [sseData, setSSEData] = useSSE(url);

  if (canInvalidateCache(sseData)) {
    removeItem();
    setSSEData();
  }

  return [storedItem, setItem];
};

export default useStorageCacheInvalidate;
