import DefaultAxios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';
import { useEffect, useState } from 'react';

/**
 * Axios Hook
 * @param config Axios Config
 * @param AxiosInstance Axios Instance
 * @returns Request Object
 */
export default function useAxios<T>(
  config: AxiosRequestConfig,
  AxiosInstance: AxiosStatic = DefaultAxios
) {
  const [fetchStatus, setFetchStatus] = useState<{
    loading: boolean;
    error: AxiosError | null;
    data: T | null;
  }>({
    loading: true,
    error: null,
    data: null,
  });

  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    AxiosInstance(config)
      .then((response: AxiosResponse) => {
        console.log(response);
        setFetchStatus((prev) => ({
          ...prev,
          loading: false,
          data: response.data,
        }));
      })
      .catch((error: AxiosError) => {
        setFetchStatus((prev) => ({
          ...prev,
          loading: false,
          error,
        }));
      });
  }, [AxiosInstance, config, trigger]);

  /**
   * 재요청 함수
   */
  const refetch = () => {
    setFetchStatus((prev) => ({
      ...prev,
      loading: true,
    }));

    setTrigger(Date.now());
  };

  return { ...fetchStatus, refetch };
}
