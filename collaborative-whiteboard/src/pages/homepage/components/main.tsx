import React from 'react'
import Iconimage from './images/mainimage.png';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className='maindiv'>
        <div className='main-left-div' >
          <Container className='main-left-heading' sx={{my: 5}}>
            <h1>The go-to free digital whiteboard for real-time collaboration</h1>
          </Container>
          <Container className='main-left-para' sx={{my: 5}}>
            <p>Easily share ideas and collaborate with others—in real-time or asynchronously—with a free online whiteboard from Witer.</p>
          </Container>
          <Container className='main-left-button' sx={{my: 5}}>
            <Link to ="/create-join">
            <button id='left-button-main'>
              Start a whiteboard
            </button>
            </Link>
          </Container>
        </div>

        <div className='main-right-div'>
            <img src={Iconimage} alt="" style={{width:"90vh"}} />
        </div>
    </div>
  )
}

export default Main