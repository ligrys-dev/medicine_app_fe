import { HTTPError } from 'ky';
import { useState } from 'react';

export const useErrorHandler = () => {
  const [error, setError] = useState<HTTPError | null>(null);

  const clearError = () => {
    setError(null);
  };

  const handleError = async (error: HTTPError) => {
    try {
      const responseBody = await error.response.json();
      console.error(error, responseBody);
      setError(responseBody);
    } catch (e) {
      console.error('Błąd podczas odczytywania danych z odpowiedzi:', e);
    }
  };

  return { error, clearError, handleError };
};
