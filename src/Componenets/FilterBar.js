import FilterButton from "./FilterButton";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function FilterBar({ onFilterChange, filter }) {
  return (
    <FormControl
      sx={{
        px: 1,
      }}
    >
      <FormLabel id="demo-radio-buttons-group-label">Filter</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => onFilterChange(e.target.value)}
        value={filter}
      >
        {["All", "Active", "Completed"].map((name) => (
          <FilterButton key={name} name={name} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
