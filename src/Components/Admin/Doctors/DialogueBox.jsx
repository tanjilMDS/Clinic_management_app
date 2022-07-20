import * as React from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import CustomSnackbar from "./Snackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogueBox(props) {
  const [docName, setDocName] = useState(props.data[1]);
  const [docSpeciality, setDocSpeciality] = useState(props.data[2]);


  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDocName = (e) => {
    setDocName(e.target.value);
  };
  const handleDocSpeciality = (e) => {
    setDocSpeciality(e.target.value);
  };

  const update = () => {
    axios
      .put(`http://localhost:8000/doctors/${props.data[0]}`, {
        name: docName,
        speciality: docSpeciality,
        location: "UK",
      })
      .then((response) => {
        if (response.status === 200) {
          handleClick();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // setDocName("");
    // setDocSpeciality("");
  };
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/doctors/${props.data[0]}`)
      .then((response) => {
        if (response.status === 200) {
          handleClick();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit Doctor's Info
          </Typography>
        </Toolbar>
      </AppBar>

      <Stack
        style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
        gap={3}
        direction="row"
      >
        <TextField
          type="text"
          placeholder="Enter Doctor's Name"
          value={docName}
          onChange={handleDocName}
        />
        <TextField
          type="text"
          placeholder="Enter Doctor's Speciality"
          value={docSpeciality}
          onChange={handleDocSpeciality}
        />
        <Button style={{backgroundColor:'red'}} onClick={handleDelete} variant="contained">
          Delete
        </Button>
        <Button onClick={update} variant="contained">
          Update
        </Button>
      </Stack>
      {open && <CustomSnackbar handleClose={handleClose} open={open} />}
    </Dialog>
  );
}
