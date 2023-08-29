import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function FilterBar({ onFilterChange, name }) {
  return (
    // <Button onClick={() => onFilterChange(name)}>{name}</Button>;
    <FormControlLabel
      value={name}
      control={<Radio />}
      label={name}
      onClick={() => onFilterChange(name)}
    />
  );
}
