import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "@/context/themeContext/themecontexts";
import { WiMoonAltWaningCrescent3 } from "react-icons/wi";
import { LuSunMedium } from "react-icons/lu";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
export default function ThemeSetter1() {
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
      <OverlayTrigger
        placement="bottom"
        rootClose={true}
        // delay={{ show: 250, hide: 20000 }}
        overlay={
          <Tooltip className="theme-switch-toolitp">
            {checked ? "Switch Dark" : "Switch Light"}
          </Tooltip>
        }
      >
        <button onClick={toggle} className="theme-switch-btn">
          {checked ? <LuSunMedium /> : <WiMoonAltWaningCrescent3 />}
        </button>
      </OverlayTrigger>
    </>
  );
}
