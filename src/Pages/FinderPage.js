// Page to find new Profile/Friend, or Group, or Location

import React from 'react'
import AvatarUpload from "../components/AvatarUpload";
import {GoogleMap, useJsApiLoader, Marker,InfoWindow,  } from "@react-google-maps/api";
import { useCallback } from 'react';
import { useRef } from 'react';
import { apiKey, libraries } from '../firebase';
import SearchIcon from '@material-ui/icons/Search';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import { useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, ListItem, ListItemText, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import AutoSizer from "react-virtualized-auto-sizer";
import { borderColor } from '@mui/system';
import mapStyles from '../mapStyles';
import axios from 'axios';
import { FixedSizeList } from 'react-window';
import { async } from '@firebase/util';
import { NavigationState } from '../NavigationContext';

const initial = {
  lat: 37.338207,
  lng: -121.886330,
}

const mapContainerStyle ={
  float:"right",
  height: '95vh',
  width: '80vw',
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

export default function FinderPage(){


  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const mapRef = useRef()
  const onMapLoad = useCallback((map) =>{
    mapRef.current = map;
  }, []);

  const {setAlert} = NavigationState();

  const panTo = async (lat, lng) => {
    try{
        
      mapRef.current.panTo({lat,lng});
      mapRef.current.setZoom(20);

  }catch (error) {
    setAlert({
      open: true,
      message: error.message,
      type: 'error',
    });
  }

  
};


  const [query,setQuery] = useState("");
  const [radius, setRadius] = useState('16093');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('3');
  const [names, setNames] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [priceLevels, setPriceLevels] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [lats, setLats] = useState([]);
  const [lngs, setLngs] = useState([]);

  const google = window.google;

  const handleRadius = (event) => {
    setRadius(event.target.value);
    console.log(radius);
  };
  const handleMinPrice = (event) => {
    setMinPrice(event.target.value);
    console.log(minPrice);
  };
  const handleMaxPrice = (event) => {
    setMaxPrice(event.target.value);
  };

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading...";




  const handleKey = (event) => {
    event.code === "Enter" && handleSearch();
  };

  const handleSearch = async() => {
  
    try{
      const results1 = [];
      const results2 = [];
      const results3 = [];
      const results4 = [];
      const results5 = [];
      const results6 = [];
      const results7 = [];
    
    
      const center = new google.maps.LatLng(37.338207, -121.886330);
    
      const request = {
        location:center,
        radius: radius,
        query: query,
        minprice: minPrice,
        maxPrice: maxPrice,
      }
    
      const service = new google.maps.places.PlacesService(mapRef.current);
      service.textSearch(request, callback);
    
      async function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            console.log(place);
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
            results1.push(place.name);
            results2.push(place.formatted_address);
            if(place.photos){ 
              results3.push(place.photos[0].getUrl());
            }
            results4.push(place.price_level);
            results5.push(place.rating);
            results6.push(place.geometry.location.lat())
            results7.push(place.geometry.location.lng())
          }
          setNames(results1);
          setAddresses(results2);
          }
          setNames(results1);
          setAddresses(results2);
          setPhotos(results3);
          setPriceLevels(results4);
          setRatings(results5);
          setLats(results6)
          setLngs(results7)
        }
      
      
    } catch(error){
      setAlert({
        open:"true",
        message:error.message,
        type:"error"
      })
    }

  }

  function renderRow(props) {
    const { index, style } = props;

    return (
        
      <ListItem button onClick={() => panTo(lats[index], lngs[index])} alignItems="flex-start" divider style={style} key={index}>
        <img src={photos[index]} style={{maxWidth:120, maxHeight:130, float:"left", marginLeft:-10, marginTop:10}}></img>
        
        <ListItemText primary={`${names[index]}` } secondary={`${addresses[index]}`} style={{maxWidth:150, marginLeft:10}} />
        <ListItemText 
        primary={<div  style={{marginTop:-5}}> <StarOutlinedIcon style={{float: "right", marginLeft:10, color:"gold",}}/><div style={{float: "right", marginTop:2}}> {`rating: ${ratings[index]}`}</div></div>} 
        />
        
            
              
              
      </ListItem>
    );
  }
  

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={initial}
        options={options}
        onLoad={onMapLoad}
      ></GoogleMap>
      
      <div style={{height: '92vh', width: '20vw', float:"left"}}
      >
        <div style={{
                
                height:60,
                width:"inherit",
                borderBottomStyle:"solid",  
                borderColor:"gray"
              }}>
            
            <SearchIcon style={{float:"left", width:40, height:60, color:"gray",}}></SearchIcon>
            
            <div
              style={{
                float:"left",
                height:60,
                width:"18vw"
              }}
            >
            <TextField
              id="search input"
              placeholder="Search By Category, Name, or Address..."
              variant= "outlined"
              onKeyDown={handleKey}
              style={{
                float:"left",
                height:60,
                width:"18vw",
                marginLeft:7
              }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            >
              
            </TextField>
            </div>
            
          </div>
          <Typography style={{marginTop:10, fontWeight:"bold", fontSize:18}}>
            Filters:
          </Typography>
          <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Radius</FormLabel>
            <RadioGroup aria-label="radius" name="radius1" value={radius} onChange={handleRadius}>
              <FormControlLabel value="16093" control={<Radio />} label="10 miles" />
              <FormControlLabel value="24140" control={<Radio />} label="15 miles" />
              <FormControlLabel value="32186" control={<Radio />} label="20 miles" />
              <FormControlLabel value="40233" control={<Radio />} label="25 miles" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" style={{float:"right", marginRight:30}}>
            <FormLabel component="legend">Max Price</FormLabel>
            <RadioGroup aria-label="minPrice" name="minPrice1" value={maxPrice} onChange={handleMaxPrice}>
              <FormControlLabel value="0" control={<Radio />} label= {<AttachMoneyIcon fontSize='small'/>} />
              <FormControlLabel value="1" control={<Radio />} label={<div><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/></div>} />
              <FormControlLabel value="2" control={<Radio />} label={<div><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/></div>} />
              <FormControlLabel value="3" control={<Radio />} label={<div><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/></div>} />
            </RadioGroup>
          </FormControl>
          
          <FormControl component="fieldset" style={{float:"right", marginRight:30}}>
            <FormLabel component="legend">Min Price</FormLabel>
            <RadioGroup aria-label="maxPrice" name="maxPrice1" value={minPrice} onChange={handleMinPrice}>
              <FormControlLabel value="0" control={<Radio />} label= {<AttachMoneyIcon fontSize='small'/>} />
              <FormControlLabel value="1" control={<Radio />} label={<div><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/></div>} />
              <FormControlLabel value="2" control={<Radio />} label={<div><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/></div>} />
              <FormControlLabel value="3" control={<Radio />} label={<div><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/><AttachMoneyIcon fontSize='small'/></div>} />
            </RadioGroup>
          </FormControl>
          </div>
          <div
       style={{height: '71vh', width: '20vw', marginTop:20}}
        
    >
      <Typography style={{marginTop:10, fontWeight:"bold", fontSize:18}}> Search Results:</Typography>
        <AutoSizer>
        {({height, width}) => (
            <FixedSizeList height={height} width={width} itemSize={150} itemCount={names.length} 
            style={{ 
            //borderRightStyle:"solid",
            borderTopStyle:"solid", 
            borderColor: "gray",
            borderWidth: 3,
            //backgroundColor:"#fce547",
            }}>
            {renderRow}
        </FixedSizeList>
        )}
        </AutoSizer>,
                
    </div> 
      </div>

      

    </div>
    
  )
}
