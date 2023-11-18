import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TheatersIcon from '@mui/icons-material/Theaters';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [animeGenre, setAnimeGenre] = useState("");
  const [response, setResponse] = useState(null);
  const [btnText, setBtnText] = useState("Get Suggestions");
  const [openModals, setOpenModals] = React.useState([]);

  const handleOpen = (index) => {
    const updatedModals = [...openModals];
    updatedModals[index] = true;
    setOpenModals(updatedModals);
  };

  const handleClose = (index) => {
    const updatedModals = [...openModals];
    updatedModals[index] = false;
    setOpenModals(updatedModals);
  };

  const fetchAnimeSuggestions = async (e) => {
    e.preventDefault();
    try {
      setBtnText("Getting Suggestions...");

      const res = await axios.post(`/api/suggestion?searchQuery=${animeGenre}`);

      if (res.data !== undefined && res.data.length !== 0) {
        setResponse(res.data);
        setOpenModals(Array(res.data.length).fill(false));
      } else {
        setResponse(false);
      }
    } catch (err) {
      console.log(err);
    }
    setBtnText("Get Suggestions");
  };

  return (
    <>
      <div className="flex flex-col items-center relative">
        <h2 className="font-raleway font-bold text-6xl text-primary pt-20 pb-6 md:text-3xl">
          Ani<span className="text-secondary">Sug</span>
        </h2>
        <h3 className="text-lightGrey text-2xl font-raleway font-bold uppercase tracking-wide mb-12 md:text-base md:px-4 md:text-center">
          Find the best anime for your favorite genre
        </h3>
        <div className="flex flex-col justify-between items-center w-full md:items-center">
          <form className="flex w-full justify-center md:flex-col md:w-5/6">
            <input
              type="text"
              value={animeGenre}
              autoFocus={true}
              className="border-none outline-none w-2/5 bg-primary px-4 py-2 rounded-sm font-raleway md:w-full"
              placeholder="Enter your genre..."
              onChange={(e) => setAnimeGenre(e.target.value)}
            />
            <button
              className="outline-none border border-danger font-bold font-raleway ml-4 px-12 py-2 rounded-sm bg-danger text-primary transition duration-300 hover:bg-bc hover:text-black md:ml-0 md:mt-4"
              onClick={fetchAnimeSuggestions}
            >
              {btnText}
            </button>
          </form>
          <span style={{ color: "GrayText" }}>use (,) separated to enter multiple genres.</span>
        </div>
      </div>
      <div className="flex flex-col items-center pt-20">
        <Box sx={{ width: '90%' }}>
          <Grid container spacing={2}>
            {response ?
              response.map((suggestion , index) => {
                return (
                  <Grid item xs={3} key={index}>
                    <Card style={{ width: 350, height: 450, display: 'flex', flexDirection: 'column' }}>
                      {/* <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                      /> */}
                      <CardContent  >
                        <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: "bold", 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }}>
                          {suggestion.title.toUpperCase()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{
                          'overflow': 'hidden',
                          'text-overflow': 'ellipsis',
                          'display': '-webkit-box',
                          'WebkitBoxOrient': 'vertical',
                          'overflow': 'hidden',
                          'WebkitLineClamp': 3
                        }}
                        >
                          {suggestion.description}
                        </Typography>
                      </CardContent>
                      <CardContent style={{
                        marginTop: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }} >
                        <Typography variant="body2" color="text.secondary">
                          {suggestion.mediaType.toUpperCase() === 'MOVIE' ?
                            <Tooltip title="Movie">
                              <IconButton>
                                <TheatersIcon />
                              </IconButton>
                            </Tooltip> :
                            <Tooltip title="TV & Others">
                              <IconButton>
                                <LiveTvIcon />
                              </IconButton>
                            </Tooltip>
                          }
                        </Typography>
                        <Button size="small" onClick={() => handleOpen(index)}>view</Button>
                      </CardContent >
                      <Modal
                        open={openModals[index]}
                        onClose={() => handleClose(index)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={modalStyle}>
                          <Typography id="modal-modal-title" variant="h4" component="h2" style={{fontWeight:"bolder", fontFamily:"sans-serif"}}>
                            {suggestion.title.toUpperCase()}
                          </Typography>
                          <Typography variant="h6" componenet="h3" style={{fontWeight:"bold"}} >
                            Summary:
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {suggestion.description}
                          </Typography>
                          <Typography>
                            Release Year: {suggestion.startYr}
                          </Typography>
                          <Typography>
                           
                          </Typography>
                          <Typography>
                             Episodes: {suggestion.eps}
                          </Typography>
                          <Typography>
                            Content Warning: 
                              <Typography>{suggestion.contentWarn.length !==0? <>This Anime has content related to {suggestion.contentWarn} </>:<>U/A</> }</Typography>
                          </Typography>
                        </Box>
                      </Modal>
                    </Card>
                  </Grid>
                );
              }) :
              (response === false ? <><br /><br /><div className="w-full mt-4 p-8 border border-secondary h-full text-lightGrey font-raleway">No Results found</div></> : <div />)
            }
          </Grid>
        </Box>

      </div>
    </>
  );
}
