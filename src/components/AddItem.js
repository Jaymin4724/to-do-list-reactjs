import { useState } from "react";
import "./AddItem.css";

const initial = { id: "", txt: "" };
export default function AddItem({ NewItem }) {
  const [List, setList] = useState(initial);

  function handleChange(e) {
    e.stopPropagation();
    setList({ ...List, [e.target.name]: e.target.value });
  }

  function handleClick(e) {
    e.preventDefault();
    if (List.txt !== "") {
      NewItem(List);
      setList(initial);
    }
  }

  return (
    <form className="addItemForm">
      <input
        type="text"
        name="txt"
        placeholder="Enter New Item"
        className="enterNewItem"
        onChange={handleChange}
        value={List.txt}
      />
      <input
        type="submit"
        className="itemAddButton"
        value="Add Item"
        onClick={handleClick}
      />
    </form>
  );
}
