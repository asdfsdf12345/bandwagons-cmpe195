import { Avatar, IconButton } from "@material-ui/core";
import React, { useRef, useState } from "react";

const AvatarUpload = () => { 
  const [selectedImage, setSelectedImage] = useState();
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleClick = (event) => {
    inputRef.current.click();
  };

  return (
  <>
    <input
      accept="image/*"
      style={{ display: 'none' }}
      onChange={handleChange}
      id="raised-button-file"
      multiple
      type="file"
    />
    <IconButton>
      <label htmlFor="raised-button-file">
        <Avatar 
          src={selectedImage}
          style={{
            margin: "10px",
            width: "60px",
            height: "60px",
          }} 
        />
      </label>  
    </IconButton>
    
    
  </>
)};

export default AvatarUpload;