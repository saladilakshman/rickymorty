/* eslint-disable react/prop-types */

import {Container,Stack,Typography,FormControl,useTheme,MenuItem,Select}from "@mui/material";
import CharactersLayout from "./characterslayout";
import axios from "axios";
import {useState,useEffect,useContext} from "react";
import {AppContext} from "../App";
import "../App.css";
import Loader from "./loader"
export default function Location(){
    const[locations,setLocations]=useState({});
    const[num,setNum]=useState(1);
    const{name,type,dimension,residents}=locations;
    const[locationdetails,setLocationdetails]=useState([]);
    const[spin,setSpin]=useState(true)
    const {isChecked}=useContext(AppContext)
 const theme=useTheme();
    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/location/${num}`)
          .then((res) =>{ 
            setLocations(res.data) // Assuming `id` contains the location number
            setSpin(false);
          })
          .catch((err) => console.log(err.message));
      }, [num]);
      
    
      useEffect(() => {
        // Check if characters is an array before proceeding
        if(Array.isArray(residents) && residents.length>0){
          Promise.all(residents.map((characterlink) => axios.get(characterlink)))
            .then((responses) => {
              const characterData = responses.map((res) => res.data);
              setLocationdetails(characterData);
    
            })
            .catch((err) => console.log(err));
          }
      }, [residents]);

     let TotalLocations=[];
     let i=0;
     do{
      i++;
      TotalLocations.push(i);
     }while(i<127)

      const locationselection=(event,number)=>{
        const{props}=number;
        document.startViewTransition(()=>{
          setNum(props.value)
          setLocations({})
          setSpin(true)
        })
    
      }

    return (
        <Container sx={{marginBlockStart:5,marginBlockEnd:5}}>
            {spin?(
                 <Loader/>
            ):(
                <>
                <Stack direction="column"justifyContent="space-around"alignItems="center"gap={2}>
                <Typography variant="h6"color="primary">
                 <span>Location</span> : {name}</Typography>
                <Typography variant="body1"color="inherit">Dimension : {dimension}</Typography>
                <Typography variant="body2"color="inherit">Type : {type}</Typography>
                <Stack direction="row" justifyContent="center" alignItems="center"gap={1}>
          <Typography variant="body2">Choose your episode no : </Typography>
          <FormControl sx={{width:100,border:isChecked?'':'2px solid #fff'}}size="small">
            <Select labelId="episode-label" id="episodelabel"value={num}
             onChange={locationselection}
             sx={{
              backgroundColor:isChecked?'white':'',
              color:theme.palette.primary.main,
              }}>
              {TotalLocations.map((count, index) => {
                return <MenuItem key={index} value={count}>{count}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Stack>    
                </Stack>
                <div style={{
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  marginInlineStart:18
                  }}>
              <div className="characters-layout">
              {locationdetails.map((characterepisode)=>{
                  const{id,name,image,gender,location,status}=characterepisode;
                  return <CharactersLayout 
                         key={id}
                         name={name}
                         image={image}
                         gender={gender}
                         location={location.name}
                         status={status}/>
                })}
              </div>
              </div>
              </>  
            )}
       
        </Container>
    )
}