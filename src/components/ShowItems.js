import "./ShowItems.css";
export default function ShowItems({
  txt,
  handleUp,
  handleDown,
  handleDelete,
  handleDone,
}) {
  return (
    <div className="itemcontainer">
      <div className="item">{txt}</div>
      <div className="itemButtons">
        <button className="upButton" onClick={handleUp}>
          Up
        </button>
        <button className="downButton" onClick={handleDown}>
          Down
        </button>
        <button className="deleteButton" onClick={handleDelete}>
          ❌
        </button>
        <button className="doneButton" onClick={handleDone}>
          ✔️
        </button>
      </div>
    </div>
  );
}
