import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

export default function ReorderWidget({
  data,
  onReorder,
  handleRemove,
  handleSort,
  sortingShow,
  setSelectedColumnValue,
  selectedColumnValue,
}) {
  const [items, setItems] = useState([]);
  console.log(items);
  useEffect(() => {
    setItems(data);
  }, [data]);

  const handleReorder = (newOrder) => {
    const updatedItems = newOrder.map((item, index) => ({
      ...item,
      seqno: index + 1, // Update seqNo to reflect the new order
    }));
    setItems(updatedItems);
    onReorder(updatedItems); // Call the function passed from the parent to update the state
  };
  return (
    <Reorder.Group axis="y" onReorder={handleReorder} values={items}>
      {items.map((item) => (
        <Item
          key={item.value}
          item={item}
          handleRemove={handleRemove}
          handleSort={handleSort}
          sortingShow={sortingShow}
          setSelectedColumnValue={setSelectedColumnValue}
          selectedColumnValue={selectedColumnValue}
        />
      ))}
    </Reorder.Group>
  );
}
