const TODOS = [
  { id: 1, body: "Eat Healthy Food" },
  { id: 2, body: "Sleep at Time" },
];

function AddBar() {
  return (
    <>
      <div>
        <label htmlFor="add">What Needs To Be Done?</label>
      </div>
      <input id="add"></input>
      <button>Add</button>
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

function Todo({ body }) {
  return (
    <>
      <div>
        <label>
          <input type="checkbox" /> {body}
        </label>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </>
  );
}

function Todos({ todos }) {
  return (
    <>
      <h2># Task Remaining</h2>
      {todos.map(({ id, body }) => (
        <Todo key={id} body={body} />
      ))}
    </>
  );
}

export default function App() {
  return (
    <>
      <AddBar />
      <FilterBar />
      <Todos todos={TODOS} />
    </>
  );
}
