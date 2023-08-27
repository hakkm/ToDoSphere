export default function FilterBar({ onFilterChange }) {
  return (
    <div>
      <button onClick={() => onFilterChange("All")}>All</button>
      <button onClick={() => onFilterChange("Active")}>Active</button>
      <button onClick={() => onFilterChange("Completed")}>Completed</button>
    </div>
  );
}
