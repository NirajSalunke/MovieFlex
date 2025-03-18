import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setdata] = useState<T | null>(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setloading(true);
      seterror(null);
      const response = await fetchFunction();
      setdata(response);
      setloading(false);
    } catch (err) {
      seterror(err instanceof Error ? err : new Error("An error Occured"));
    } finally {
      setloading(false);
    }
  };

  const reset = () => {
    setdata(null);
    seterror(null);
    setloading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
