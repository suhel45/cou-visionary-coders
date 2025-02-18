/** @format */

import React from "react";
import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";
import img from "../assets/man.png";

const UserProfile = () => {
  const biodataDetails = [
    ["Biodata Type", "Female's Biodata"],
    ["Marital Status", "Never Married"],
    ["Birth Year", "May, 1998"],
    ["Height", "5'1"],
    ["Complexion", "Very Fair"],
    ["Weight", "54 kg"],
    ["Blood Group", "B+"],
    ["Nationality", "Bangladeshi"],
  ];

  return (
    <Card
      sx={{
        maxWidth: 400,
        bgcolor: "#d0d3ff", 
        borderRadius: 6,
        p: 3,
      }}>
      <Box display="flex" gap={2}>
        {/* Avatar Section */}
        <Avatar
          src={img}
          sx={{
            width: 96,
            height: 96,
            p: 1,
            bgcolor: "#f1fed0", // Light yellow background
            "& .MuiSvgIcon-root": { color: "#E91E63" }, // Pink icon
          }}
        />

        {/* Biodata Info Section */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#efffd2", // Light yellow background
            borderRadius: 4,
            p: 1,
          }}>
          {/* Biodata Number */}
          <Box
            sx={{
              bgcolor: "#5E2181", // Deep purple
              color: "white",
              borderRadius: 50,
              p: 1,
              mb: 1,
              textAlign: "center",
            }}>
            <Typography>Biodata No : BD-1234</Typography>
          </Box>

          {/* Biodata Status */}
          <Box
            sx={{
              bgcolor: "#5E2181", // Deep purple
              color: "white",
              borderRadius: 50,
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Typography>Biodata Status :</Typography>
            <Box
              sx={{
                bgcolor: "green",
                px: 2,
                py: 0.5,
                borderRadius: 50,
                fontSize: "0.875rem",
              }}>
              Verified
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Details Section */}
      <CardContent
        sx={{
          bgcolor: "#f1fed0",
          borderRadius: 4,
          mt: 2,
        }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 1,
          }}>
          {biodataDetails.map(([name, value], index) => (
            <React.Fragment key={index}>
              <Typography
                sx={{
                  color: "#4B4B4B",
                  py: 0.5,
                }}>
                {name}
              </Typography>
              <Typography
                sx={{
                  color: "#4B4B4B",
                  py: 0.5,
                }}>
                : {value}
              </Typography>
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
