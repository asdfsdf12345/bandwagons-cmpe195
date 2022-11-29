import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';

export default function HobbyTagChoices() {
  const [formats, setFormats] = React.useState(() => ['']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <div style={{ width: '100%' }}>
      <Box
        component = "form"
        display = "flex"
        justifyContent = "center"
        flexWrap = 'wrap'
        sx={{
          '& > :not(style)': {m: 1, maxWidth: 800},       
        }}
        noValidate
        autoComplete="off"
      >
        <FormGroup row sx={{ columnGap: 3 }}>
            <FormControlLabel disable control={<Checkbox/>} label="Painting"/>
            <FormControlLabel disable control={<Checkbox/>} label="Crafts"/>
            <FormControlLabel disable control={<Checkbox/>} label="Music"/>
            <FormControlLabel disable control={<Checkbox/>} label="Dance"/>
            <FormControlLabel disable control={<Checkbox/>} label="Literary"/>
            <FormControlLabel disable control={<Checkbox/>} label="Discussion/Debate"/>
            <FormControlLabel disable control={<Checkbox/>} label="Tutor/Education"/>
            <FormControlLabel disable control={<Checkbox/>} label="Career"/>
            <FormControlLabel disable control={<Checkbox/>} label="Team Sports"/>
            <FormControlLabel disable control={<Checkbox/>} label="Martial Arts"/>
            <FormControlLabel disable control={<Checkbox/>} label="Fitness"/>
            <FormControlLabel disable control={<Checkbox/>} label="Outdoor"/>
            <FormControlLabel disable control={<Checkbox/>} label="Motorsports"/>
            <FormControlLabel disable control={<Checkbox/>} label="Extreme"/>
            <FormControlLabel disable control={<Checkbox/>} label="Nature"/>
            <FormControlLabel disable control={<Checkbox/>} label="Relaxing/Tranquil"/>
            <FormControlLabel disable control={<Checkbox/>} label="Health"/>
            <FormControlLabel disable control={<Checkbox/>} label="Volunteer"/>
            <FormControlLabel disable control={<Checkbox/>} label="Gardening"/>
            <FormControlLabel disable control={<Checkbox/>} label="Collecting"/>
            <FormControlLabel disable control={<Checkbox/>} label="Tabletop Games"/>
            <FormControlLabel disable control={<Checkbox/>} label="Clothing"/>
            <FormControlLabel disable control={<Checkbox/>} label="Cooking"/>
            <FormControlLabel disable control={<Checkbox/>} label="Engineering/Utility"/>
            <FormControlLabel disable control={<Checkbox/>} label="Restoration"/>
            <FormControlLabel disable control={<Checkbox/>} label="Animals"/>
        </FormGroup>
      </Box>
    </div>
  );
}