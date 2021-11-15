import { useEffect, useState } from "react";

const useApi = (axiosFunction, params) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axiosFunction(params)
      .then(({ data }) => {
        setResult(data);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [axiosFunction, params]);

  return { loading, error, result };
};

export default useApi;
