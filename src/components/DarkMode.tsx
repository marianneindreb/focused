import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const LOCALSTORAGE_KEY = 'selectedTheme';

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(LOCALSTORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="dark-mode">
      <button className="dark-mode-toggle" onClick={toggleTheme}>
        <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} size="2x" />
      </button>
    </div>
  );
};
export { DarkModeToggle };
