// ReorderIcon.jsx
import React from "react";
// import { DragControls } from "framer-motion";
import { GrDrag } from "react-icons/gr";
export function ReorderIcon({ dragControls }) {
  return (
    <GrDrag
      onPointerDown={(event) => dragControls.start(event)}
      style={{ cursor: "grab" }}
    />
  );
}
