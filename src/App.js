import AddItem from "./components/AddItem.js";
import "./App.css";
import { useState } from "react";
import ShowItems from "./components/ShowItems";
import data from "./data/data";

export default function App() {
  const [Items, setItems] = useState(data);
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);
  const [completedItems, setCompletedItems] = useState([]);
  const [showClearCompletedButton, setShowClearCompletedButton] =
    useState(false);
  const totalItems = Items.length + completedItems.length;
  function NewItem(List) {
    setItems([...Items, { ...List, id: Items.length + 1 }]);
  }

  return (
    <div className="background">
      <div className="heading">To-do List</div>
      <AddItem NewItem={NewItem}></AddItem>
      {Items.map((Item, index) => (
        <ShowItems
          key={Item.id}
          txt={Item.txt}
          handleUp={() => handleUp(index)}
          handleDown={() => handleDown(index)}
          handleDelete={() => handleDelete(index)}
          handleDone={() => handleDone(index)}
        />
      ))}

      {recentlyDeleted && (
        <div className="itemcontainer">
          <div className="item">{recentlyDeleted.txt}</div>
          <button className="deleteButton" onClick={handleUndo}>
            Undo
          </button>
        </div>
      )}

      {completedItems.length > 0 && (
        <>
          <div className="CompletedItems">
            <div className="CompletedItemsText">
              Completed Items : ({completedItems.length}/{totalItems})
            </div>
            <button
              onClick={handleClearCompleted}
              className="clearCompletedButton"
            >
              Delete All Completed Items
            </button>
          </div>
          <div className="completedTasks">
            {completedItems.map((cItem, index) => (
              <div className="itemcontainer" key={index}>
                <button
                  className="item"
                  style={{
                    textAlign: "left",
                    border: "none",
                    textDecorationLine: "line-through",
                    backgroundColor: "grey",
                  }}
                  onClick={() => handleDoneUndo(index)}
                >
                  {cItem.txt}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  function handleUp(index) {
    if (index > 0) {
      const updatedItems = [...Items]; //created a copy of state variable , here we will update our original state variable(Items) using setter function (setItems()) using copy of a state variable(updatedItems)
      [updatedItems[index], updatedItems[index - 1]] = [
        updatedItems[index - 1],
        updatedItems[index],
      ];
      setItems(updatedItems);
    }
  }

  function handleDown(index) {
    if (index < Items.length - 1) {
      const updatedItems = [...Items];
      [updatedItems[index], updatedItems[index + 1]] = [
        updatedItems[index + 1],
        updatedItems[index],
      ];
      setItems(updatedItems);
    }
  }

  function handleDelete(index) {
    const updatedItems = [...Items];
    let removedItems = updatedItems.splice(index, 1);
    setItems(updatedItems);
    setRecentlyDeleted(removedItems[0]);
    // Automatically clear the recentlyDeleted state after 2 seconds
    setTimeout(() => {
      setRecentlyDeleted(null);
    }, 2000);
  }

  function handleUndo() {
    setItems([...Items, recentlyDeleted]);
    setRecentlyDeleted(null);
  }

  function handleDone(index) {
    const updatedItems = [...Items];
    let completed = updatedItems.splice(index, 1);
    setItems(updatedItems);
    setCompletedItems([...completedItems, completed[0]]);
  }

  function handleDoneUndo(index) {
    const updatedCompletedItems = [...completedItems];
    let undoneItem = updatedCompletedItems.splice(index, 1);
    setCompletedItems(updatedCompletedItems);
    setItems([...Items, undoneItem[0]]);
  }

  function handleClearCompleted() {
    setCompletedItems([]);
    setShowClearCompletedButton(false); // Hide the clear completed button
  }
}
