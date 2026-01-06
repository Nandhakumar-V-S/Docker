// *******~ Import ~******** //
//? React
import React, { useContext } from "react";
//? Assets
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Table from "react-bootstrap/Table";
//? Components
import ThemeContext from "@/context/themeContext/themecontexts";
//? CSS
import "./css/listpage-table-loading.scss";
//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //

export const MySkeleton = (props) => {
  const { theme } = useContext(ThemeContext);
  const BaseColor = theme === "dark" ? "#02111f" : "#ebebeb";
  const AnimationColor = theme === "dark" ? "#001e3c" : "#f5f5f5";

  return (
    <>
      <Skeleton
        baseColor={BaseColor}
        highlightColor={AnimationColor}
        height={props.height}
        duration={1.5}
        width={props.width}
        count={props.count}
        wrapper={props.div}
        containerClassName={props.clsnme}
        circle={props.circle}
        borderRadius={props.radius}
      />
    </>
  );
};
