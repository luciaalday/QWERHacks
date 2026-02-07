import { FaMoon, FaRegMoon } from "react-icons/fa";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function Footer() {
  const [darkMode, setDarkMode] = useState(false);

  const updateBodyClass = (isDark) => {
    document.body.classList.toggle('darkmode', isDark);
    document.body.classList.toggle('lightmode', !isDark);
  };

  useEffect(() => {
    const storedDarkmode = Cookies.get('darkmode') === 'on';
    setDarkMode(storedDarkmode);
    updateBodyClass(storedDarkmode);
  }, []);


  const handleToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);

    if (newValue) {
      Cookies.set('darkmode', 'on', { expires: 365 });
    } else {
      Cookies.remove('darkmode');
    }

    updateBodyClass(newValue);
  };

  return (
    <footer>
      <p>&copy;2026</p>
      <button
        onClick={handleToggle}
        aria-label='Toggle dark mode'
        title={darkMode ? 'Turn off darkmode' : 'Turn on darkmode'}
        >
        {Cookies.get('darkmode') === 'on' ? <FaMoon size={20} /> : <FaRegMoon size={20} />}
      </button>
    </footer>
  )
}