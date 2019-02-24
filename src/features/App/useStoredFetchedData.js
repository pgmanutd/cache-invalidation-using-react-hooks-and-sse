import { useEffect } from 'react';

import { parseJSON } from '../../shared/utils';

import { useStorageCacheInvalidation, useFetch } from '../../shared/hooks';

const useStoredFetchedData = () => {
  const [storedItem, setItem] = useStorageCacheInvalidation({
    key: 'data',
    initialValue: null,
    url: 'http://localhost:3001/stream',
    canInvalidateCache: data =>
      !!parseJSON(data, { invalidateCache: false }).invalidateCache
  });
  const isCacheInvalidated = !storedItem;

  const { data, isLoading } = useFetch({
    url: 'https://reqres.in/api/users?delay=3',
    shouldFetch: isCacheInvalidated
  });

  useEffect(() => {
    if (isCacheInvalidated) {
      setItem(data);
    }
  }, [data]);

  return { storedItem, isCacheInvalidated, isLoading };
};

export default useStoredFetchedData;
