import React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
// import { useRaisedShadow } from "./use-raised-shadow";

import { TbGridDots } from "react-icons/tb";
const Item = ({ item }) => {
  const y = useMotionValue(0);
  //   const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      id={item}
      style={y}
      dragListener={false}
      dragControls={dragControls}
    >
      <span
        onPointerDown={(event) => dragControls.start(event)}
        style={{ cursor: "grab" }}
      >
        <TbGridDots />
      </span>

      <p>{item}</p>
      <div className="checkbox-wrapper-2">
        <input type="checkbox" className="toogle-btn" />
      </div>
    </Reorder.Item>
  );
};

export { Item };
