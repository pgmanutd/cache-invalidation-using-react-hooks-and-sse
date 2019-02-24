import React from 'react';

import useStoredFetchedData from './useStoredFetchedData';

const App = () => {
  const { storedItem, isCacheInvalidated, isLoading } = useStoredFetchedData();

  return (
    <section>
      <pre>
        <code>
          {isCacheInvalidated || isLoading
            ? 'Fetching data and updating cache...'
            : JSON.stringify(storedItem, null, 2)}
        </code>
      </pre>
    </section>
  );
};

export default App;
