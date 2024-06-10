import "./index.css";
import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
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
  function handleClearList() {
    const confirmed = window.confirm("Delete all items?");
    if (confirmed) setPacklist((packList) => []);
  }
  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        packList={packList}
        handleDeleteItems={handleDeleteItems}
        handleToggleItem={handleToggleItem}
        handleClearList={handleClearList}
      />
      <Stats packList={packList} />
    </div>
  );
}

export default App;
