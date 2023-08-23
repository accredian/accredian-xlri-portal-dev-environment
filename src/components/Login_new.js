import React, {useState } from "react";
import { Typography, Button,Box,Paper,Container,Grid,CardMedia,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton

} from "@mui/material";
import Newnavbar from "./NavBar";
import Footer from "./Footer";
import TextField from '@mui/material/TextField';
import axios from 'axios';  
import { useNavigate } from "react-router-dom";
import XLRI_LOGO from '../images/xlri.png'
import Insaid_LOGO from '../images/white-logo (1).png'
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import logo from '../images/accredainw.webp'
var md5 = require('md5');


export default function LoginNew() {
    const [backopen, setBackopen] = useState(false);
  const LoaderClose = () => {
    setBackopen(false);
  };
  const LoaderOpen = () => {
    setBackopen(true);
  };
    const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    function clearConsole() { 
        if(window.console || window.console.firebug) {
           console.clear();
        }
    }
    var CryptoJS = require("crypto-js");
    let navigate = useNavigate();
const [user,setUser]=useState({email:'',password:''})
const handleChange=(e)=>{
    setUser({...user,[e.target.name]: e.target.value})
}
console.log(user)
function userd(){
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
    data: {
        type: 'get_user_basic_details_test',
        user_id:localStorage.getItem("user_id")
        
      }
  })
    .then(function (response) {
      console.log(response.data.data,"user")
      localStorage.setItem("currentStep", response.data.data.current_step_count);
      localStorage.setItem("currentStepStatus", response.data.data.current_step_status);
      localStorage.setItem("firstname", response.data.data.firstname);
      localStorage.setItem("mobile", response.data.data.mobile);
      if(response.data.data.lastname.split(" ").length>1){
        localStorage.setItem("lastname", response.data.data.lastname.split(" ")[1]);
        localStorage.setItem("middlename", response.data.data.lastname.split(" ")[0]);
      }
      else{
        localStorage.setItem("lastname", response.data.data.lastname);
      }
      if(response.data.data.program_id == 39){
        navigate('/GMform')
      }else{
        navigate('/form')
      }
    })

}

const submitForm=(e)=>{
  console.log(user.email,user.password,"ooooo")
  if(user.email&&user.password){
    LoaderOpen()
    e.preventDefault(); 
    axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/wpdata-new.php`,
        data: {
            type: 'xlri_login_up',
            username: user.email,
            password:  user.password
          }
      })
        .then(function (response) {
            LoaderClose();
            console.log(response)
            if(response.data[0].status==200){
             
                localStorage.setItem("user_id",response.data[0].user_id)
                localStorage.setItem("email",response.data[0].email)
                userd()
               
                // axios({
                //   method: 'post',
                //   url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data.php`,
                //   data: {
                //       type: 'update_payment_status',
                //       user_id:localStorage.getItem("user_id")
                //     }
                // }).then((response)=>{
                //   console.log(response)
                // })
              
            }
            else if (response.data[0].status==400) {
              toast.error("Enter the valid email or password", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
            else{
              toast.error("Enter the valid email or password", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }

        });
      
  }
  else{
    toast.error("Please enter the required fields", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
        

}
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 500,
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

   // console.log(sendData);
    return (
<>
{/* <Newnavbar/> */}
<Box
        sx={{ mb: 1, mt: 1, justifyContent: "space-between",display:{xs:"none",lg:"flex"} }}
      >
        {/* <Typography sx={{color:"#fff",fontSize:"30px"}}>
           
            </Typography> */}
        <CardMedia
          fullWidth
          component="img"
          image={XLRI_LOGO}
          alt="green iguana"
          sx={{
            display: { xs: "none", lg: "block" },
            //  objectFit:"none",
            width: 130,
            py: 1,
            mt: 1,
            ml: 1,
          }}
        />
       <img style={{display: { xs: "none", lg: "block" },height:"fit-content",margin:"18px 10px 0px 0px"}} src={logo} alt="logo" width="180px"/>
     
      </Box>
      <Box
        sx={{ mb: 1,  justifyContent: "space-between",display:{xs:"flex",lg:"none"},
      // background:"radial-gradient(circle at 50% 0, rgba(0, 0, 0, 0), #000000 100%)"
      
      }}
      >
        {/* <Typography sx={{color:"#fff",fontSize:"30px"}}>
           
            </Typography> */}
        <CardMedia
          fullWidth
          component="img"
          image={XLRI_LOGO}
          alt="green iguana"
          sx={{
            
            width: 110,
            py: 1,
            mt: 1,
            ml: 1,
          }}
        />
        <img style={{height:"fit-content",margin:"18px 10px 0px 0px"}} src={logo} alt="logo" width="160px"/>
      </Box>
<Box sx={{pt:1}}>
    <Container fixed>
    <Box >

<Box sx={{my:"auto"}}>
<Grid  container spacing={4} justifyContent="center">
    <Grid  item lg={4} sx={{pb:4}}>
    <Paper elevation={3} 
     sx={{boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)", 
     borderRadius: "15px",
     backgroundColor: "rgba(255, 255, 255, .15)",
     
     backdropFilter: "blur(5px)",
     border:"1px solid #fdb714",
     p:3 
 }}
    
    >
        <Box>
    <Typography sx={{textAlign:"center",py:1,fontWeight:"bold",color:"#fff",fontSize:"20px"}}>
        Login
    </Typography>
    </Box>
    <Box sx={{mx:2,py:5}}>
<form  onSubmit={submitForm}>
<Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#ffffff"}}>Email<span style={{color:"red"}}>*</span></Typography>
<TextField id="email"  size="small" type="email"  name="email"  onChange={handleChange}    fullWidth   sx={{mb:2,background:"#D9D9D9",borderRadius:"4px"}} />
<Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#ffffff"}}>Password <span style={{color:"red"}}>*</span></Typography>
<FormControl sx={{mb:2}} fullWidth>
          {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
          <OutlinedInput
          size="small"
          name="password"
          onChange={handleChange}  value={user.password} 
          sx={{background:"#fff",borderRadius:"4px"}}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
<Button variant="contained" fullWidth sx={{background:"#fdb714",color:"#fff","&:hover":{background:"#fdb714",color:"#fff"}}}   type="submit">Login</Button>


</form>
<Box sx={{mt:2,display:"flex"}}>
<a
                          style={{
                            marginTop: "7px",
                            marginLeft: "10px",
                            color: "#fff",
                          }}
                          href={`${process.env.REACT_APP_BASE_URL}/my-account/lost-password/`}
                          target="blank"
                        >
                          Forgot Password
                        </a>

                        <Link
                         style={{
                          marginTop: "7px",
                          marginLeft: "10px",
                          color: "#fff",
                        }}
                        to="/">
                          Sign Up
                        </Link>
</Box>

</Box>
</Paper>
</Grid>
</Grid>
    </Box>
  

</Box>

</Container>
</Box>
<Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backopen}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
{/* <Footer/> */}
<ToastContainer/>
</>
      
    );

}