import { useState } from "react";
import { nanoid } from "nanoid";

export default function AddBar({ onTodosChange, todos }) {
  const [add, setAdd] = useState("Eat");
  function handleSubmit(e) {
    e.preventDefault();
    onTodosChange([
      ...todos,
      { id: `todo-${nanoid()}`, body: add, active: false },
    ]);
    setAdd("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>What Needs To Be Done?</label>
      <div>
        <input
          value={add}
          onChange={(e) => setAdd(e.target.value)}
          autoComplete="off"
        ></input>
        <button>Add</button>
      </div>
    </form>
  );
}
