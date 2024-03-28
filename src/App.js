import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, update: !item.update } : item
      )
    );
  }

  return (
    <div>
      <Form onAddItems={handleAddItems} />
      <TodoItemList
        items={items}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
    </div>
  );
}

function Form({ onAddItems }) {
  const [dateValue, setDateChange] = useState(new Date());
  const [inputItem, setInputItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(dateValue);
    console.log(inputItem);
    const newItem = { dateValue, inputItem, id: Date.now(), update: false };
    onAddItems(newItem);
    console.log(newItem);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Select date</label>
      <input
        type="date"
        value={dateValue}
        onChange={(e) => setDateChange(e.target.value)}
      />
      <label>todolist</label>
      <input
        type="text"
        placeholder="item name"
        value={inputItem}
        onChange={(e) => setInputItem(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function TodoItemList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <ul>
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
        />
      ))}
    </ul>
  );
}
function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <>
      <li>
        {item.dateValue}
        {item.update ? (
          <input
            type="text"
            value={item.inputItem}
            onChange={(e) => console.log(e.target.value)}
          />
        ) : (
          item.inputItem
        )}
        <button onClick={() => onDeleteItem(item.id)}>remove</button>
        <button onClick={() => onUpdateItem(item.id)}>Update</button>
      </li>
    </>
  );
}
