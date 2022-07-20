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

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

function ManageDoctors() {
  const store = useStore();
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

  const handleDocName = (e) => {
    setDocName(e.target.value);
  };
  const handleDocSpeciality = (e) => {
    setDocSpeciality(e.target.value);
  };
  const addDocInfo = () => {
    // store.AddDoctor(docName, docSpeciality, "Dhaka");
    axios
      .post("http://localhost:8000/doctors", {
        name: docName,
        speciality: docSpeciality,
        location: "UK",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setDocName("");
    setDocSpeciality("");
  };

  const columns = [
    "ID",
    { name: "Doctor's Name", options: { filterOptions: { fullWidth: true } } },
    "Speciality",
    "Location",
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
        console.log(state)
      }
    },
  };
  return (
    <div>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={createTheme()}>
          <MUIDataTable
            title={"Doctor's list"}
            data={doctorsData?.map((item) => {
              return [item.id,item.name, item.speciality, item.location];
            })}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          gap: 20,
        }}
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
        <Button variant="contained" onClick={addDocInfo}>
          Add
        </Button>
        {open && (
          <DialogueBox data={data} open={open} handleClose={handleClose} />
        )}
      </div>
    </div>
  );
}
export default observer(ManageDoctors);
