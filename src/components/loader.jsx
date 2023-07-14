import { CircularProgress,useMediaQuery } from "@mui/material";
const Loader=()=>{
    const mobileOption=useMediaQuery("(max-width:425px)");
        return(
        <CircularProgress color="primary"sx={{
            position:'absolute',
            top:'50%',
            left:mobileOption?'45%':'50%',
            transform:'translate(-50%,-50%)'
          }}/>
    )
}
export default Loader