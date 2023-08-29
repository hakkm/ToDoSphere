import { useState } from "react";
import { nanoid } from "nanoid";
import AddBar from "./Componenets/AddBar";
import FilterBar from "./Componenets/FilterBar";
import Todos from "./Componenets/Todos";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

const TODOS = [
  { id: nanoid(), body: "Eat Healthy Food", completed: false },
  { id: nanoid(), body: "Sleep at Time", completed: true },
  { id: nanoid(), body: "Break", completed: false },
  // {
  //   id: nanoid(),
  //   body: "Complete watching the video of configuration of emacs by system crafters",
  //   completed: false,
  // },
];

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

export default function App() {
  const [todos, setTodos] = useState(TODOS);
  const [filter, setFilter] = useState("All");
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <AddBar onTodosChange={setTodos} todos={todos} />
        <FilterBar filter={filter} onFilterChange={setFilter} />
        <Todos
          FILTER_MAP={FILTER_MAP}
          onTodosChange={setTodos}
          filter={filter}
          todos={todos}
        />
      </Box>
    </Container>
  );
}
