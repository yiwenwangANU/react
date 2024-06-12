import { useState } from "react";
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
    <div className="app">
      <div className="sidebar">
        <FriendList friendsData={friendsData} setSelectedId={setSelectedId} />

        <AddFriendForm
          friendsData={friendsData}
          setFriendsData={setFriendsData}
        />
      </div>
      <SplitBill
        friendsData={friendsData}
        handleBalanceUpdate={handleBalanceUpdate}
        selectedId={selectedId}
      />
    </div>
  );
}

function FriendList({ friendsData, setSelectedId }) {
  return (
    <ul>
      {friendsData.map((friendData) => (
        <Friend friendData={friendData} setSelectedId={setSelectedId} />
      ))}
    </ul>
  );
}

function Friend({ friendData, setSelectedId }) {
  return (
    <li>
      <img src={friendData.image} alt={friendData.name} />
      <h3>{friendData.name}</h3>
      {friendData.balance > 0 && (
        <p className="green">
          {friendData.name} own you ${friendData.balance}
        </p>
      )}
      {friendData.balance === 0 && (
        <p className="grey">You and your friend is even</p>
      )}
      {friendData.balance < 0 && (
        <p className="red">
          you own {friendData.name} ${friendData.balance}
        </p>
      )}
      <button className="button" onClick={(e) => setSelectedId(friendData.id)}>
        Select
      </button>
      <br />
    </li>
  );
}

function AddFriendForm({ friendsData, setFriendsData }) {
  const [friendFormOn, setFriendFormOn] = useState(false);
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/48");

  return friendFormOn ? (
    <form className="form-add-friend">
      {" "}
      <label>🎉Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>✨Image Url</label>
      <input
        type="text"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <br />
      <button
        className="button"
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
      <button className="button" onClick={(e) => setFriendFormOn(false)}>
        Close
      </button>
    </form>
  ) : (
    <button className="button" onClick={(e) => setFriendFormOn(true)}>
      Add friend
    </button>
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
      <form className="form-split-bill">
        <h2>Split the bill with {selectedFriend.name}</h2>
        <label>💸Bill value </label>
        <input
          type="value"
          onChange={(e) => setBill(Number(e.target.value))}
          value={bill}
        />

        <label>💲Your Expense </label>
        <input
          type="value"
          onChange={(e) => setYourExpense(Number(e.target.value))}
          value={yourExpense}
        />

        <label>🤑{selectedFriend.name} Expense </label>
        <input type="text" value={bill - yourExpense} disabled />

        <span>😥Who is paying the bill?</span>
        <select onChange={(e) => setPayer(e.target.value)}>
          <option value="you">You</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>

        <button
          className="button"
          onClick={(e) =>
            payer === "you"
              ? handleBalanceUpdate(selectedId, bill - yourExpense)
              : handleBalanceUpdate(selectedId, -yourExpense)
          }
        >
          Split Bill
        </button>
      </form>
    );
  }
}
