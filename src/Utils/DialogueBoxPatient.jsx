import * as React from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Button, Select, Stack, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import CustomSnackbar from "./Snackbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const [DOB, setDOB] = React.useState(new Date(props.data[2]));
  const [open, setOpen] = React.useState(false);

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
console.log(props.data)

  const update = (patientsName, age, sex, location, history) => {
    const year = DOB.getFullYear();
    const month = DOB.getMonth();
    const date = DOB.getDate();
    const FullDOB = month+1 + "/" + date + "/" + year;
    console.log(FullDOB)

    axios
      .put(`http://localhost:8000/patients/${props.data[0]}`, {
        patientsName: patientsName,
        DOB: FullDOB,
        age: age,
        sex: sex,
        location: location,
        history: history,
      })
      .then((response) => {
        // console.log(response)
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
  };
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/patients/${props.data[0]}`)
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
    // name: Yup.string()
    //   .min(2, "Your name is too short")
    //   .required("Please enter your full name"),
    // email: Yup.string()
    //   .email("The email is incorrect")
    //   .required("Please enter your email"),
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
            Edit Patients's Info
          </Typography>
        </Toolbar>
      </AppBar>
      <PageWrapper
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor:'#b5c2c9',
          width: "100%",
          borderRadius:10,
          marginTop: 20,
        }}
      >
        <Formik
          initialValues={{
            patientsName: props.data[1],
            DOB: null,
            age: "",
            sex: props.data[4],
            location: props.data[5],
            history: props.data[6],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            let today = new Date();
            let age_now = today.getFullYear() - DOB.getFullYear();
            let m = today.getMonth() - DOB.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < DOB.getDate())) {
              age_now--;
            }
            const age = age_now + " Years" + " " + m + " Months";
            console.log(age)

            update(
              values.patientsName,
              age,
              values.sex,
              values.location,
              values.history
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
            handleChange,
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Label htmlFor="patientsName">
                      Patient's Name
                      <TextField
                        type="text"
                        name="patientsName"
                        autoCorrect="off"
                        autoComplete="off"
                        placeholder="Patient's Name"
                        value={values.patientsName}
                        onChange={handleChange}
                        valid={touched.name && !errors.name}
                        error={touched.name && errors.name}
                        style={{ display: "flex", width: "100%",backgroundColor:'white',borderRadius:5 }}
                      />
                    </Label>
                    {errors.name && touched.name && (
                      <StyledInlineErrorMessage>
                        {errors.name}
                      </StyledInlineErrorMessage>
                    )}
                    <Label htmlFor="DOB">
                      DOB
                      <div className="datepicker" style={{backgroundColor:'white',borderRadius:5}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            // label="Basic example"

                            value={DOB}
                            onChange={(newValue) => {
                              setDOB(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </div>
                    </Label>
                  </div>

                  <div
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                  >
                    <Label htmlFor="sex">
                      Sex
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.sex}
                        // label="Age"
                        name="sex"
                        onChange={handleChange}
                        style={{ display: "block",backgroundColor:'white',borderRadius:5 }}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </Label>

                    <Label htmlFor="location">
                      Location
                      <TextField
                        type="text"
                        name="location"
                        autoCorrect="off"
                        autoComplete="off"
                        placeholder="Location"
                        value={values.location}
                        onChange={handleChange}
                        valid={touched.name && !errors.name}
                        error={touched.name && errors.name}
                        style={{ display: "flex", width: "100%",backgroundColor:'white',borderRadius:5 }}
                      />
                    </Label>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <Label htmlFor="history">
                      History
                      <TextField
                        type="text"
                        name="history"
                        autoCorrect="off"
                        autoComplete="off"
                        placeholder="History"
                        value={values.history}
                        onChange={handleChange}
                        valid={touched.name && !errors.name}
                        error={touched.name && errors.name}
                        style={{ display: "flex", width: "100%",backgroundColor:'white',borderRadius:5 }}
                      />
                    </Label>
                  </div>

                  <Stack spacing={2} style={{ display: "flex", marginTop: 10 }}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{backgroundColor:'#313639'}}
                      //   disabled={!isValid || isSubmitting}
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
