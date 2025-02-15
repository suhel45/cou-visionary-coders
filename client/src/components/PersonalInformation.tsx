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
          <Typography variant="h6" fontWeight="bold">
            Personal Information
          </Typography>
        }
      />
      <CardContent>
        <form>
          <Grid container spacing={3}>
            {/* Biodata No */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Biodata No"
                id="biodataNo"
                name="biodataNo"
                placeholder="Enter Biodata Number"
                required
              />
            </Grid>

            {/* Biodata Type */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Biodata Type"
                name="biodataType"
                id="biodataType"
                required
                defaultValue="">
                <MenuItem value="bride">Male's Biodata</MenuItem>
                <MenuItem value="groom">Female's Biodata</MenuItem>
              </TextField>
            </Grid>

            {/* Marital Status */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Marital Status"
                id="maritalStatus"
                name="maritalStatus"
                required
                defaultValue="">
                <MenuItem value="neverMarried">Never Married</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="divorced">Divorced</MenuItem>
              </TextField>
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                id="dob"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Height */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Height"
                id="height"
                name="height"
                placeholder="Enter height"
                required>
                <MenuItem value="neverMarried" sx={{ fontSize: "0.875rem" }}>Less than 4 feet</MenuItem>
                <MenuItem value="married" sx={{ fontSize: "0.875rem" }}>4'</MenuItem>
                <MenuItem value="divorced" sx={{ fontSize: "0.875rem" }}>4' 1''</MenuItem>
              </TextField>
            </Grid>

            {/* Weight */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                id="weight"
                name="weight"
                type="number"
                placeholder="Enter weight"
                required></TextField>
            </Grid>

            {/* Complexion */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Complexion"
                id="complexion"
                name="complexion"
                required
                defaultValue="">
                <MenuItem value="fair">Fair</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </TextField>
            </Grid>

            {/* Blood Group */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Blood Group"
                id="bloodGroup"
                name="bloodGroup"
                required
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
                name="session"
                placeholder="Enter session"
                required
              />
            </Grid>

            {/* Department */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Department"
                id="department"
                name="department"
                placeholder="Enter department"
                required
              />
            </Grid>

            {/* Nationality */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nationality"
                id="nationality"
                name="nationality"
                placeholder="Enter nationality"
                required
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;
