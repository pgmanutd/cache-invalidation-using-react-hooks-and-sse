import { useState, useEffect } from 'react';

const useSSE = (url, initialData) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const source = new EventSource(url);

    source.onmessage = event => {
      setData(event.data);
    };

    return () => {
      source.close();
    };
  }, [url]);

  return [data, setData];
};

export default useSSE;
