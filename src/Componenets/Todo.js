import { useState, useRef, useEffect } from "react";

export default function Todo({ todos, body, isActive, onTodosChange }) {
  const [complete, setComplete] = useState(isActive);
  const [edit, setEdit] = useState(() => false);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("useEffect calling");
    if (edit) inputRef.current.focus();
  }, [edit]);
  function handleSave(e) {
    e.preventDefault();

    const foundIndex = todos.findIndex((todo) => todo.body === body);
    const updatedTodos = [...todos];

    updatedTodos[foundIndex] = {
      ...updatedTodos[foundIndex],
      body: e.target.newName.value,
    };

    onTodosChange(updatedTodos);
    setEdit(false);
  }
  return (
    <>
      {!edit ? (
        <div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={complete}
                onChange={(e) => {
                  const foundIndex = todos.findIndex(
                    (todo) => todo.body === body
                  );
                  const updatedTodos = [...todos];

                  updatedTodos[foundIndex] = {
                    ...updatedTodos[foundIndex],
                    active: !complete,
                  };

                  onTodosChange(updatedTodos);
                  setComplete(!complete);
                }}
              />{" "}
              {body}
            </label>
          </div>
          <div>
            <button onClick={() => setEdit(true)}>Edit</button>
            <button
              onClick={() => {
                const foundIndex = todos.findIndex(
                  (todo) => todo.body === body
                );
                const deletedTodos = [...todos];
                deletedTodos.splice(foundIndex, 1);
                onTodosChange(deletedTodos);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
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
            <button type="button" onClick={() => setEdit(false)}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      )}
    </>
  );
}
