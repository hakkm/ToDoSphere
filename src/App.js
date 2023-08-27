import { useState } from "react";

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
      <input value={add} onChange={(e) => setAdd(e.target.value)}></input>
      <button>Add</button>
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
      <h2>{todos.length} Task Remaining</h2>
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
  return (
    <>
      <div>
        <label>
          <input
            type="checkbox"
            checked={complete}
            onChange={(e) => {
              const foundIndex = todos.findIndex((todo) => todo.body === body);
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
        <button>Edit</button>
        <button
          onClick={() => {
            const foundIndex = todos.findIndex((todo) => todo.body === body);
            const deletedTodos = [...todos];
            deletedTodos.splice(foundIndex, 1);
            onTodosChange(deletedTodos);
          }}
        >
          Delete
        </button>
      </div>
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
