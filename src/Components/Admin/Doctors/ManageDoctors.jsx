import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useStore } from "../../../Utils/Store/StoreContext";
import { observer } from "mobx-react";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

function ManageDoctors() {
  const store = useStore();
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const [docName, setDocName] = useState("");
  const [docSpeciality, setDocSpeciality] = useState("");

  const handleDocName = (e) => {
    setDocName(e.target.value);
  };
  const handleDocSpeciality = (e) => {
    setDocSpeciality(e.target.value);
  };
  const addDocInfo = () => {
    store.AddDoctor(docName, docSpeciality, "Dhaka");

    // console.log(store.doctorsInfo);
  };

  const columns = [
    { name: "Doctor's Name", options: { filterOptions: { fullWidth: true } } },
    "Speciality",
    "Location",
  ];

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
      if (action === "rowDelete") {
        store.DeleteDoctor(state.data);
      }
      //   console.log(action);
      //   console.dir(state.data);
    },
  };
  return (
    <div>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={createTheme()}>
          <MUIDataTable
            title={"Doctor's list"}
            data={store.doctorsInfo}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      <input
        type="text"
        placeholder="Enter Doctor's Name"
        value={docName}
        onChange={handleDocName}
      />
      <input
        type="text"
        placeholder="Enter Doctor's Speciality"
        value={docSpeciality}
        onChange={handleDocSpeciality}
      />
      <button onClick={addDocInfo}>Add</button>
    </div>
  );
}
export default observer(ManageDoctors);
