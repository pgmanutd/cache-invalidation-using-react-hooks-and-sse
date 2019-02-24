import React, { useEffect } from 'react';

import parseJSON from '../utils/parseJSON';

import useStorageCacheInvalidate from '../hooks/useStorageCacheInvalidate';
import useFetch from '../hooks/useFetch';

const App = () => {
  const [storedItem, setItem] = useStorageCacheInvalidate({
    key: 'data',
    initialValue: null,
    url: 'http://localhost:3001/stream',
    canInvalidateCache: data =>
      !!parseJSON(data, { invalidateCache: false }).invalidateCache
  });
  const cacheNotPresent = !storedItem;

  const { data, isLoading } = useFetch({
    url: 'https://reqres.in/api/users?delay=3',
    shouldFetch: cacheNotPresent
  });

  useEffect(() => {
    if (cacheNotPresent) {
      setItem(data);
    }
  }, [data]);

  return (
    <section>
      <pre>
        <code>
          {cacheNotPresent || isLoading
            ? 'Fetching data and updating cache...'
            : JSON.stringify(storedItem, null, 2)}
        </code>
      </pre>
    </section>
  );
};

export default App;
