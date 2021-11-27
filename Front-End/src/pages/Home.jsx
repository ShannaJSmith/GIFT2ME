import react from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./Home.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShareIcon from '@mui/icons-material/Share';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const theme = createTheme({
  palette: {
    pink: {
      main: '#D11071;',
    },
  },
});

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="top">

        <div id="top-children">
          <img className="hp-image" alt="bar" src="https://images.unsplash.com/photo-1510284876186-b1a84b94418f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
        </div>
        <div class="top-children phrase">Gifting made easy
        </div>
        <div id="regg">
          <ThemeProvider theme={theme}>
            <Link to="/register" className="reg-btn" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                href="#contained-buttons"
                color="pink"
                size="large"
              >
                Register Now
              </Button>
            </Link>
          </ThemeProvider>
        </div>

      </div>

      <div className="icons">
        <div id="circle">
          <div id="icon-children"><HowToRegIcon id="icon-children" fontSize="large" /></div>
        </div>
        <div id="circle">
          <div id="icon-children"><AddBoxIcon id="icon-children" fontSize="large" /></div>
        </div>
        <div id="circle">
          <div id="icon-children"><ListAltIcon id="icon-children" fontSize="large" /></div>
        </div>
        <div id="circle">
          <div id="icon-children"><ShareIcon id="icon-children" fontSize="large" /></div>
        </div>
      </div>

      <div className="caption">
        <p id="words">Register</p>
        <p id="words">Create Events</p>
        <p id="words">Make Wishlist</p>
        <p id="words">Share</p>
      </div>


      <Footer />
    </>
  );
};

export default Home;
