import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function HobbyTagChoices() {
  const [formats, setFormats] = React.useState(() => ['']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <div>
        <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        >
            <ToggleButton value="Painting" aria-label="Painting">Painting</ToggleButton>
            <ToggleButton value="Crafts" aria-label="Crafts">Crafts</ToggleButton>
            <ToggleButton value="Music" aria-label="Music">Music</ToggleButton>
            <ToggleButton value="Dance" aria-label="Dance">Dance</ToggleButton>
            <ToggleButton value="Literary" aria-label="Literary">Literary</ToggleButton>
            <ToggleButton value="Discussion/Debate" aria-label="Discussion/Debate">Discussion/Debate</ToggleButton>
            <ToggleButton value="Tutor/Education" aria-label="Tutor/Education">Tutor/Education</ToggleButton>
            <ToggleButton value="Career" aria-label="Career">Career</ToggleButton>
            <ToggleButton value="Team Sports" aria-label="Team Sports">Team Sports</ToggleButton>
            <ToggleButton value="Martial Arts" aria-label="Martial Arts">Martial Arts</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        >
            <ToggleButton value="Fitness" aria-label="Fitness">Fitness</ToggleButton>
            <ToggleButton value="Outdoor" aria-label="Outdoor">Outdoor</ToggleButton>
            <ToggleButton value="Motorsports" aria-label="Motorsports">Motorsports</ToggleButton>
            <ToggleButton value="Extreme" aria-label="Extreme">Extreme</ToggleButton>
            <ToggleButton value="Nature" aria-label="Nature">Nature</ToggleButton>
            <ToggleButton value="Relaxing/Tranquil" aria-label="Relaxing/Tranquil">Relaxing/Tranquil</ToggleButton>
            <ToggleButton value="Health" aria-label="Health">Health</ToggleButton>
            <ToggleButton value="Volunteer" aria-label="Volunteer">Volunteer</ToggleButton>
            <ToggleButton value="Gardening" aria-label="Gardening">Gardening</ToggleButton>
            <ToggleButton value="Collecting" aria-label="Collecting">Collecting</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        >
            <ToggleButton value="Tabletop Games" aria-label="Tabletop Games">Tabletop Games</ToggleButton>
            <ToggleButton value="Clothing" aria-label="Clothing">Clothing</ToggleButton>
            <ToggleButton value="Cooking" aria-label="Cooking">Cooking</ToggleButton>
            <ToggleButton value="Engineering/Utility" aria-label="Engineering/Utility">Engineering/Utility</ToggleButton>
            <ToggleButton value="Restoration" aria-label="Restoration">Restoration</ToggleButton>
            <ToggleButton value="Animals" aria-label="Animals">Animals</ToggleButton>
        </ToggleButtonGroup>
    </div>

  );
}
