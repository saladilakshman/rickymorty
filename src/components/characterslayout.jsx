/* eslint-disable react/prop-types */
import {Paper,Typography} from "@mui/material";
import "../App.css";
const CharactersLayout=({key,name,image,gender,location,status})=>{
    function coloring() {
        switch (status) {
          case "Alive":
            return "#623CEA";
          case "Dead":
            return "#D62828";
          case "unknown":
            return "grey";
          default:
            return null
        }
      }
    return(
       <div key={key} className="card">
            <img src={image} alt="" className="img" />
            <Paper sx={{
              bgcolor:coloring(),
              color:'white',
              p:0.2,
              fontFamily:'roboto',
              fontSize:12,
              paddingInlineStart:1,
              paddingInlineEnd:1
              }}>{status}</Paper>
            <Typography variant="body1">{name}</Typography>
            <Typography variant="body2">{gender}</Typography>
            <Typography variant="body2">
              <span>Last known location</span>:<br />
              {location}
            </Typography>
          </div>
   
)
}
export default CharactersLayout