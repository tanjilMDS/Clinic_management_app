import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import Button from "@mui/material/Button";
import DialogueBox from "../../../Utils/DialogueBoxPatient";
import axios from "axios";
import CustomSnackbar from "../../../Utils/Snackbar";
// import styles from "./ManageDoctors.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import * as Yup from "yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import styles from "../Patients/ManagePatients.module.scss";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  PageWrapper,
  Title,
  Label,
  Input,
  StyledInlineErrorMessage,
  Submit,
  CodeWrapper,
} from "../../../Utils/stylesForm";
import { MenuItem, Select, Stack } from "@mui/material";
import { increment } from "../../../Utils/Services/counterSlice";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});
const getMuiTheme = () =>
  createTheme({
    overrides: {
      MUIDataTable: {
        responsiveScrollMaxHeight: {
          maxHeight: "400px !important",
        },
      },
    },
  });

function Appointments() {
  const myTheme = getMuiTheme();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState();
  const [snackbar, setSnackbar] = React.useState(false);
  const [patientsData, setpatientsData] = useState(null);
  const [DOB, setDOB] = React.useState(null);
  const count = useSelector((state) => state.myCounter);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8000/doctors")
      .then((response) => {
        setpatientsData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addPatientsInfo = (patientsName, age, sex, location, history) => {
    const year = DOB.getFullYear();
    const month = DOB.getMonth();
    const date = DOB.getDate();
    const FullDOB = month + 1 + "/" + date + "/" + year;

    axios
      .post("http://localhost:8000/patients", {
        patientsName: patientsName,
        DOB: FullDOB,
        age: age,
        sex: sex,
        location: location,
        history: history,
      })
      .then((response) => {
        console.log(response);
        handleClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = (state) => {
    setOpen(true);
    setData(state);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  const validationSchema = Yup.object().shape({
    // name: Yup.string()
    //   .min(2, "Your name is too short")
    //   .required("Please enter your full name"),
    // email: Yup.string()
    //   .email("The email is incorrect")
    //   .required("Please enter your email"),
  });

  const columns = [
    "ID",
    {
      name: "Patients's Name",
      options: { filterOptions: { fullWidth: true } },
    },
    "DOB",
    "Age",
    "Sex",
    "Location",
    "History",
  ];

  const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "400px",
    tableBodyMaxHeight: "100%",
    onRowClick: (state) => handleClickOpen(state),
    searchPlaceholder: `Search by Doctor's name or speciality`,
    onTableChange: (action, state) => {
      if (action === "rowDelete") {
        console.log(state);
      }
    },
  };

  return (
    <div>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={myTheme}>
          <MUIDataTable
            title={"Patient's list"}
            data={patientsData?.map((item) => {
              return [
                item.id,
                item.patientsName,
                item.DOB,
                item.age,
                item.sex,
                item.location,
                item.history,
              ];
            })}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      <div className={styles.patientContainer}>
      <div className="patientContainer">
        <PageWrapper
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height:425,
            maxHeight:425,
            // flex:1
          }}
        >
          <Formik
            initialValues={{
              patientsName: "",
              DOB: null,
              age: "",
              sex: "",
              location: "",
              history: "",
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

              addPatientsInfo(
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
                      backgroundColor: "#b5c2c9",
                      padding: 10,
                      borderRadius: 10,
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
                          style={{
                            display: "flex",
                            backgroundColor: "white",
                            borderRadius: 5,
                            width: "100%",
                          }}
                        />
                      </Label>
                      {errors.name && touched.name && (
                        <StyledInlineErrorMessage>
                          {errors.name}
                        </StyledInlineErrorMessage>
                      )}
                      <Label htmlFor="sex">
                        Doctor
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.sex}
                          // label="Age"
                          name="sex"
                          onChange={handleChange}
                          style={{
                            display: "block",
                            backgroundColor: "white",
                            borderRadius: 5,
                          }}
                        >
                          {
                            patientsData?.map((item)=>{
                              return(
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                              )
                            })
                          }
                          {/* <MenuItem value="1">Arun Kumar</MenuItem>
                          <MenuItem value="4">Tanjil Hossain</MenuItem> */}
                        </Select>
                      </Label>
                      
                    </div>

                    <div
                      style={{ display: "flex", flexDirection: "row", gap: 10 }}
                    >
                      <Label htmlFor="DOB">
                        Date of Appointment
                        <div
                          className="datepicker"
                          style={{ backgroundColor: "white", borderRadius: 5 }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              // label="Basic example"

                              value={DOB}
                              onChange={(newValue) => {
                                setDOB(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </Label>
                      <Label htmlFor="sex">
                        Time Slot
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.sex}
                          // label="Age"
                          name="sex"
                          onChange={handleChange}
                          style={{
                            display: "block",
                            backgroundColor: "white",
                            borderRadius: 5,
                          }}
                        >
                          <MenuItem value="1">1PM</MenuItem>
                          <MenuItem value="4">4PM</MenuItem>
                        </Select>
                      </Label>

                      
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      {/* <Label htmlFor="history">
                        Doctor's Feedback
                        <TextField
                          type="text"
                          name="history"
                          autoCorrect="off"
                          autoComplete="off"
                          placeholder="Doctors Feedback"
                          value={values.history}
                          onChange={handleChange}
                          valid={touched.name && !errors.name}
                          error={touched.name && errors.name}
                          style={{
                            display: "flex",
                            width: "100%",
                            backgroundColor: "white",
                            borderRadius: 5,
                          }}
                        />
                      </Label> */}
                    </div>

                    <Stack
                      spacing={2}
                      style={{ display: "flex", marginTop: 10 }}
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ backgroundColor: "#313639" }}
                        // disabled={!isValid || isSubmitting}
                      >
                        {isSubmitting ? `Adding...` : `Add`}
                      </Button>
                    </Stack>
                  </Form>
                </>
              );
            }}
          </Formik>
        </PageWrapper>
      </div>
              

      </div>

      {open && (
        <DialogueBox data={data} open={open} handleClose={handleClose} />
      )}
      {snackbar && (
        <CustomSnackbar
          text="Patient's info added successfully"
          handleClose={handleCloseSnackbar}
          open={snackbar}
        />
      )}
    </div>
  );
}
export default Appointments;
