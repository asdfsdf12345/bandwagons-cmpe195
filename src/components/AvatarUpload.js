import React from "react";
import Box from '@mui/material/Box';
import Avatar from "react-avatar-edit";
import { useState } from "react";

function AvatarUpload() {
  const [preview, setPreview] = useState(null);
  function onClose() {
    setPreview(null);
  }
  function onCrop(pv) {
    setPreview(pv);
  }
  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 2000000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }
  return (
    <Box
      component = "form"
      display = "flex"
      flexDirection = "column"
      alignItems = "center"
      sx={{
        '& > :not(style)': { m: 1},       
      }}
      noValidate
      autoComplete="off"
    >
    <div>
      <Avatar
        width={200}
        height={200}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={null}
      />
      <br/>
      {preview && (
        <>
          <img src={preview} alt="Preview" />
          <a href={preview} download="avatar">
            Download image
          </a>
        </>
      )}
    </div>
    </Box>
  );
}
export default AvatarUpload;