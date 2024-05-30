import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./images/Witer_transparent.png";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <>
    <nav>
      <div >
      <img src= {logo} alt="logo" style={{width: "180px"}} />
      </div>
      <div>
      <PersonIcon />
      <Link to ="/create-join">
      <button type='button' className='signup-btn'>
        Start WhiteBoard
      </button>
      </Link>
      </div>
    </nav>
  </>
  )
}

export default Navbar