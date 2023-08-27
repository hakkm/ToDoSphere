import Todo from "./Todo";

export default function Todos({ todos, filter, onTodosChange }) {
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
