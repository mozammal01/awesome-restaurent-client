import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);
  return (
    <label className="swap swap-rotate">
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on"><Moon /></div>
      <div className="swap-off"><Sun /></div>
    </label>
  );
}

export default App
