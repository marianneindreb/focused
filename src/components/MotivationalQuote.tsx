import { useState, useEffect } from 'react';

interface Quote {
  text: string;
  author: string | null;
}

const MotivationalQuote: React.FC = () => {
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();

    fetch('https://type.fit/api/quotes', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data: Quote[]) => {
        const today = new Date();
        const dayOfYear = Math.floor(
          (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000,
        );
        const dailyIndex = dayOfYear % data.length;
        const { text, author } = data[dailyIndex];
        const newAuthor = author?.split(',')[0];
        setQuote(text);
        setAuthor(newAuthor || 'Unknown');
      })
      .catch((error) => {
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
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <div className="quote-wrapper">
          <p className="quote">{quote}</p>
          <p className="author"> {author}</p>
        </div>
      )}
    </div>
  );
};

export { MotivationalQuote };
