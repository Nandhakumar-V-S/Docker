import React, { useContext, useEffect } from "react";
import ThemeContext from "@/context/themeContext/themecontexts";
import { WiMoonAltWaningCrescent3 } from "react-icons/wi";
import { LuSunMedium } from "react-icons/lu";

export default function ThemeSetter2() {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    // Set the theme in session storage whenever it changes
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <React.Fragment>
      <div className="theme-btn-group">
        <button
          onClick={() => setTheme("light")}
          className={`theme-switch-btn ${theme === "light" ? "active" : null}`}
        >
          <LuSunMedium /> Light Theme
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`theme-switch-btn ${theme === "dark" ? "active" : null}`}
        >
          <WiMoonAltWaningCrescent3 /> Dark Theme
        </button>
      </div>
    </React.Fragment>
  );
}
