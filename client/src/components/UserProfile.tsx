/** @format */

import React, { useContext } from 'react';
import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';
import manImg from '../assets/man.png';
import womenImg from '../assets/woman.png';
import { AuthContext } from '../Hooks/contextApi/UserContext';

const UserProfile = () => {
  const isPerson = false;
  //Fake data for biodata details
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is null');
  }

  const { user } = authContext;

  // Ensure user is not null before accessing properties
  if (!user) {
    return <Typography>User is not authenticated</Typography>;
  }

  const displayName = user.displayName;
  console.log(displayName);
  const biodataDetails = [
    { id: 1, name: 'Biodata Type', value: "Male's Biodata" },
    { id: 2, name: 'Marital Status', value: 'Never Married' },
    { id: 3, name: 'Birth Year', value: 'May, 1998' },
    { id: 4, name: 'Height', value: "5'1" },
    { id: 5, name: 'Complexion', value: 'Very Fair' },
    { id: 6, name: 'Weight', value: '54 kg' },
    { id: 7, name: 'Blood Group', value: 'B+' },
    { id: 8, name: 'Nationality', value: 'Bangladeshi' },
  ];

  return (
    <Card
      sx={{
        maxWidth: 450,
        bgcolor: '#d0d3ff',
        borderRadius: 6,
        m: 3,
        p: 3,
      }}
    >
      <p>Hello {displayName}</p>
      <Box
        display="flex"
        gap={2}
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          alignItems: {
            xs: 'center',
            sm: 'flex-start',
          },
        }}
      >
        {/* Avatar Section */}
        <Avatar
          src={isPerson ? womenImg : manImg}
          sx={{
            width: 100,
            height: 100,
            p: 1,
            border: '2px solid #652c8b',
            bgcolor: '#fffff2',
            '& .MuiSvgIcon-root': { color: '#E91E63' },
          }}
        />

        {/* Biodata Info Section */}
        <Box
          sx={{
            flex: 1,
            bgcolor: '#fffff2',
            borderRadius: 4,
            p: 1,
          }}
        >
          {/* Biodata Number */}
          <Box
            sx={{
              bgcolor: '#652c8b',
              color: 'white',
              borderRadius: 50,
              p: 1,
              mb: 1,
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
              Biodata No : BD-1234
            </Typography>
          </Box>

          {/* Biodata Status */}
          <Box
            sx={{
              bgcolor: '#652c8b',
              color: 'white',
              borderRadius: 50,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
              Biodata Status :{' '}
            </Typography>
            <Box
              sx={{
                bgcolor: '#42d64c',
                px: 1,
                borderRadius: 50,
                fontSize: '0.875rem',
                fontWeight: 'bold',
              }}
            >
              Verified
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Details Section */}
      <CardContent
        sx={{
          bgcolor: '#fffff2',
          borderRadius: 4,
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 1,
            fontWeight: 'bold',
          }}
        >
          {biodataDetails.map(({ id, name, value }) => (
            <React.Fragment key={id}>
              <Typography
                sx={{
                  color: '#8e8e8e',
                  py: 0.5,
                  fontWeight: 'bold',
                }}
              >
                {name}
              </Typography>
              <Typography
                sx={{
                  color: 'black',
                  py: 0.5,
                }}
              >
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
