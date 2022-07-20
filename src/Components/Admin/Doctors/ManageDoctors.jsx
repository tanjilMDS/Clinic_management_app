import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useStore } from "../../../Utils/Store/StoreContext";
import { observer } from "mobx-react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogueBox from "./DialogueBox";
import axios from "axios";
import CustomSnackbar from "./Snackbar";
import styles from "./ManageDoctors.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";

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

function ManageDoctors() {
  const myTheme = getMuiTheme();
  const [docName, setDocName] = useState("");
  const [docSpeciality, setDocSpeciality] = useState("");
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState();

  const [doctorsData, setDoctorsData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/doctors")
      .then((response) => {
        setDoctorsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleClickOpen = (state) => {
    setOpen(true);
    setData(state);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [snackbar, setSnackbar] = React.useState(false);

  const handleClick = () => {
    setSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  const handleDocName = (e) => {
    setDocName(e.target.value);
  };
  const handleDocSpeciality = (e) => {
    setDocSpeciality(e.target.value);
  };
  const addDocInfo = (
    name,
    speciality,
    email,
    phone,
    visitingHours,
    password
  ) => {
    // store.AddDoctor(docName, docSpeciality, "Dhaka");
    axios
      .post("http://localhost:8000/doctors", {
        name: name,
        speciality: speciality,
        email: email,
        phone: phone,
        visitingHours: visitingHours,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setDocName("");
        setDocSpeciality("");
        handleClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    "ID",
    { name: "Doctor's Name", options: { filterOptions: { fullWidth: true } } },
    "Speciality",
    "Visiting Hours",
    "Email",
    "Phone",
    "Password",
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
            title={"Doctor's list"}
            data={doctorsData?.map((item) => {
              return [item.id, item.name, item.speciality,item.visitingHours, item.email,item.phone,item.password];
            })}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      <Formik
        initialValues={{
          name: "",
          speciality: "",
          visitingHours: "",
          email: "",
          password: "",
          phone: "",
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
            addDocInfo(
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
          </Form>
        )}
      </Formik>

      {/* <div className={styles.textfieldContainer}>
        <TextField
          type="text"
          placeholder="Enter Doctor's Name"
          value={docName}
          onChange={handleDocName}
          sx={{ width: "30%" }}
        />
        <TextField
          type="text"
          placeholder="Enter Doctor's Speciality"
          value={docSpeciality}
          onChange={handleDocSpeciality}
          sx={{ width: "30%" }}
        />
        <TextField
          type="text"
          placeholder="Visiting Hours"
          value={docSpeciality}
          onChange={handleDocSpeciality}
          sx={{ width: "30%" }}
        />
        <TextField
          type="text"
          placeholder="Email"
          value={docSpeciality}
          onChange={handleDocSpeciality}
          sx={{ width: "30%" }}
        />
        <TextField
          type="text"
          placeholder="Password"
          value={docSpeciality}
          onChange={handleDocSpeciality}
          sx={{ width: "30%" }}
        />
        <TextField
          type="text"
          placeholder="Phone"
          value={docSpeciality}
          onChange={handleDocSpeciality}
          sx={{ width: "30%" }}
        />
        <Button
          sx={{ width: 150, padding: 1 }}
          variant="contained"
          onClick={addDocInfo}
        >
          Add
        </Button>
        {open && (
          <DialogueBox data={data} open={open} handleClose={handleClose} />
        )}
      </div> */}
      {open && (
          <DialogueBox data={data} open={open} handleClose={handleClose} />
        )}
      {snackbar && (
        <CustomSnackbar
          text="Doctor's info added successfully"
          handleClose={handleCloseSnackbar}
          open={snackbar}
        />
      )}
    </div>
  );
}
export default observer(ManageDoctors);
