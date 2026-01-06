import React, { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

const Leads = ["Untouched", "Qualifing"];

export default function CallReorderWidget() {
  const [items, setItems] = useState(Leads);
  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items}>
      {items?.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  );
}
