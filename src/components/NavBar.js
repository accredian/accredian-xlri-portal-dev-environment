import React, { useEffect, useState } from "react";
  import PropTypes from "prop-types";
  import AppBar from "@mui/material/AppBar";
  import Toolbar from "@mui/material/Toolbar";
  import CssBaseline from "@mui/material/CssBaseline";
  import useScrollTrigger from "@mui/material/useScrollTrigger";
  import { Link, useNavigate} from "react-router-dom";
  import {
    Typography,
    Button,
    Box,
    Paper,
    Container,
    Grid,
    CardMedia,
  } from "@mui/material";
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import MenuItem from "@mui/material/MenuItem";
  import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
  
  function ElevationScroll(props) {
    const { children, window } = props;
  
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
  
    window: PropTypes.func,
  };
  
  export default function Navbar(props) {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
    
    return (
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar sx={{ background: "#fff",display: { xs: "none", lg: "block" } }}>
            <Toolbar>
              <Grid item lg={12} container>
                <Grid item lg={2}>
                  <CardMedia
                    component="img"
                    image={`${process.env.REACT_APP_BASE_URL}/wp-content/uploads/2021/05/insaid-text-logo-2x-150x69.png`}
                    alt="green iguana"
                    sx={{
                      display: { xs: "block", lg: "block" },
                      width: 150,
                      py: 2,
                    }}
                  />
                </Grid>
               
                <Grid item lg={10}>
                {/* <Box sx={{display:"flex",background:"#fff",width:"100%"}}> */}
                {/* <Box sx={{display:"flex",float:"right"}}>
                <MenuItem
                        sx={{ "&:hover": { backgroundColor: "transparent" } }}
                      >
                        <Link
                          to="/PM"
                          onClick={()=>{ window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}}
                          // onClick={handleToggle}
                          // onLoad={handleClose}
                          // target="_blanck"
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                           
                            textAlign="center"
                            sx={{ color: "#000", my: 1, fontWeight: "bold" }}
                          >
                            {" "}
                            PM Glossary
                          </Typography>
                        </Link>
                </MenuItem>
                <MenuItem
                        sx={{ "&:hover": { backgroundColor: "transparent" } }}
                      >
                        <Link
                          onClick={()=>{ window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}}
                          to="/DS"
                        //  onClick={handleToggle}
                        //  onLoad={handleClose}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            textAlign="center"
                            sx={{ color: "#000", my: 1, fontWeight: "bold" }}
                          >
                            {" "}
                            DS Glossary
                          </Typography>
                        </Link>
                </MenuItem>
               <MenuItem
               sx={{ "&:hover": { backgroundColor: "transparent" } }}
               >
              <Link
              to="https://www.insaid.co/"
              style={{textDecoration:"none"}}
              >
               <Button
                        variant="contained"
                        sx={{
                          textTransform: "capitalize",
                          my: 2,
                          backgroundColor: "#0b5bcf",
                          borderRadius: "5px",
                        }}
                      
                      >
                        Back To Home
                      </Button>
              </Link>
              
               </MenuItem>
                </Box>
                 */}
               
              </Grid>
                
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </React.Fragment>
  );
}