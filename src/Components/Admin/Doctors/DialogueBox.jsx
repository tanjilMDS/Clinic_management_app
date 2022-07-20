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
import { Formik, Form, Field, ErrorMessage } from "formik";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogueBox(props) {
  const [docName, setDocName] = useState(props.data[1]);
  const [docSpeciality, setDocSpeciality] = useState(props.data[2]);
  const [snackText, setSnackText] = useState("");

  const [open, setOpen] = React.useState(false);

  console.log(props.data)
  const handleClick = (text) => {
    setOpen(true);
    setSnackText(text);
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

  const update = (  name,
    speciality,
    email,
    phone,
    visitingHours,
    password) => {
    axios
      .put(`http://localhost:8000/doctors/${props.data[0]}`, {
        name: name,
        speciality: speciality,
        email: email,
        phone: phone,
        visitingHours: visitingHours,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          handleClick("Updated Successfully!");
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
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
          handleClick("Deleted Successfully!");

          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
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

      {/* <Stack
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
        <Button
          style={{ backgroundColor: "red" }}
          onClick={handleDelete}
          variant="contained"
        >
          Delete
        </Button>
        <Button onClick={update} variant="contained">
          Update
        </Button>
      </Stack> */}

<Formik
        initialValues={{
          name: props.data[1],
          speciality: props.data[2],
          visitingHours: props.data[3],
          email: props.data[4],
          phone: props.data[5],
          password: props.data[6],
          
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            // console.log(values)
            update(
              values.name,
              values.speciality,
              values.email,
              values.phone,
              values.visitingHours,
              values.password
            );
            
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 20,
              gap: 10,
            }}
          >
            <Field
              style={{ backgroundColor: "#F2F2F2", width: "30%" }}
              placeholder="Doctor's Name"
              type="text"
              name="name"
            />
            <Field
              style={{ width: "30%" }}
              placeholder="Doctor's Speciality"
              type="text"
              name="speciality"
            />
            <Field
              style={{ width: "30%" }}
              placeholder="Visiting Hours"
              type="text"
              name="visitingHours"
            />
            <Field
              style={{ width: "30%" }}
              placeholder="Phone"
              type="text"
              name="phone"
            />
            <Field
              style={{ width: "30%" }}
              placeholder="Email"
              type="email"
              name="email"
            />
            <ErrorMessage name="email" component="div" />
            <Field
              style={{ width: "30%" }}
              placeholder="Password"
              type="password"
              name="password"
            />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <button onClick={handleDelete}>
              Delete
            </button>
          </Form>
        )}
      </Formik>

      {open && (
        <CustomSnackbar
          text={snackText}
          handleClose={handleClose}
          open={open}
        />
      )}
    </Dialog>
  );
}
