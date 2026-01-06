import React, { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

const Leads = ["Total Leads", "Active Leads", "Untouched Leads"];

export default function LeadReorderWidget() {
  const [items, setItems] = useState(Leads);
  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items}>
      {items?.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  );
}
