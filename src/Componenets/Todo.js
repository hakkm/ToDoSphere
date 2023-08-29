import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import TextField from "@mui/material/TextField";

export default function Todo({ todos, body, iscompleted, onTodosChange }) {
  const [complete, setComplete] = useState(() => iscompleted);
  const [isEditing, setIsEditing] = useState(() => false);
  const wasEditingBefore = useRef();
  const inputRef = useRef(null);
  const editButtonRef = useRef(null);

  function handleSave(e) {
    e.preventDefault();
    // Edit todo and save
    const updatedTodos = todos.map((todo) => {
      if (body === todo.body) return { ...todo, body: e.target.newName.value };
      return todo;
    });
    onTodosChange(updatedTodos);
    setIsEditing(false);
  }

  // focus on input field when pressing edit
  useEffect(() => {
    console.log(wasEditingBefore.current);
    if (!wasEditingBefore && isEditing) inputRef.current?.focus();
    else if (wasEditingBefore && !isEditing) editButtonRef.current.focus();
    wasEditingBefore.current = isEditing;
  }, [isEditing, wasEditingBefore]);

  const editingTemplate = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexGrow: 1,
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Checkbox
          id={body}
          checked={complete}
          onChange={(e) => {
            const updatedTodos = todos.map((todo) => {
              if (body === todo.body) return { ...todo, completed: !complete };
              return todo;
            });
            onTodosChange(updatedTodos);
            setComplete(!complete);
          }}
        />

        <label htmlFor={body}>
          <Typography id="body" variant="body1" component="p" gutterBottom>
            {body}
          </Typography>
        </label>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Button ref={editButtonRef} onClick={() => setIsEditing(true)}>
          <EditIcon />
        </Button>
        <Button
          color="error"
          onClick={() => {
            const remainingTodos = todos.filter((todo) => todo.body !== body);
            onTodosChange(remainingTodos);
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </Box>
  );

  const viewTemplate = (
    <form onSubmit={handleSave}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexGrow: 1,
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <TextField
            ref={inputRef}
            label={"New name for " + body}
            name="newName"
            variant="standard"
            autoComplete="off"
            defaultValue={body}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button type="button" onClick={() => setIsEditing(false)}>
            <ClearRoundedIcon />
          </Button>
          <Button type="submit">
            <SaveAltRoundedIcon />
          </Button>
        </Box>
      </Box>
    </form>
  );
  return <>{!isEditing ? editingTemplate : viewTemplate}</>;
}
