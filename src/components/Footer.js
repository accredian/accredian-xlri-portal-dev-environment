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



export default function Footer(props) {
  
  return (
    <React.Fragment>
      
        <Box sx={{ background: "#000",display:{xs:"none",lg:"block",md:"block"}}}>
         
            <Grid item lg={12} container sx={{display:"grid",placeContent:"center",py:2}}>
              
                <CardMedia

                  component="img"
                  image="https://www.accredian.co/wp-content/uploads/2021/01/white-logo.png"
                  alt="green iguana"
                  sx={{
                    
                    width: 100,
                    
                    ml:7
                  }}
                />
             
              
              {/* <Typography
                        
                          sx={{ color: "#fff",  fontWeight: "bold",mb:1 }}
                        >
                          {" "}
                          International school of Data Science & AI
                        </Typography> */}
                        <Typography
                        
                          sx={{ color: "gray",fontSize:"13px",mt:2,textAlign:"center" }}
                        >
                          {" "}
                          © 2023 INSAID. All Rights Reserved.
                        </Typography>
             
           
              
          </Grid>
       
      </Box>


      {/* Tablet view */}
      <Box sx={{ background: "#000",display:{xs:"none",lg:"none",sm:"block",md:"none"},width:"770px" }}>
         
         <Grid item lg={12} container sx={{display:"grid",placeContent:"center",py:2}}>
           
             <CardMedia

               component="img"
               image="https://www.accredian.co/wp-content/uploads/2021/01/white-logo.png"
               alt="green iguana"
               sx={{
                 
                 width: 100,
                 
                 ml:13
               }}
             />
          
           
           {/* <Typography
                     
                       sx={{ color: "#fff",  fontWeight: "bold",mb:1 }}
                     >
                       {" "}
                       International school of Data Science & AI
                     </Typography> */}
                     <Typography
                     
                       sx={{ color: "gray",fontSize:"13px",ml:7,mt:2 }}
                     >
                       {" "}
                       © 2023 INSAID. All Rights Reserved.
                     </Typography>
          
        
           
       </Grid>
    
   </Box>
    {/* Mobile view */}
    <Box sx={{ background: "#000",display:{xs:"block",lg:"none",sm:"none",md:"none"} }}>
         
         <Grid item lg={12} container sx={{display:"grid",placeContent:"center",py:2}}>
           
             <CardMedia

               component="img"
               image={`${process.env.REACT_APP_BASE_URL}/wp-content/uploads/2021/01/white-logo.png`}
               alt="green iguana"
               sx={{
                 
                 width: 100,
                 
                 ml:7
               }}
             />
          
           
           {/* <Typography
                     
                       sx={{ color: "#fff",  fontWeight: "bold",mb:1 }}
                     >
                       {" "}
                       International school of Data Science & AI
                     </Typography> */}
                     <Typography
                     
                       sx={{ color: "gray",fontSize:"13px",mt:2,textAlign:"center" }}
                     >
                       {" "}
                       © 2023 INSAID. All Rights Reserved.
                     </Typography>
          
        
           
       </Grid>
    
   </Box>


   </React.Fragment>
);
}