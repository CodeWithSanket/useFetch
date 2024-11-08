import { useState, useEffect, useRef } from 'react';

const useFetchWithCache = (apiUrl, cacheDuration = 5 * 60 * 1000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isClickedRef = useRef(false);

  // Custom hook to fetch data from API or localStorage
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if cached data exists in localStorage
      const cachedData = JSON.parse(localStorage.getItem(apiUrl));

      // If button is clicked multiple times (cachedData exists), check cache expiration
      if (isClickedRef.current && cachedData) {
        const { data, timestamp } = cachedData;
        const now = new Date().getTime();

        // If cache is still valid, use it
        if (now - timestamp < cacheDuration) {
          console.log('Fetching from localStorage');
          setData(data);
          setLoading(false);
          return;
        } else {
          // Cache expired, remove it
          console.log('Cache expired. Fetching new data from API');
          localStorage.removeItem(apiUrl);
        }
      }

      // Fetch data from the API if no valid cache exists
      console.log('Fetching from API');
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Save result to localStorage with timestamp and set state
      localStorage.setItem(apiUrl, JSON.stringify({
        data: result,
        timestamp: new Date().getTime(),
      }));

      setData(result);
      isClickedRef.current = true; // Mark button as clicked for future caching
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetchWithCache;
