import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  Link,
  Badge,
  Checkbox,
  Tabs,
  Tab,
  Step,
} from "@mui/material";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const Personal=()=>{
    const [openPersonal, setOpenPersonal] = useState(false);
    const [openADD, setOpenADD] = useState(false);
    const [openaddress, setOpenaddress] = useState(false);
    const [age, setAge] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [number, setnumber] = useState('');
    const [dob, setdob] = useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const handleChangeName = (event) => {
        setname(event.target.value);
      };
      const handleChangeEmail = (event) => {
        setemail(event.target.value);
      };
      const handleChangeNumber = (event) => {
        setnumber(event.target.value);
      };
      const handleChangeDob = (event) => {
        setdob(event.target.value);
      };
  
    const handleClickPersonal = () => {
        setOpenPersonal(!openPersonal);
      };
      const handleClickAdd = () => {
        setOpenADD(!openADD);
      };
      const handleClickaddress = () => {
        setOpenaddress(!openaddress);
      };
      
    return (
        <>
         <Box sx={{mb:0.5,background:"#fff5e7",p:1,borderRadius:"5px",display:"flex"}} onClick={handleClickPersonal}>
            {openPersonal ? <ExpandLess sx={{color:"#fba016"}} /> : <ExpandMore sx={{color:"#fba016"}} />}
                <Typography sx={{color:"#fba016"}}>Personal Details</Typography>
                
            </Box>
            <Collapse in={openPersonal} timeout="auto" unmountOnExit sx={{mb:2}}>
            {/* <Box sx={{mt:1,mb:1}}>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Note:</Typography>
                    <Typography>Please enter full name as per the 10th Certificate</Typography>
               
                    </Box> */}
            <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Full Name</Typography>
                <TextField onChange={handleChangeName}  sx={{width:520}} size="small"  helperText={name?"":"This filed is required"} />
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Gender</Typography>
                    <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Gender</InputLabel> */}
        <Select
        size="small"
        sx={{width:520}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
          <MenuItem value={30}>Others</MenuItem>
        </Select>
      </FormControl>
                    {/* <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Course Applying for</Typography>
                <TextField sx={{width:520}} size="small"/> */}
                    </Box>
               
             
                </Box>
                <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Email ID</Typography>
                <TextField type="email" sx={{width:520}} size="small" onChange={handleChangeEmail}/>
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Phone Number</Typography>
                <TextField type="number" sx={{width:520}} size="small" onChange={handleChangeNumber}/>
                    </Box>
                    
               
             
                </Box>
                {/* <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Nationality</Typography>
                <TextField  sx={{width:520}} size="small"/>
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Category</Typography>
                <TextField  sx={{width:520}} size="small"/>
                    </Box>
                    
               
             
                </Box> */}
                {/* <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Gender</Typography>
                <TextField  sx={{width:520}} size="small"/>
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Maritial Status</Typography>
                <TextField  sx={{width:520}} size="small"/>
                    </Box> */}
                    
               
             
                {/* </Box> */}
                <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    {/* <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Blood Group</Typography>
                <TextField  sx={{width:520}} size="small"/>
                    </Box> */}
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Date of Birth</Typography>
                <TextField type="date" sx={{width:520}} size="small" onChange={handleChangeDob}/>
                    </Box>
                    
               
             
                </Box>
      </Collapse>
            {/* <Box sx={{mb:0.5,background:"#fff5e7",p:1,borderRadius:"5px",display:"flex"}} onClick={handleClickAdd}>
            {openADD ? <ExpandLess sx={{color:"#fba016"}} /> : <ExpandMore sx={{color:"#fba016"}} />}
                <Typography sx={{color:"#fba016"}}>Additional Details</Typography>
            </Box>
            <Collapse in={openADD} timeout="auto" unmountOnExit sx={{mb:2}}>
                <Box sx={{display:"flex",justifyContent:"space-between",mt:1}}>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Emergency Contact Number</Typography>
                <TextField sx={{width:520}} type="number"  size="small"/>
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Name of Parent/Gurdian</Typography>
                <TextField sx={{width:520}} size="small"/>
                    </Box>
               
             
                </Box>
        
      </Collapse> */}
            <Box sx={{mb:0.5,background:"#fff5e7",p:1,borderRadius:"5px",display:"flex"}} onClick={handleClickaddress}>
            {openaddress ? <ExpandLess sx={{color:"#fba016"}} /> : <ExpandMore sx={{color:"#fba016"}} />}
                <Typography sx={{color:"#fba016"}}>Address Details</Typography>
            </Box>
            <Collapse in={openaddress} timeout="auto" unmountOnExit sx={{mb:2}}>
            <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Country</Typography>
                <TextField sx={{width:520}} size="small"/>
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Pincode</Typography>
                <TextField type="number" sx={{width:520}} size="small"/>
                    </Box>
               
             
                </Box>
                <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>State</Typography>
                <TextField type="email" sx={{width:520}} size="small"/>
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>District</Typography>
                <TextField type="number" sx={{width:520}} size="small"/>
                    </Box>
                    
               
             
                </Box>
                <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>City</Typography>
                <TextField  sx={{width:520}} size="small"/>
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Address</Typography>
                <TextField  sx={{width:520}} size="small"/>
                    </Box>
                    
               
             
                </Box>
                
      </Collapse>
        </>
    )
}
export default Personal