import React from 'react';
import useFetchWithCache from './useFetchWithCache';

const DataFetchingComponent = () => {
  const apiUrl = 'https://api.example.com/data';
  const cacheDuration = 5 * 60 * 1000; 
  const { data, loading, error, fetchData } = useFetchWithCache(apiUrl, cacheDuration);

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default DataFetchingComponent;
