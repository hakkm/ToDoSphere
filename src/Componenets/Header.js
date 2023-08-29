import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Typography from "@mui/material/Typography";
export default function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <PlaylistAddCheckIcon sx={{ mr: 1, fontSize: 30 }} />
        <Typography variant="h6" color="inherit" noWrap>
          ToDoSphere
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
