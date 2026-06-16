import { useState, useEffect } from 'react';
import { SystemInfo } from '../domain/SystemInfo';

interface UseSystemInfoProps {
  container: {
    getInfo: () => Promise<SystemInfo>;
  };
}

export function useSystemInfo({ container }: UseSystemInfoProps) {
  const [data, setData] = useState<SystemInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {   
    container.getInfo()
      .then(info => {
        setData(info);
        setIsLoading(false);
      })
      .catch(err => {
        setError(String(err));
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
}
