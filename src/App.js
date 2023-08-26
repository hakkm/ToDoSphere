import { useState } from "react";

const TODOS = [
  { id: 1, body: "Eat Healthy Food", active: false },
  { id: 2, body: "Sleep at Time", active: false },
  { id: 3, body: "Sleep at Time", active: false },
];

function AddBar({ onTodosChange, todos }) {
  const [add, setAdd] = useState("Eat");
  return (
    <>
      <div>
        <label htmlFor="add">What Needs To Be Done?</label>
      </div>
      <input
        id="add"
        value={add}
        onChange={(e) => setAdd(e.target.value)}
      ></input>
      <button
        onClick={() => {
          onTodosChange([
            ...todos,
            { id: todos[todos.length - 1].id + 1, body: add, active: false },
          ]);
        }}
      >
        Add
      </button>
    </>
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

function Todos({ todos, filter }) {
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
      <h2># Task Remaining</h2>
      {todos
        .filter(({ active }) => filterTodo(active))
        .map(({ id, body, active }) => (
          <Todo key={id} body={body} isActive={active} />
        ))}
    </>
  );
}

function Todo({ body, isActive }) {
  return (
    <>
      <div>
        <label>
          <input type="checkbox" checked={isActive} /> {body}
        </label>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
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
      <Todos filter={filter} todos={todos} />
    </>
  );
}
