/* eslint-disable react/prop-types */
import {
  Container,
  Stack,
  Typography,
  MenuItem,
  TextField
} from "@mui/material";
import CharactersLayout from "./characterslayout";
import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import Loader from "./loader";
// eslint-disable-next-line react/prop-types
export default function Episode() {
  const [episodes, setEpisodes] = useState({});
  const [episodenumber, setEpisodeNumber] = useState(1);
  const { name, air_date, characters } = episodes;
  const [characterepisodedetails, setCharacterepisodedetails] = useState([]);
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/episode/${episodenumber}`)
      .then((res) => {
        setEpisodes(res.data);
        setSpin(false);
      })
      .catch((err) => console.log(err.message));
  }, [episodenumber]);

  useEffect(() => {
    // Check if characters is an array before proceeding
    if (Array.isArray(characters) && characters.length > 0) {
      Promise.all(characters.map((characterlink) => axios.get(characterlink)))
        .then((responses) => {
          const characterData = responses.map((res) => res.data);
          setCharacterepisodedetails(characterData);
        })
        .catch((err) => console.log(err));
    }
  }, [characterepisodedetails, characters]);

  let TotalEpisodes = [];
  let i = 0;
  do {
    i = i + 1;
    TotalEpisodes.push(i);
  } while (i < 52);

  const episodeselection = (event, number) => {
    const { props } = number;
    setEpisodeNumber(props.value);
    setEpisodes({});
    setSpin(true);
  };

  return (
    <Container sx={{ marginBlockStart: 6, marginBlockEnd: 5 }}>
      {spin ? (
        <Loader />
      ) : (
        <div>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            gap={3}
          >
            <Typography variant="h6" color="primary" textAlign="center">
              <span>Episode name</span> : {name}
            </Typography>
            <Typography variant="body1" color="inherit">
              Air Date : {air_date}
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Typography variant="body2">Choose your episode no : </Typography>
             
              <TextField
                  labelId="episode-label"
                  id="episodelabel"
                  value={episodenumber}
                  onChange={episodeselection}
                  select
                  sx={{
                    width:75
                  }}
                  SelectProps={{
                    MenuProps: {
                      style: {
                        height:400, // Set the max height for the dropdown
                      },
                    },
                  }}
                  size="small"
                  >
                  
                  {TotalEpisodes.map((count, index) => {
                    return (
                      <MenuItem key={index} value={count}>
                        {count}
                      </MenuItem>
                      
                    );
                  })}
               
                </TextField>
            </Stack>
          </Stack>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginInlineStart: 18,
            }}
          >
            <div className="characters-layout">
              {characterepisodedetails.map((characterepisode) => {
                const { id, name, image, gender, location, status } =
                  characterepisode;
                return (
                  <CharactersLayout
                    key={id}
                    name={name}
                    image={image}
                    gender={gender}
                    location={location.name}
                    status={status}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
