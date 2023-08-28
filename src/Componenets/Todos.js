import Todo from "./Todo";

export default function Todos({ todos, filter, onTodosChange, FILTER_MAP }) {
  const tasksNoun = todos.length !== 1 ? "tasks" : "task";

  return (
    <>
      <h2>
        {todos.filter(FILTER_MAP[filter]).length} {tasksNoun} Remaining
      </h2>
      {todos.filter(FILTER_MAP[filter]).map(({ id, body, completed }) => (
        <Todo
          key={id}
          body={body}
          iscompleted={completed}
          todos={todos}
          onTodosChange={onTodosChange}
        />
      ))}
    </>
  );
}
