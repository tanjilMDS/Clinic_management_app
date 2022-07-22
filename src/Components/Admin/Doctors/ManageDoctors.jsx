import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { observer } from "mobx-react";
import Button from "@mui/material/Button";
import DialogueBox from "../../../Utils/DialogueBoxDoctor";
import axios from "axios";
import CustomSnackbar from "../../../Utils/Snackbar";
import styles from "./ManageDoctors.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import * as Yup from "yup";

import {
  PageWrapper,
  Title,
  Label,
  Input,
  StyledInlineErrorMessage,
  Submit,
  CodeWrapper,
} from "../../../Utils/stylesForm";
import { Stack } from "@mui/material";
import { increment } from "../../../Utils/Services/counterSlice";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});
const getMuiTheme = () =>
createMuiTheme({
  overrides: {
    MUIDataTable: {
      root: {
        backgroundColor: "#FF000"
      },
      paper: {
        boxShadow: "none"
      }
    },
    MUIDataTableBodyCell: {
      root: {
        backgroundColor: "#FF0000"
      }
    }
  }
});

function ManageDoctors() {
  const myTheme = getMuiTheme();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState();
  const [snackbar, setSnackbar] = React.useState(false);
  const [doctorsData, setDoctorsData] = useState(null);
  const count = useSelector((state) => state.myCounter);
  const dispatch = useDispatch();

  const addDocInfo = (
    name,
    speciality,
    email,
    phone,
    visitingHours,
    password
  ) => {
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
        handleClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    name: Yup.string()
      .min(2, "Your name is too short")
      .required("Please enter your full name"),
    email: Yup.string()
      .email("The email is incorrect")
      .required("Please enter your email"),
  });

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
        <MuiThemeProvider  theme={getMuiTheme()}>
          <MUIDataTable
            
            title={"Doctor's list"}
            data={doctorsData?.map((item) => {
              return [
                item.id,
                item.name,
                item.speciality,
                item.visitingHours,
                item.email,
                item.phone,
                item.password,
              ];
            })}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </CacheProvider>
      <div className={styles.tableContainer}>
      <PageWrapper
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Formik
          initialValues={{
            name: "",
            speciality: "",
            visitingHours: "",
            email: "",
            password: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            addDocInfo(
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
                    width: "100%",
                    backgroundColor:'#b5c2c9',
                    padding:10,
                    borderRadius:10
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
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
                  </div>

                  <div
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                  >
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
                        type="text"
                        name="phone"
                        autoCorrect="off"
                        autoComplete="off"
                        placeholder="Phone"
                        valid={touched.name && !errors.name}
                        error={touched.name && errors.name}
                      />
                    </Label>
                  </div>

                  <div
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                  >
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
                        <StyledInlineErrorMessage>
                          {msg}
                        </StyledInlineErrorMessage>
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
                  </div>

                  <Stack spacing={2} style={{ display: "flex", marginTop: 10 }}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      sx={{backgroundColor:'#313639'}}
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
export default ManageDoctors;
