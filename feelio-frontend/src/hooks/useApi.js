import { useCallback, useRef, useState, useEffect } from "react";

const useApi = (axiosFunction, params, initial) => {
  let currInitial = useRef(initial);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(currInitial.current);

  const refresh = useCallback(() => {
    axiosFunction(params)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          if (Array.isArray(currInitial.current)) {
            setResult(Object.values(data.body));
          } else setResult(data.body);
        }
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [axiosFunction, params, currInitial]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { refresh, loading, error, result };
};

export default useApi;
