import { useState, useEffect } from 'react';

const MotivationalQuote = () => {
  const [quote, setQuote] = useState<string>('');
  const [error, setError] = useState<null | string>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://zenquotes.io/api/today', { signal, mode: 'no-cors' })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.length) {
          setQuote(data[0]?.q);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.name !== 'AbortError') {
          setError("Something went wrong getting today's quote");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="quote-container widget-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h2>Today's Motivational Quote</h2>
      <p>{quote}</p>
    </div>
  );
};

export { MotivationalQuote };
