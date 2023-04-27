// import React from 'react';
// import { Box, Button, Container, Grid, Typography } from '@mui/material';

// const Landing = () => {

//   return (
//     <Box sx={{ backgroundColor: '#f5f5f5' }}>
//       <Box sx={{ backgroundColor: '#fff', py: '64px' }}>
//         <Container maxWidth="sm">
//           <Typography variant="h2" component="h1" align="center" gutterBottom>
//             Section 1
//           </Typography>
//           <Typography variant="h5" component="p" align="center" gutterBottom>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dolor ut arcu pharetra interdum.
//           </Typography>
//         </Container>
//       </Box>
//       <Box sx={{ backgroundColor: '#f5f5f5', py: '64px' }}>
//         <Container maxWidth="sm">
//           <Typography variant="h2" component="h1" align="center" gutterBottom>
//             Section 2
//           </Typography>
//           <Typography variant="h5" component="p" align="center" gutterBottom>
//             Vestibulum id nulla id ipsum volutpat lobortis vel non erat.
//           </Typography>
//         </Container>
//       </Box>
//       <Box sx={{ backgroundColor: '#fff', py: '64px' }}>
//         <Container maxWidth="sm">
//           <Typography variant="h2" component="h1" align="center" gutterBottom>
//             Section 3
//           </Typography>
//           <Typography variant="h5" component="p" align="center" gutterBottom>
//             Maecenas gravida tincidunt semper. Sed sollicitudin interdum nisl.
//           </Typography>
//         </Container>
//       </Box>
//       <Box sx={{ backgroundColor: '#f5f5f5', py: '64px' }}>
//         <Container maxWidth="sm">
//           <Typography variant="h2" component="h1" align="center" gutterBottom>
//             Section 4
//           </Typography>
//           <Typography variant="h5" component="p" align="center" gutterBottom>
//             Donec ullamcorper ex ac odio tempus, vel semper ipsum feugiat.
//           </Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: '24px' }}>
//             <Button variant="contained" color="primary">
//               Get Started
//             </Button>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Landing;
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

function UserPage() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [tasks, setTasks] = useState(Array(8).fill(Array(7).fill("")));
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleTaskChange = (event, row, col) => {
    const newTasks = [...tasks];
    newTasks[row][col] = event.target.value;
    setTasks(newTasks);
  };

  const handleAddUser = () => {
    // Save user to database or perform other actions
    console.log(`Username: ${username}, Phone: ${phone}, Tasks: ${tasks}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          User Page
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Add User
              </Typography>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={handleUsernameChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={handlePhoneChange}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" onClick={handleAddUser}>
                Add
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Tasks
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      {daysOfWeek.map((day) => (
                        <TableCell key={day}>{day}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>Task {i + 1}</TableCell>
                        {row.map((col, j) => (
                          <TableCell key={j}>
                            <TextField
                              value={tasks[i][j]}
                              onChange={(e) => handleTaskChange(e, i, j)}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default UserPage;
