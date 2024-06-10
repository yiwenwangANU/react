export default function Stats({ packList }) {
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
