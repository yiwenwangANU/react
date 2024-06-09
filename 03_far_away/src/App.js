import "./index.css";
import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function App() {
  const [packList, setPacklist] = useState(initialItems);

  function handleAddItems(item) {
    setPacklist((packList) => [...packList, item]);
  }

  function handleDeleteItems(id) {
    setPacklist((packList) => packList.filter((i) => i.id !== id));
  }

  function handleToggleItem(id) {
    setPacklist(
      (packList) =>
        packList.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
      // how to update the single item in a list base on the conditions
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        packList={packList}
        handleDeleteItems={handleDeleteItems}
        handleToggleItem={handleToggleItem}
      />
      <Stats packList={packList} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away👜</h1>;
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeHolder="items..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ packList, handleDeleteItems, handleToggleItem }) {
  return (
    <div className="list">
      <ul>
        {packList.map((item) => (
          <Item
            item={item}
            handleDeleteItems={handleDeleteItems}
            handleToggleItem={handleToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, handleDeleteItems, handleToggleItem }) {
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
function Stats({ packList }) {
  if (!packList.length)
    return (
      <p className="stats">
        <em>Start adding some items to you packing list 🚀</em>
      </p>
    );
  const itemNumber = packList.length;
  const itemPacked = packList.filter((i) => i.packed).length;
  return (
    <footer className="stats">
      <em>
        💼You have {itemNumber} items on your list, and you have packed{" "}
        {itemPacked} item({100 * (itemPacked / itemNumber).toFixed(2)}%).
      </em>
    </footer>
  );
}
export default App;
