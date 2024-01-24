import "./App.css";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { useState, createContext } from "react";
import {
  AppBar,
  Stack,
  Typography,
  Switch,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  createTheme,
  ThemeProvider,
  CssBaseline,
  
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import MenuIcon from "@mui/icons-material/Menu";
import Character from "./components/characters";
import Episode from "./components/episodes";
import Location from "./components/location";
import PeopleIcon from "@mui/icons-material/People";
import TheatersIcon from "@mui/icons-material/Theaters";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export const AppContext = createContext(null);
function App() {
  const RoutingElement = [
    {
      icon: <PeopleIcon />,
      name: "Characters",
      path: "/",
    },
    {
      icon: <TheatersIcon />,
      name: "Episodes",
      path: "/episodes",
    },
    {
      icon: <LocationOnIcon />,
      name: "Locations",
      path: "/locations",
    },
  ];
  const mobile = useMediaQuery("(max-width:425px)");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorel, setAnchorel] = useState(null);
  const open = Boolean(anchorel);
  const menuclose = () => {
    setAnchorel(null);
  };
  const viewModeChange = () => {
    setIsChecked((prevState) => !prevState);
  };
  const dark_theme=createTheme({
    palette:{
      mode:isChecked?'dark':'light'
    }
  })
  return (
    <ThemeProvider theme={dark_theme}>
      <CssBaseline/>
    <HashRouter>
      <AppBar
        position="static"
        color="inherit"
      >
       
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant={mobile ? "h6" : "h5"}
            sx={{ paddingInlineStart: 1}}
            color="inherit"
          >
            Ricky wiki
          </Typography>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              marginInlineEnd: mobile ? "" : 5,
            }}
          >
            {isChecked ? (
              <ModeNightIcon sx={{ color: "#fff" }} />
            ) : (
              <LightModeIcon sx={{ color: "#F28C38" }} />
            )}
            <Switch
              size="small"
              checked={isChecked}
              onChange={viewModeChange}
              
            />
            {mobile ? (
              <IconButton
                onClick={() => setAnchorel(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            ) : (
              RoutingElement.map((routingelement, index) => {
                return (
                  <Tabs
                    key={index}
                    value={selectedIndex}
                    onChange={(e, Val) => {
                      document.startViewTransition(() => {
                        setSelectedIndex(Val);
                      });
                    }}
                    component={Link}
                    to={routingelement.path}
                    sx={{ textDecoration: "none",color:'inherit' }}
                  >
                    <Tab
                      value={index}
                      label={routingelement.name}
                      name={routingelement.name}
                     sx={{
                      color:'primary'
                     }}
                    />
                  </Tabs>
                );
              })
            )}
          </Stack>
        </Stack>
       
      </AppBar>
      <Menu
        open={open}
        anchorEl={anchorel}
        onClose={menuclose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {RoutingElement.map((routingelement, index) => {
          return (
            <MenuItem
              key={index}
              component={Link}
              to={routingelement.path}
              selected={index === selectedIndex}
              onClick={() => {
                setAnchorel(null);
                setSelectedIndex(index);
              }}
            >
              <ListItemIcon>{routingelement.icon}</ListItemIcon>
              <ListItemText>{routingelement.name}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
      <AppContext.Provider value={{ isChecked }}>
        <Routes>
          <Route path="/" element={<Character />} />
          <Route path="/episodes" element={<Episode />} />
          <Route path="/locations" element={<Location />} />
        </Routes>
      </AppContext.Provider>
    </HashRouter>
    </ThemeProvider>
  );
}
export default App;
