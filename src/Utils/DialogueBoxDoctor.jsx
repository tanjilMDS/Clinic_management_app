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
import * as Yup from "yup";

import {
  PageWrapper,
  Title,
  Label,
  Input,
  StyledInlineErrorMessage,
  Submit,
  CodeWrapper,
} from "./stylesForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogueBox(props) {
  const [docName, setDocName] = useState(props.data[1]);
  const [docSpeciality, setDocSpeciality] = useState(props.data[2]);
  const [snackText, setSnackText] = useState("");

  const [open, setOpen] = React.useState(false);

  console.log(props.data);
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

  const update = (name, speciality, email, phone, visitingHours, password) => {
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

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Your name is too short")
      .required("Please enter your full name"),
    email: Yup.string()
      .email("The email is incorrect")
      .required("Please enter your email"),
  });

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#B7DFE1" }}>
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
      <PageWrapper
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
          width: "100%",
          backgroundColor:'#b5c2c9',
          borderRadius:10

        }}
      >
        <Formik
          initialValues={{
            name: props.data[1],
            speciality: props.data[2],
            visitingHours: props.data[3],
            email: props.data[4],
            phone: props.data[5],
            password: props.data[6],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            update(
              values.name,
              values.speciality,
              values.email,
              values.phone,
              values.visitingHours,
              values.password
            );
            const timeOut = setTimeout(() => {
              actions.setSubmitting(false);
              clearTimeout(timeOut);
            }, 1000);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            isValidating,
            isValid,
          }) => {
            return (
              <>
              
                <Form
                  name="contact"
                  method="post"
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    
                  }}
                >
                 
                  <Label htmlFor="name">
                    Doctor's Name
                    <Input
                      type="text"
                      name="name"
                      autoCorrect="off"
                      autoComplete="off"
                      placeholder="Doctor's Name"
                      valid={touched.name && !errors.name}
                      error={touched.name && errors.name}
                    />
                  </Label>
                  {errors.name && touched.name && (
                    <StyledInlineErrorMessage>
                      {errors.name}
                    </StyledInlineErrorMessage>
                  )}
                  <Label htmlFor="speciality">
                    Doctor's Speciality
                    <Input
                      type="text"
                      name="speciality"
                      autoCorrect="off"
                      autoComplete="off"
                      placeholder="Doctor's Speciality"
                      valid={touched.name && !errors.name}
                      error={touched.name && errors.name}
                    />
                  </Label>

                  <Label htmlFor="visitingHours">
                    Visiting Hours
                    <Input
                      type="text"
                      name="visitingHours"
                      autoCorrect="off"
                      autoComplete="off"
                      placeholder="Visiting Hours"
                      valid={touched.name && !errors.name}
                      error={touched.name && errors.name}
                    />
                  </Label>

                  <Label htmlFor="phone">
                    Phone
                    <Input
                      type="number"
                      name="phone"
                      autoCorrect="off"
                      autoComplete="off"
                      placeholder="Phone"
                      valid={touched.name && !errors.name}
                      error={touched.name && errors.name}
                    />
                  </Label>

                  <Label htmlFor="email">
                    Email
                    <Input
                      type="email"
                      name="email"
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="off"
                      placeholder="Doctor's email"
                      valid={touched.email && !errors.email}
                      error={touched.email && errors.email}
                    />
                  </Label>
                  <ErrorMessage name="email">
                    {(msg) => (
                      <StyledInlineErrorMessage>{msg}</StyledInlineErrorMessage>
                    )}
                  </ErrorMessage>
                  <Label htmlFor="visitingHours">
                    Password
                    <Input
                      type="password"
                      name="password"
                      autoCorrect="off"
                      autoComplete="off"
                      placeholder="password"
                      valid={touched.name && !errors.name}
                      error={touched.name && errors.name}
                    />
                  </Label>

                  <Stack spacing={2} style={{display:'flex',marginTop:10}}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      sx={{backgroundColor:'#313639'}}
                    >
                      {isSubmitting ? `Updating...` : `Update`}
                    </Button>
                    <Button
                      style={{ backgroundColor: "#DC3545" }}
                      variant="contained"
                      onClick={handleDelete}

                    >
                      Delete
                    </Button>
                  </Stack>
                </Form>
              </>
            );
          }}
        </Formik>
      </PageWrapper>

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
