import React, { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

const initialItems = ["A", "B", "C", "D", "E", "F", "G"];

export default function ReorderWidget() {
  const [items, setItems] = useState(initialItems);
  console.log(items);
  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items}>
      {items.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  );
}
