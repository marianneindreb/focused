//<FontAwesomeIcon icon="fa-light fa-moon" />
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const DarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem('selectedTheme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('selectedTheme', theme);
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
export { DarkMode };
