// EditPopup.jsx
import React from "react";
import { Popup } from "@grapecity/wijmo.react.input";
import "@grapecity/wijmo.styles/wijmo.css";

const EditPopup = ({ isVisible, item, onSave, onCancel, onChange }) => {
  console.log(isVisible, item);
  return (
    <Popup className="modal" fadeIn={isVisible} modal={true}>
      <div className="modal-content">
        <h3>Edit Item</h3>
        <label>
          Name:
          <input
            type="text"
            value={item?.name || ""}
            onChange={(e) => onChange({ ...item, name: e.target.value })}
          />
        </label>
        <label>
          Priority:
          <input
            type="text"
            value={item?.priority || ""}
            onChange={(e) => onChange({ ...item, priority: e.target.value })}
          />
        </label>
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </Popup>
  );
};

export default EditPopup;
