import Todo from "./Todo";

export default function Todos({ todos, filter, onTodosChange }) {
  const tasksNoun = todos.length !== 1 ? "tasks" : "task";
  function filterTodo(active) {
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
        {todos.filter(({ active }) => filterTodo(active)).length} {tasksNoun}{" "}
        Remaining
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
