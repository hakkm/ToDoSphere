import { useState, useRef, useEffect } from "react";

export default function Todo({ todos, body, isActive, onTodosChange }) {
  const [complete, setComplete] = useState(isActive);
  const [isEditing, setIsEditing] = useState(() => false);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("useEffect calling");
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);
  function handleSave(e) {
    e.preventDefault();
    // Edit todo and save
    const updatedTodos = todos.map((todo) => {
      if (body === todo.body) return { ...todo, body: e.target.newName.value };
      return todo;
    });
    onTodosChange(updatedTodos);
    setIsEditing(false);
  }

  const editingTemplate = (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={complete}
            onChange={(e) => {
              const updatedTodos = todos.map((todo) => {
                if (body === todo.body) return { ...todo, active: !complete };
                return todo;
              });
              onTodosChange(updatedTodos);
              setComplete(!complete);
            }}
          />{" "}
          {body}
        </label>
      </div>
      <div>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button
          onClick={() => {
            const remainingTodos = todos.filter((todo) => todo.body !== body);
            onTodosChange(remainingTodos);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const viewTemplate = (
    <form onSubmit={handleSave}>
      <label>New name for {body}</label>
      <div>
        <input
          ref={inputRef}
          name="newName"
          autoComplete="off"
          defaultValue={body}
        />
      </div>
      <div>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
  return <>{!isEditing ? editingTemplate : viewTemplate}</>;
}
