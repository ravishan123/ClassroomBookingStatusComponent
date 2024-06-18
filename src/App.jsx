import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "./ProTip";
import Copyright from "./Copyright";
import ClassroomAvailability from "./CustomTable";

export default function App() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Booking view demo compoent
        </Typography>
        <ProTip />
        <ClassroomAvailability />
        <Copyright />
      </Box>
    </Container>
  );
}
