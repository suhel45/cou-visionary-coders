/** @format */

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";

const PersonalInformation = () => {
  return (
    <Card sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <CardHeader
        title={
          <Typography variant="h4" align="center" fontWeight="bold">
            Personal Information
          </Typography>
        }
      />
      <CardContent>
        <form>
        <Grid container spacing={3}>
          {/* Biodata No */}
          <Grid item xs={12} md={6} >
            <TextField
              fullWidth
              label="Biodata No"
              id="biodataNo"
              placeholder="Enter Biodata Number"
            />
          </Grid>

          {/* Biodata Type */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Biodata Type"
              id="biodataType"
              defaultValue="">
              <MenuItem value="bride">Bride</MenuItem>
              <MenuItem value="groom">Groom</MenuItem>
            </TextField>
          </Grid>

          {/* Marital Status */}
          <Grid item xs={12} md={6} >
            <TextField
              fullWidth
              select
              label="Marital Status"
              id="maritalStatus"
              defaultValue="">
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="divorced">Divorced</MenuItem>
            </TextField>
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12} md={6} >
            <TextField
              fullWidth
              label="Date of Birth"
              id="dob"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Height */}
          <Grid item xs={12} md={6} >
            <TextField
              fullWidth
              label="Height (cm)"
              id="height"
              type="number"
              placeholder="Enter height"
            />
          </Grid>

          {/* Weight */}
          <Grid item xs={12} md={6} >
            <TextField
              fullWidth
              label="Weight (kg)"
              id="weight"
              type="number"
              placeholder="Enter weight"
            />
          </Grid>

          {/* Complexion */}
          <Grid item xs={12} md={6} >
            <TextField
              fullWidth
              select
              label="Complexion"
              id="complexion"
              defaultValue="">
              <MenuItem value="fair">Fair</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </TextField>
          </Grid>

          {/* Blood Group */}
          <Grid item xs={12} md={6} >
            <TextField
              fullWidth
              select
              label="Blood Group"
              id="bloodGroup"
              defaultValue="">
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
            </TextField>
          </Grid>

          {/* Session */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Session"
              id="session"
              placeholder="Enter session"
            />
          </Grid>

          {/* Department */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Department"
              id="department"
              placeholder="Enter department"
            />
          </Grid>

          {/* Nationality */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nationality"
              id="nationality"
              placeholder="Enter nationality"
            />
          </Grid>
        </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;
