export default function FilterBar({ onFilterChange, name }) {
  return <button onClick={() => onFilterChange(name)}>{name}</button>;
}
