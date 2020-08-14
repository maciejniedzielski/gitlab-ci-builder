import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETe";

interface FetchArgs {
  method: HttpMethod;
  url: string;
}

interface FetchResult<T> {
  response: T | null;
  error: Error | null;
  isLoading: boolean;
}

export default function useFetch<T>({
  method,
  url,
}: FetchArgs): FetchResult<T> {
  const { token } = useContext(AuthContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  useEffect(() => {
    async function makeRequest() {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers,
        });
        const data = await response.json();
        setResponse(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    makeRequest();
  }, []);

  return { response, error, isLoading };
}
