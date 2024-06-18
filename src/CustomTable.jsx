import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
} from "@mui/material";

// Sample booking data with more entries
const bookings = [
  { className: "Class 1", time: "8 AM - 9 AM", bookedBy: "John Doe" },
  { className: "Class 1", time: "10 AM - 11 AM", bookedBy: "Jane Doe" },
  { className: "Class 1", time: "11 AM - 12 PM", bookedBy: "Jane Doe" },
  { className: "Class 1", time: "2 PM - 3 PM", bookedBy: "Mike Ross" },
  { className: "Class 2", time: "9 AM - 10 AM", bookedBy: "Rachel Zane" },
  { className: "Class 2", time: "10 AM - 11 AM", bookedBy: "Rachel Zane" },
  { className: "Class 2", time: "3 PM - 4 PM", bookedBy: "Harvey Specter" },
  { className: "Class 2", time: "4 PM - 5 PM", bookedBy: "Harvey Specter" },
  { className: "Class 3", time: "8 AM - 9 AM", bookedBy: "Louis Litt" },
  { className: "Class 3", time: "11 AM - 12 PM", bookedBy: "Jessica Pearson" },
  { className: "Class 3", time: "12 PM - 1 PM", bookedBy: "Jessica Pearson" },
  { className: "Class 3", time: "4 PM - 5 PM", bookedBy: "Donna Paulsen" },
  { className: "Class 3", time: "5 PM - 6 PM", bookedBy: "Donna Paulsen" },
  { className: "Class 4", time: "10 AM - 11 AM", bookedBy: "Jane Doe" },
  { className: "Class 4", time: "11 AM - 12 PM", bookedBy: "Jane Doe" },
  { className: "Class 4", time: "2 PM - 3 PM", bookedBy: "Mike Ross" },
  { className: "Class 4", time: "9 AM - 10 AM", bookedBy: "Rachel Zane" },
  { className: "Class 4", time: "10 AM - 11 AM", bookedBy: "Rachel Zane" },
  { className: "Class 4", time: "3 PM - 4 PM", bookedBy: "Harvey Specter" },
];

// Generate time slots from 8 AM to 7 PM in "H AM/PM" format
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 19; hour++) {
    const period = hour < 12 ? "AM" : "PM";
    const adjustedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert to 12-hour format
    const nextHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12;
    const nextPeriod = hour + 1 < 12 ? "AM" : hour + 1 === 12 ? "PM" : period;
    slots.push(`${adjustedHour} ${period} - ${nextHour} ${nextPeriod}`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Get booking information for a specific class and time
const getBookingInfo = (className, timeSlot) => {
  return bookings.find((b) => b.className === className && b.time === timeSlot);
};

// Predefined colors
const colors = [
  "#FFCDD2",
  "#E1BEE7",
  "#C5CAE9",
  "#BBDEFB",
  "#B3E5FC",
  "#B2DFDB",
  "#C8E6C9",
  "#DCEDC8",
  "#F0F4C3",
  "#FFF9C4",
  "#FFECB3",
  "#FFE0B2",
  "#FFCCBC",
  "#D7CCC8",
  "#F5F5F5",
  "#CFD8DC",
];

// Shuffle and assign a unique color to each class
const assignClassColors = (classes) => {
  const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
  return classes.reduce((acc, className, index) => {
    acc[className] = shuffledColors[index % shuffledColors.length];
    return acc;
  }, {});
};

const ClassroomAvailability = () => {
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4"]; // Add more class names as needed
  const classColors = assignClassColors(classes);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Classroom</TableCell>
            {timeSlots.map((slot, index) => (
              <TableCell key={index} align="center" style={{ padding: "6px" }}>
                {slot}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((className, rowIndex) => (
            <TableRow key={rowIndex} style={{ borderTop: "none" }}>
              <TableCell style={{ padding: "6px" }}>{className}</TableCell>
              {timeSlots.map((timeSlot, colIndex) => {
                const booking = getBookingInfo(className, timeSlot);
                const bookedBy = booking ? booking.bookedBy : null;

                // Determine if the cell is at the start or end of a booking range
                const isStart =
                  colIndex === 0 ||
                  !getBookingInfo(className, timeSlots[colIndex - 1]);
                const isEnd =
                  colIndex === timeSlots.length - 1 ||
                  !getBookingInfo(className, timeSlots[colIndex + 1]);

                const cellStyle = {
                  backgroundColor: booking ? classColors[className] : "white",
                  cursor: booking ? "pointer" : "default",
                  padding: "4px", // Reduced padding for smaller cell height
                  borderTop: "none",
                  borderBottom: "none",
                  minWidth: "70px",
                  borderRadius: booking
                    ? isStart && isEnd
                      ? "100px"
                      : isStart
                      ? "100px 0 0 100px"
                      : isEnd
                      ? "0 100px 100px 0"
                      : "0"
                    : "0",
                  borderLeft: "1px solid #e0e0e0", // Vertical borders
                  borderRight: "1px solid #e0e0e0", // Vertical borders
                  lineHeight: "1.2", // Adjust line height for reduced height
                  height: "40px", // Reduce height for cells
                };

                return (
                  <Tooltip
                    key={colIndex}
                    title={bookedBy ? `Booked by: ${bookedBy}` : "Available"}
                  >
                    <TableCell align="center" style={cellStyle}>
                      {booking ? "Booked" : ""}
                    </TableCell>
                  </Tooltip>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassroomAvailability;
