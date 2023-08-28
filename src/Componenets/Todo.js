import { useState, useRef, useEffect } from "react";

export default function Todo({ todos, body, iscompleted, onTodosChange }) {
  const [complete, setComplete] = useState(iscompleted);
  const [isEditing, setIsEditing] = useState(() => false);
  const inputRef = useRef(null);
  const editButtonRef = useRef(null);

  // focus on input field when pressing edit
  useEffect(() => {
    console.log("effect");
    if (isEditing) inputRef.current.focus();
    else editButtonRef.current.focus();
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
                if (body === todo.body)
                  return { ...todo, completed: !complete };
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
        <button ref={editButtonRef} onClick={() => setIsEditing(true)}>
          Edit
        </button>
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
