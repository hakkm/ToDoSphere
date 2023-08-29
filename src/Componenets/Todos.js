import Todo from "./Todo";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Todos({ todos, filter, onTodosChange, FILTER_MAP }) {
  const tasksNoun = todos.length !== 1 ? "tasks" : "task";

  return (
    <>
      <Typography sx={{ p: 2 }} variant="h5" component="h4" gutterBottom>
        {todos.filter(FILTER_MAP[filter]).length} {tasksNoun} Remaining
      </Typography>
      <Stack spacing={2} sx={{}}>
        {todos.filter(FILTER_MAP[filter]).map(({ id, body, completed }) => (
          <Todo
            key={id}
            body={body}
            iscompleted={completed}
            todos={todos}
            onTodosChange={onTodosChange}
          />
        ))}
      </Stack>
    </>
  );
}
