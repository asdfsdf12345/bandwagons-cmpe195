import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CenterFocusStrong } from '@material-ui/icons';

const states = [
  {value: 'Alabama'}, {value: 'Alaska'},
  {value: 'Arizona'}, {value: 'Arkansas'},
  {value: 'California'}, {value: 'Colorado'},
  {value: 'Delaware'}, {value: 'Florida'},
  {value: 'Georgia'}, {value: 'Hawaii'},
  {value: 'Idaho'}, {value: 'Illinois'},
  {value: 'Indiana'}, {value: 'Iowa'},
  {value: 'Kansas'}, {value: 'Kentucky'},
  {value: 'Louisiana'}, {value: 'Maine'},
  {value: 'Maryland'}, {value: 'Massachusetts'},
  {value: 'Michigan'}, {value: 'Minnesota'},
  {value: 'Mississippi'}, {value: 'Missouri'},
  {value: 'Montana'}, {value: 'Nebraska'},
  {value: 'Nevada'}, {value: 'New Hampshire'},
  {value: 'New Jersey'}, {value: 'New Mexico'},
  {value: 'New York'}, {value: 'North Carolina'},
  {value: 'North Dakota'}, {value: 'Ohio'},
  {value: 'Oklahoma'}, {value: 'Oregon'},
  {value: 'Pennsylvania'}, {value: 'Rhode Island'},
  {value: 'South Carolina'}, {value: 'South Dakota'},
  {value: 'Tennessee'}, {value: 'Texas'},
  {value: 'Utah'}, {value: 'Vermont'},
  {value: 'Virginia'}, {value: 'Washington'},
  {value: 'West Virginia'}, {value: 'Wisconsin'}, 
  {value: 'Wyoming'}
];

export default function BasicTextFields() {
  
  const [state, setState] = React.useState('');
  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  return (
    <Box
      component = "form"
      display = "flex"
      flexDirection = "column"
      alignItems = "center"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },       
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
        id="standard-name-input"
        label="Name"
        type="name"
        fullWidth
        variant="outlined"
        size="small"
      />
      </div>

      <div>
      <TextField
        id="standard-bio-input"
        label="Bio"
        type="bio"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        size="normal"
      />
      </div>

      <div>
      <TextField
        id="standard-states-select"
        select
        label="State"
        value={state}
        onChange={handleStateChange}
        helperText="Please select your state"
        fullWidth
        variant="outlined"
        size="small"
      >
        {states.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      </div>

    </Box>
  );
}