import React, { useState, useEffect } from "react";
import ThemeContext, { initialThemeState } from "@/context/themeContext/themecontexts";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialThemeState.theme);

  useEffect(() => {
    const savedThemeSession = sessionStorage.getItem("globalTheme");

    if (!!savedThemeSession) {
      setTheme(savedThemeSession);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("globalTheme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme--${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;