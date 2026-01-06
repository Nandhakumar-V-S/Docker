import React from "react";
/*import { Spin } from 'antd';*/
import Spinner from "react-bootstrap/Spinner";

const PageLoader = () => {
  // Theme Color Switch Start
  const storedThemeColor = sessionStorage.getItem("themeColor");
  const defaultThemeColor = storedThemeColor || "#2f5fc9";
  return (
    <>
      {/* <div className="centerAbsolute">
            Loading...........
        </div> */}
      <div className="loading-screen">
        <Spinner
          animation="border"
          style={{
            borderColor: defaultThemeColor,
            borderRightColor: "transparent",
          }}
        />
        <p>Loading...</p>
      </div>
    </>
  );
};
export default PageLoader;



export const PageLoaderV1 = ({Text,className}) => {
  // Theme Color Switch Start
  const storedThemeColor = sessionStorage.getItem("themeColor");
  const defaultThemeColor = storedThemeColor || "#2f5fc9";
  return (
    <>
      <div className={`loading-screen ${className}`}>
        <Spinner
          animation="border"
          style={{
            borderColor: defaultThemeColor,
            borderRightColor: "transparent",
          }}
        />
        <p>{Text}</p>
      </div>
    </>
  );
};
