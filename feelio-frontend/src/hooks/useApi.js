import { useEffect, useState } from "react";

const useApi = (axiosFunction, params, initial) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(initial);

  useEffect(() => {
    axiosFunction(params)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          
        
          setResult(data.body);
        }
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [axiosFunction, params]);

  return { loading, error, result };
};

export default useApi;
