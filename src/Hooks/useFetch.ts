import { useState, useEffect } from 'react';
import { ApiResponse } from '../types/types';

function useFetch<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData: T = await response.json();
        setData(jsonData as T);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;