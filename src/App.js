import { useState } from "react";
import AddBar from "./Componenets/AddBar";
import FilterBar from "./Componenets/FilterBar";
import Todos from "./Componenets/Todos";

const TODOS = [
  { id: 1, body: "Eat Healthy Food", completed: false },
  { id: 2, body: "Sleep at Time", completed: true },
  { id: 3, body: "Break", completed: false },
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
  const filterList = FILTER_NAMES.map((name) => (
    <FilterBar key={name} name={name} onFilterChange={setFilter} />
  ));
  return (
    <>
      <AddBar onTodosChange={setTodos} todos={todos} />
      {filterList}
      <Todos
        FILTER_MAP={FILTER_MAP}
        onTodosChange={setTodos}
        filter={filter}
        todos={todos}
      />
    </>
  );
}
