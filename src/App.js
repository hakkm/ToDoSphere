import { useEffect, useRef, useState } from "react";

const TODOS = [
  { id: 1, body: "Eat Healthy Food", active: false },
  { id: 2, body: "Sleep at Time", active: true },
  { id: 3, body: "Break", active: false },
];

function AddBar({ onTodosChange, todos }) {
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

function FilterBar({ filter, onFilterChange }) {
  return (
    <div>
      <button onClick={() => onFilterChange("All")}>All</button>
      <button onClick={() => onFilterChange("Active")}>Active</button>
      <button onClick={() => onFilterChange("Completed")}>Completed</button>
    </div>
  );
}

function Todos({ todos, filter, onTodosChange }) {
  console.log(filter);
  function filterTodo(active) {
    console.log(active);
    switch (filter) {
      case "All":
        return true;
      case "Active":
        return !active;
      default:
        return active;
    }
  }
  return (
    <>
      <h2>
        {todos.filter(({ active }) => filterTodo(active)).length} Task Remaining
      </h2>
      {todos
        .filter(({ active }) => filterTodo(active))
        .map(({ id, body, active }) => (
          <Todo
            key={id}
            body={body}
            isActive={active}
            todos={todos}
            onTodosChange={onTodosChange}
          />
        ))}
    </>
  );
}

function Todo({ todos, body, isActive, onTodosChange }) {
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
            <input ref={inputRef} name="newName" autoComplete="off"></input>
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

export default function App() {
  const [todos, setTodos] = useState(TODOS);
  const [filter, setFilter] = useState("All");
  return (
    <>
      <AddBar onTodosChange={setTodos} todos={todos} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <Todos onTodosChange={setTodos} filter={filter} todos={todos} />
    </>
  );
}
