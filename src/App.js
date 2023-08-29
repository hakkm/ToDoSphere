import { useState } from "react";
import { nanoid } from "nanoid";
import AddBar from "./Componenets/AddBar";
import FilterBar from "./Componenets/FilterBar";
import Todos from "./Componenets/Todos";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

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

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {
  const [todos, setTodos] = useState(TODOS);
  const [filter, setFilter] = useState("All");
  const filterList = (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {FILTER_NAMES.map((name) => (
          <FilterBar key={name} name={name} onFilterChange={setFilter} />
        ))}
      </RadioGroup>
    </FormControl>
  );
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AddBar onTodosChange={setTodos} todos={todos} />
        {filterList}
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
