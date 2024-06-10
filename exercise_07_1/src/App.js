import "./index.css";
import { useState } from "react";
const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [openedItem, setOpenedItem] = useState(null);

  function handleOpen(num) {
    setOpenedItem(num);
  }

  return (
    <div className="accordion">
      {data.map((e, i) => (
        <AccordionItem
          title={e.title}
          text={e.text}
          num={i}
          openedItem={openedItem}
          handleOpen={handleOpen}
        />
      ))}
    </div>
  );
}

function AccordionItem({ num, title, text, openedItem, handleOpen }) {
  // const [expand, setExpand] = useState(false);
  return (
    <div className={`item ${openedItem === num ? "open" : ""}`}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p
        className="icon"
        onClick={(e) =>
          openedItem === num ? handleOpen(null) : handleOpen(num)
        }
      >
        {openedItem === num ? "-" : "+"}
      </p>
      {openedItem === num ? <div className="content-box">{text}</div> : null}
    </div>
  );
}
