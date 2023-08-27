import { useState } from "react";

export default function AddBar({ onTodosChange, todos }) {
  const [add, setAdd] = useState("Eat");
  function handleSubmit(e) {
    e.preventDefault();
    onTodosChange([
      ...todos,
      { id: todos[todos.length - 1].id + 1, body: add, active: false },
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
