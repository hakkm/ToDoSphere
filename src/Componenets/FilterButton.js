import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function FilterButton({ onFilterChange, name }) {
  return <FormControlLabel value={name} control={<Radio />} label={name} />;
}
