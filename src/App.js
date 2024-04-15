import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [groupItems, setGroupItems] = useState({});
  const [showDefault, setShowDefault] = useState(true);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id, updateInput) {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, inputItem: updateInput, update: !item.update }
          : item
      )
    );
  }
  function handleToggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, itemBought: !item.itemBought } : item
      )
    );
  }
  function handleGroupItems() {
    setGroupItems(Object.groupBy(items, ({ dateValue }) => dateValue));
    setShowDefault(!showDefault);
    console.log(groupItems);
  }

  return (
    <div>
      <Form onAddItems={handleAddItems} />
      <button onClick={handleGroupItems}>
        {showDefault ? "group by date" : "show default"}
      </button>
      {showDefault ? (
        <TodoItemList
          items={items}
          onDeleteItem={handleDeleteItem}
          onUpdateItem={handleUpdateItem}
          onToggleItem={handleToggleItem}
        />
      ) : (
        <GroupingElements groupItems={groupItems} />
      )}
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
    const newItem = {
      dateValue,
      inputItem,
      id: Date.now(),
      update: false,
      itemBought: false,
    };
    onAddItems(newItem);
    console.log(newItem);
  }

  return (
    <>
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
    </>
  );
}
function TodoItemList({ items, onDeleteItem, onUpdateItem, onToggleItem }) {
  return (
    <ul>
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
          onToggleItem={onToggleItem}
        />
      ))}
    </ul>
  );
}
function Item({ item, onDeleteItem, onUpdateItem, onToggleItem }) {
  const [updateInput, setUpdateInput] = useState(item.inputItem);
  return (
    <>
      <li>
        <input
          type="checkbox"
          value={item.itemBought}
          onChange={() => {
            onToggleItem(item.id);
          }}
        />
        <span style={item.itemBought ? { textDecoration: "line-through" } : {}}>
          {item.dateValue}
          {item.update ? (
            <input
              type="text"
              value={updateInput}
              onChange={(e) => setUpdateInput(e.target.value)}
            />
          ) : (
            item.inputItem
          )}
        </span>

        <button onClick={() => onDeleteItem(item.id)}>remove</button>
        {item.itemBought ? (
          <button disabled>update</button>
        ) : (
          <button onClick={() => onUpdateItem(item.id, updateInput)}>
            {item.update ? "save" : "update"}
          </button>
        )}
      </li>
    </>
  );
}
function GroupingElements({ groupItems }) {
  return Object.keys(groupItems).map((k, i) => (
    <div key={i}>
      {k}
      <ul>
        {groupItems[k].map((groupItem, index) => (
          <li key={index}>{groupItem.inputItem}</li>
        ))}
      </ul>
    </div>
  ));
}
