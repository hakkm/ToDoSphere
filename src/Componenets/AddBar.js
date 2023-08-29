import { useState } from "react";
import { nanoid } from "nanoid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

export default function AddBar({ onTodosChange, todos }) {
  const [add, setAdd] = useState("Eat");
  function handleSubmit(e) {
    e.preventDefault();
    onTodosChange([
      ...todos,
      { id: `todo-${nanoid()}`, body: add, completed: false },
    ]);
    setAdd("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom>
        <label>What Needs To Be Done?</label>
      </Typography>
      <Box sx={{ display: "flex", alignItems: "stretch", gap: 1 }}>
        <TextField
          id="outlined-basic"
          label="Do ..."
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          value={add}
          onChange={(e) => setAdd(e.target.value)}
          autoComplete="off"
        />
        <Button
          variant="contained"
          sx={{ borderRadius: 20, m: 0.5 }}
          type="submit"
        >
          <AddIcon sx={{ fontSize: "big" }} />
        </Button>
      </Box>
    </form>
  );
}
