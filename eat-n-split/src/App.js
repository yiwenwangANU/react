import { useState } from "react";
import "./index.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendsData, setFriendsData] = useState(initialFriends);
  const [selectedId, setSelectedId] = useState("");

  function handleBalanceUpdate(id, AdditionalBalance) {
    const newFriendsData = friendsData.map((friend) =>
      friend.id === id
        ? { ...friend, balance: friend.balance + AdditionalBalance }
        : friend
    );
    setFriendsData(newFriendsData);
  }
  return (
    <>
      <FriendList friendsData={friendsData} setSelectedId={setSelectedId} />
      <AddFriendForm
        friendsData={friendsData}
        setFriendsData={setFriendsData}
      />
      <SplitBill
        friendsData={friendsData}
        handleBalanceUpdate={handleBalanceUpdate}
        selectedId={selectedId}
      />
    </>
  );
}

function FriendList({ friendsData, setSelectedId }) {
  return friendsData.map((friendData) => (
    <Friend friendData={friendData} setSelectedId={setSelectedId} />
  ));
}

function Friend({ friendData, setSelectedId }) {
  return (
    <>
      <img src={friendData.image} alt={friendData.name} />
      <p>{friendData.name}</p>
      <p>
        You own {friendData.name} ${friendData.balance}
      </p>
      <button onClick={(e) => setSelectedId(friendData.id)}>Select</button>
      <br />
    </>
  );
}

function AddFriendForm({ friendsData, setFriendsData }) {
  const [friendFormOn, setFriendFormOn] = useState(false);
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/48");

  return friendFormOn ? (
    <>
      {" "}
      <span>Friend Name</span>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span>Image Url</span>
      <input
        type="text"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <br />
      <button
        onClick={(e) =>
          setFriendsData([
            ...friendsData,
            {
              id: Date.now(),
              name: name,
              image: imgUrl,
              balance: 0,
            },
          ])
        }
      >
        Add
      </button>
      <button onClick={(e) => setFriendFormOn(false)}>Close</button>
    </>
  ) : (
    <button onClick={(e) => setFriendFormOn(true)}>Add friend</button>
  );
}

function SplitBill({ friendsData, handleBalanceUpdate, selectedId }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [payer, setPayer] = useState("you");

  const selectedFriend = friendsData.find((friend) => friend.id === selectedId);
  if (!selectedFriend) return;
  else {
    return (
      <>
        <h2>Split the bill with {selectedFriend.name}</h2>
        <span>Bill value </span>
        <input
          type="value"
          onChange={(e) => setBill(Number(e.target.value))}
          value={bill}
        />
        <br />
        <span>Your Expense </span>
        <input
          type="value"
          onChange={(e) => setYourExpense(Number(e.target.value))}
          value={yourExpense}
        />
        <br />
        <span>{selectedFriend.name} Expense </span>
        <input type="value" value={bill - yourExpense} />
        <br />
        <span>Who is paying the bill?</span>
        <select onChange={(e) => setPayer(e.target.value)}>
          <option value="you">You</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
        <br />
        <button
          onClick={(e) =>
            payer === "you"
              ? handleBalanceUpdate(selectedId, bill - yourExpense)
              : handleBalanceUpdate(selectedId, -yourExpense)
          }
        >
          Split Bill
        </button>
      </>
    );
  }
}
