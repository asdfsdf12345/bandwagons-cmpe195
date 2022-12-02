// Page to find new Profile/Friend, or Group, or Location

import React from 'react'
import AvatarUpload from "../components/AvatarUpload";
import {GoogleMap, useLoadScript, Marker,InfoWindow,} from "@react-google-maps/api";
import { useCallback } from 'react';
import { useRef } from 'react';
import { libraries } from '../firebase';

const center = {
  lat: 37.774929,
  lng: -122.419418,
}

const mapContainerStyle ={
  float:"right",
  height: '92vh',
  width: '70vw',
}

export default function FinderPage(){

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB7pJIcuBN4lEusCDYBVkbQQK6m-EJg12w",
    libraries,
  });

  const mapRef = useRef()
  const onMapLoad = useCallback((map) =>{
    mapRef.current = map;
  }, []);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) {
    return "Loading...";
  }
  


  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onLoad={onMapLoad}
      ></GoogleMap>

    </div>
    
  )
}
