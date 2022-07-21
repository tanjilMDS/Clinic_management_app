import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoutingPaths from "./RoutingPaths";

export default function CardComponent({ title, details, id, img }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id === 1) {
      navigate(RoutingPaths.ManageDoctors);
    } else if (id === 2) {
      navigate(RoutingPaths.ManagePatients);
    } else if (id === 3) {
      navigate(RoutingPaths.Appointments);
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardActionArea>
        <div style={{ display: "flex", justifyContent: "center",padding:10 }}>
          <CardMedia
            sx={{ width: "60%", height: "100%" }}
            component="img"
            image={img}
            alt="green iguana"
          />
        </div>

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {details}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
