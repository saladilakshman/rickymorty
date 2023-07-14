import "../App.css";
import {
  Container,
  Typography,
  Stack,
  Pagination,
  MenuItem,
  Drawer,
  Accordion, AccordionSummary,AccordionDetails,
  ListItemText,
  Button,
  Box, 
  useTheme
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loader from "./loader";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import axios from "axios";
import CharactersLayout from "./characterslayout";
import { useState, useEffect,useContext } from "react";
import debounce from "lodash.debounce";
import {AppContext} from "../App";
export default function Character() {
  const [characters, setCharacters] = useState([]);
  const[isloading,setIsloading]=useState(true);
  const[page,setPage]=useState(1);
  const[pageDetails,setPageDetails]=useState({});
  const{count,pages}=pageDetails;
  const[isDrawerOpen,setIsDrawerOpen]=useState(false);
  const[queryvalue,setQueryvalue]=useState('');
  const[listNames,setListNames]=useState([]);
  const appstyles=useTheme();
  const[hidePagination,setHidePagination]=useState(true);
  const {isChecked}=useContext(AppContext)
  console.log(isChecked)
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => {
        setCharacters(res.data.results)
        setPageDetails(res.data.info)
        setIsloading(false)
        
      })
      .catch((err) => console.log(err.message));
  }, [page]);
  const Genders=['male','female','genderless','unknown'];
  const Species=['Human','Alien','Humanoid','Poopybutthole','Mythological','Unknown','Animal','Disease','Robot','Cronenberg','Planet'];
  const Status=['Dead','Alive','Unknown'];
  const countNumber=Math.ceil(count/pages)
  const styles={
    buttonstyles:{
      color:'#73E2A7',
              borderColor:'#73E2A7',
              fontWeight:'400px',
              '&:focus':{
                borderColor:'#73E2A7',
                backgroundColor:'#73E2A7',
                color:'white'
              },
              "&:hover":{
                borderColor:'#73E2A7'
              }
              
            },
          
    }

  const DrawerClose=()=>{
    setIsDrawerOpen(false)
  }

  const filteringcharacters = async(searchQuery) => {
    setIsloading(true);
    setIsDrawerOpen(false)
    const url = `https://rickandmortyapi.com/api/character/${searchQuery}`;
    console.log(url)
  try {
    const res = await axios.get(url,{responseType:'json'});
    setCharacters(res.data.results);
    setPageDetails(res.data.info);
    setIsloading(false);
  } catch (error) {
    console.log(error.message);
  }
}
  useEffect(()=>{
filteringcharacters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

 
const characterfilter=(e)=>{
 let val=e.target.value;
 setQueryvalue(val)
}

/**fetching the characters based on text value entered by the user in search field */
useEffect(()=>{
  const fetchdata=debounce(()=>{
   axios.get(`https://rickandmortyapi.com/api/character/?name=${queryvalue}`)
   .then(res=>{
    const listofNames=res.data.results.filter((character)=>character.name.includes(queryvalue))
    setListNames(listofNames) 
  })
   .catch(err=>console.log(err.name))
  },300)
  fetchdata();
  return ()=>{
    fetchdata.cancel()
  }
},[queryvalue])

const themeStyles={
  dark:appstyles.palette.common.black,
  white:appstyles.palette.common.white
}
const ThemeModeColors={
  backgroundColor:isChecked?themeStyles.dark:themeStyles.white,
  color:isChecked?themeStyles.white:themeStyles.dark
}

  return (
    
      <Container sx={{ marginTop: 5 ,marginBottom:5}}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div className="searchbox">
<FilterListIcon className="icon"onClick={()=>setIsDrawerOpen(true)}/>
<input type="Search"placeholder="Search"className="input"value={queryvalue}onChange={characterfilter}/>
    <div className="list">
      {listNames.map((name,index)=>{
        return <MenuItem key={index}>
               <ListItemText
               onClick={async(e)=>{
                setQueryvalue(e.currentTarget.textContent)
                await axios.get(`https://rickandmortyapi.com/api/character/?name=${e.currentTarget.textContent}`)
                .then(res=>{
                  setHidePagination(false)
                  setCharacters(res.data.results) 
                })
                .catch(err=>console.log(err.message))
               }}>
                {name.name}
                </ListItemText>
                </MenuItem>
      })}
    </div>
    </div>
        </div>

       
        <div className="layout">
          {isloading?
          (
         <Loader/>
          ):
          (
           
            <div className="characters-layout">
          {characters.map((character)=>{
            const{id,name,image,gender,location,status}=character;
            return <CharactersLayout 
                   key={id}
                   name={name}
                   image={image}
                   gender={gender}
                   location={location.name}
                   status={status}/>
          })}
          </div>
          )}
        </div> 
       
      {hidePagination&&<Stack direction="row"justifyContent="center"alignItems="center"
        sx={{marginBlockStart:6}}>
          {!isloading?(
             <Pagination 
             count={countNumber}
             page={page}
             onChange={(event,newVal)=>{
               setPage(Number(newVal))
               setIsloading(true)
               setCharacters([])
             }}
             color="primary"
             className="pagination"
             />
            
          ):('')}
        </Stack>
}
       

  <Drawer 
  open={isDrawerOpen}
  onClose={DrawerClose} 
  sx={{height:'100%',p:12}}
  className="drawer-component">
  <Box sx={{
    height:'100%',
    backgroundColor:ThemeModeColors.backgroundColor
    }}>
  <Typography variant="body1"sx={{marginTop:1,p:2,color:ThemeModeColors.color}}>Filter charactes by</Typography>
  
  
  <Accordion sx={ThemeModeColors}>
  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:ThemeModeColors.color}}/>}>
  <Typography variant="body1">Species</Typography>
  </AccordionSummary>
    <AccordionDetails sx={{display:'flex',flexWrap:'wrap',flexDirection:'column',justifyContent:'space-around',gap:'1rem',alignItems:'baseline'}}>
    {Species.map((specie,index)=>{
      return <Button 
              key={index}
             variant="outlined"
             size="small"
             sx={styles.buttonstyles}
             onClick={(e)=>filteringcharacters(`?species=${e.target.innerText.toLowerCase()}`)
             }
             >
              {specie}
            </Button>
    })}
    </AccordionDetails>
</Accordion>


<Accordion sx={ThemeModeColors}>
  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:ThemeModeColors.color}}/>}>
  <Typography variant="body1">Status</Typography>
  </AccordionSummary>
    <AccordionDetails sx={{display:'flex',flexWrap:'wrap',flexDirection:'column',justifyContent:'space-around',gap:'1rem',alignItems:'baseline'}}>
    {Status.map((status,index)=>{
      return <Button
             key={index}
             variant="outlined"
             color="primary"
             size="small"
             sx={styles.buttonstyles}
             onClick={(e)=>filteringcharacters(`?status=${e.target.textContent.toLowerCase()}`)}
             >
              {status}
            </Button>
    })}
    </AccordionDetails>
</Accordion>

<Accordion sx={ThemeModeColors}>
  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:ThemeModeColors.color}}/>}>
  <Typography variant="body1">Genders</Typography>
  </AccordionSummary>
    <AccordionDetails sx={{display:'flex',flexWrap:'wrap',flexDirection:'column',justifyContent:'space-around',gap:'1rem',alignItems:'baseline'}}>
    {Genders.map((gender,index)=>{
      return <Button 
              key={index}
              variant="outlined"
              color="primary"
              size="small"
              sx={styles.buttonstyles}
              onClick={(e)=>filteringcharacters(`?gender=${e.target.textContent.toLowerCase()}`)}
              >
                {gender}
              </Button>
    })}
    </AccordionDetails>
</Accordion>
</Box>
</Drawer>
      </Container>
    
  );
}
