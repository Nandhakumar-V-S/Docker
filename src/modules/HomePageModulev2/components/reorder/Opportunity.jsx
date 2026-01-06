import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

const Opportunity = [
  "Most Engaged",
  "High Value",
  "High Probablity",
  "Very Low Response",
];

export default function OpportunityReorderWidget() {
  const [items, setItems] = useState(Opportunity);
  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items}>
      {items?.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  );
}
