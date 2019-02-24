import { useRef, useEffect } from 'react';

const useSSE = (url, callback) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const source = new EventSource(url);

    source.onmessage = event => {
      savedCallback.current(event.data);
    };

    return () => {
      source.close();
    };
  }, [url]);
};

export default useSSE;
