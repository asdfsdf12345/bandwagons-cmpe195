import React from "react";
import { useState } from "react";
import { Avatar, Button } from "@material-ui/core";
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
    const avatarRef = ref(storage, `posts/${user.uid + "avatar.PNG"}`);
    uploadBytes(avatarRef, image).then(() =>{
      setAlert({
        open:"true",
        message:"image uploaded",
        type:"success",
      })
    });
  }

  useEffect(() => {
    getDownloadURL(ref(storage, `avatars/${user.uid + "avatar.PNG"}`))
    .then((url) => {
    setImgURL(url);
    
  })
  .catch((error) => {
    // Handle any errors
  });
  }, []);

  

  


  
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
        onClick={uploadImage}
      >
        Upload Image
      </Button>
    </div>
  );
}
export default AvatarUpload;