import { useState } from "react";
import Item from "./Item";
export default function PackingList({
  packList,
  handleDeleteItems,
  handleToggleItem,
  handleClearList,
}) {
  const [action, setAction] = useState("input");
  let sortedList;
  if (action === "input") sortedList = packList;
  if (action === "description") {
    sortedList = [...packList].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }
  if (action === "stats")
    sortedList = [...packList].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  return (
    <div className="list">
      <ul>
        {sortedList.map((item) => (
          <Item
            item={item}
            handleDeleteItems={handleDeleteItems}
            handleToggleItem={handleToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="description">SORT BY DESCRIPTION</option>
          <option value="stats">SORT BY PACKED STATS</option>
        </select>
        <button className="" onClick={(e) => handleClearList()}>
          Clear List
        </button>
      </div>
    </div>
  );
}
