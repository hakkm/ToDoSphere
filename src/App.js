import { useState } from "react";
import AddBar from "./Componenets/AddBar";
import FilterBar from "./Componenets/FilterBar";
import Todos from "./Componenets/Todos";

const TODOS = [
  { id: 1, body: "Eat Healthy Food", active: false },
  { id: 2, body: "Sleep at Time", active: true },
  { id: 3, body: "Break", active: false },
];

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
