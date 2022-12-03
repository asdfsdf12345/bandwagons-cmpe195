import React from "react";
import { useState } from "react";
import { Avatar, Button, Typography } from "@material-ui/core";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { NavigationState } from "../NavigationContext";
import { useEffect } from "react";

function AvatarUpload() {
  const [imgURL, setImgURL] = useState(null);
  const [image, setImage] = useState(null);
  const {user, setAlert} = NavigationState();

  const uploadImage = () =>{
    if (image == null) return;
    console.log(user.uid);
    const avatarRef = ref(storage, `avatars/${user.uid + "avatar.PNG"}`);
    uploadBytes(avatarRef, image).then(() =>{
      setAlert({
        open:"true",
        message:"image uploaded",
        type:"success",
      })
    });
  }

  useEffect((imgURL) => {
    getDownloadURL(ref(storage, `avatars/${user.uid + "avatar.PNG"}`))
    .then((url) => {
    setImgURL(url);
    
    console.log(imgURL);
    setAlert({
      open:"true",
      message:"image retrieved",
      type:"success",
    })
  })
  .catch((error) => {
    // Handle any errors
  });

  return () => {
    
  }

  }, [imgURL]);
  

  

  


  
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />
      <br/>
      <Button
        variant='contained'
        style={{
        marginTop: 10, 
        marginBottom: 10,
        width: 175, 
        backgroundColor:"#fc3934", 
        border: 'solid',
        borderColor: '#fccb00',
        borderWidth: 2,
        color: 'white',}}
        onClick={uploadImage}
      >
        Upload Image
      </Button>
    
    </div>
  );
}
export default AvatarUpload;