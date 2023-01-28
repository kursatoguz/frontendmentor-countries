import React from "react";
import { BsMoonFill } from "react-icons/bs";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [theme, setTheme] = useState("light-theme");
  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="text">
          <h1>Where in the world?</h1>
        </div>
        <div className="theme">
          <BsMoonFill className="moon icon" onClick={toggleTheme} />
          <p>Dark Mode</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
