import { useState } from "react";

const TODOS = [
  { id: 1, body: "Eat Healthy Food", active: false },
  { id: 2, body: "Sleep at Time", active: false },
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
          console.log(add);
          console.log(todos);
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

function FilterBar() {
  return (
    <div>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  );
}

function Todos({ todos }) {
  return (
    <>
      <h2># Task Remaining</h2>
      {todos.map(({ id, body, active }) => (
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
      <FilterBar />
      <Todos filter={filter} todos={todos} />
    </>
  );
}
