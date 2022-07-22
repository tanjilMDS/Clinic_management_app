import React from "react";
import { observer } from "mobx-react";
import CardComponent from "../../Utils/CardComponent";
import doctorIcon from '../../Files/img/doctor.png'
import patientIcon from '../../Files/img/patient.png'
import appointmentIcon from '../../Files/img/appointment.png'
import bg from '../../Files/img/bgAdmin.jpg'

const Admin = () => {
  // const notesStore = useStore();
  const options = [
    {
      id: 1,
      title: "Manage Doctors",
      detail: `Manage doctor's info from here`,
      image:doctorIcon
    },

    {
      id: 2,
      title: "Manage Patients",
      detail: `Manage patient's info from here`,
      image:patientIcon
    },
    {
      id: 3,
      title: "Appointments",
      detail: `Add/Delete appointments`,
      image:appointmentIcon
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 30,
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
      }}
    >
      {options.map((item, i) => {
        return (
          <div key={i}>
            <CardComponent img={item.image} title={item.title} details={item.detail} id={item.id} />
          </div>
        );
      })}
    </div>
  );
};
export default observer(Admin);
