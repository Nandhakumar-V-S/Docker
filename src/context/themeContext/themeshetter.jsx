import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "@/context/themeContext/themecontexts";
// img
// import { Image } from "react-bootstrap";
// import SunIcon from "../img/sun.png";
// import MoonIcon from "../img/moon.png";
import { BsSunFill } from "react-icons/bs";
import { WiMoonAltWaningCrescent3 } from "react-icons/wi";

export default function ThemeSetter() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(theme === "light");
  useEffect(() => {
    // Set the theme in session storage whenever it changes
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setChecked((prevChecked) => !prevChecked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <>
      <div className="theme-btn">
        <div className="checkbox-wrapper-54">
          <label className="switch">
            <input type="checkbox" checked={checked} onChange={toggle} />
            <span className="slider">
              {checked ? (
                <>
                  <WiMoonAltWaningCrescent3 />
                </>
              ) : (
                <>
                  <BsSunFill />
                </>
              )}
            </span>
          </label>
        </div>
      </div>
    </>
  );
}
