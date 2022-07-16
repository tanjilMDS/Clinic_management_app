import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoutingPaths from "../../Utils/RoutingPaths";

export default function CardComponent({ title, details, id }) {
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
        <CardMedia
          component="img"
          height="140"
          image="https://media.istockphoto.com/vectors/illustration-icon-with-the-concept-of-looking-for-health-information-vector-id1151608262?k=20&m=1151608262&s=612x612&w=0&h=KLkWc3WKFkWhQFzyWLkOF7nednl0-JsTgVzpGEj0F38="
          alt="green iguana"
        />
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
