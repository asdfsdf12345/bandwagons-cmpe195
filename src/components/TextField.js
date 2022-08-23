import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const states = [
  {
    value: 'California'
  },
  {
    value: 'California'
  },
  {
    value: 'California'
  },
  {
    value: 'Oregon'
  },
];

export default function BasicTextFields() {

  const [state, setState] = React.useState('Oregon');
  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-name-input"
        label="Name"
        type="name"
        variant="standard"
      />

      <TextField
        id="standard-states-select"
        select
        label="State"
        value={state}
        onChange={handleStateChange}
        helperText="Please select your state"
        variant="standard"
      >
        {states.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>

    </Box>
  );
}