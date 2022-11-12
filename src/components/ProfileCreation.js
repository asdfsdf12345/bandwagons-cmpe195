import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from "@material-ui/core";
import Stack from '@mui/material/Stack';

export default function ProfileCreationButton() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        display = "flex"
        justifyContent = "center"
        sx={{
          '& > :not(style)': {m: 1, maxWidth: 800},       
        }}
        noValidate
        autoComplete="off"
      >
        <Button
          variant="contained"
          display = "flex"
          justifyContent= "center"
        >
        Save Profile
        </Button>
      </Box>
    </div>
  );
}