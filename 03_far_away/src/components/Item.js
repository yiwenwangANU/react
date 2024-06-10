export default function Item({ item, handleDeleteItems, handleToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={(e) => handleToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={(e) => handleDeleteItems(item.id)}>❌</button>
    </li>
  );
}
