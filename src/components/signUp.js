import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Container,
  Grid,
  CardMedia,
  FormControl,
} from "@mui/material";
import Newnavbar from "./NavBar";
import Footer from "./Footer";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import XLRI_LOGO from "../images/xlri.png";
import Insaid_LOGO from "../images/white-logo (1).png";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import { useNavigate } from "react-router-dom";
import logo from '../images/accredainw.webp'

export default function SignUp() {
  // let navigate = useNavigate();
  function clearConsole() {
    if (window.console || window.console.firebug) {
      console.clear();
    }
  }
  var md5 = require("md5");
  var CryptoJS = require("crypto-js");
  let navigate = useNavigate();
  //   const [user, setUser] = useState({ email: "", password: "",confirm_password:"" });
  //   const handleChange = (e) => {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirm] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [btn, setBtn] = useState(true);
  const [course, setCourse] = useState([]);
  const [courses, setCourses] = useState("");
  const [category, setCategory] = useState(" ");
  const [coursescode, setCoursescode] = useState(" ");
  const [backopen, setBackopen] = useState(false);
  const handleChangecourse = (pid, name) => {
    setCourses(pid);
    // setCoursescode(pcode);
    // setCategory(cid);

   
  };
  // console.log(courses,"uuuu");
  const LoaderClose = () => {
    setBackopen(false);
  };
  const LoaderOpen = () => {
    setBackopen(true);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    localStorage.setItem("email",e.target.value);
  };
  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeMiddleName = (e) => {
    setMiddleName(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeComfirm = (e) => {
    setComfirm(e.target.value);
  };

  console.log(middlename + " " + lastname, "lll");

  function convertEmailToLowerCase(email) {
    // Split the email string into username and domain
    var parts = email.split("@");
    
    // Convert the username to lowercase
    var username = parts[0].toLowerCase();
    var last= parts[1].toLowerCase();
    
    // Return the modified email
    return username + "@" + last;
  }
  // const final_mail=convertEmailToLowerCase("Tambat.prafull@gmail.com")
  // console.log(final_mail,"ttt")

  const handleSubmit = (e) => {
    LoaderOpen();
    e.preventDefault();
    // if(courses==38){

    // }
    // else{
      if (email && firstname && lastname &&courses) {
        // if(password===confirmPassword){
      //  localStorage.setItem("program",courses)
      
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/wpdata-test.php`,
          data: {
            type: "xlri_sign_up_test",
            username: convertEmailToLowerCase(email),
            firstname: firstname.replace(/\s/g, ''),
            middlename: middlename.replace(/\s/g, ''),
            lastname: lastname.replace(/\s/g, ''),
            category_id: courses,
            // password: password,
          },
        }).then(function (response) {
          LoaderClose();
          if (response.data.status == 200) {
            toast.success("Your account has been created successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setEmail("");
            setPassword("");
            setComfirm("");
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          } else {
            toast.error(
              "Your account has already been created. Please log in to access the portal.",
              {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              }
            );
          }
        });
  
        // }
        // else{
        //   LoaderClose()
        //     toast.error(" Password are not matched", {
        //         position: "top-right",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //       });
  
        // }
      } else {
        LoaderClose();
        toast.error("Please enter all the required fields", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    // }
    
  };
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: 250,
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  useEffect(() => {
    fathcprogram();
  }, []);
  function fathcprogram() {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
      data: {
        // type: "fetch_xlri_programs",
        type:"fetch_xlri_category_test"
      },
    }).then(function (response) {
      console.log(response);
      setCourse(response.data);
    });
  }
  return (
    <>
      {/* <Newnavbar/> */}
      <Box
        sx={{
          mb: 1,
          mt: 1,
          justifyContent: "space-between",
          display: { xs: "none", lg: "flex" },
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
            display: { xs: "none", lg: "block" },
            //  objectFit:"none",
            width: 130,
            py: 1,
            mt: 1,
            ml: 1,
          }}
        />
        {/* <CardMedia
          fullWidth
          component="img"
          image={logo}
          alt="green iguana"
          sx={{
            display: { xs: "none", lg: "block" },
            objectFit: "none",
            width: 100,
            py: 1,
            mt: 1,
            mr: 1,
            ml: 1,
          }}
        /> */}
        <img style={{display: { xs: "none", lg: "block" },height:"fit-content",margin:"18px 10px 0px 0px"}} src={logo} alt="logo" width="180px"/>
     
      </Box>
      <Box
        sx={{
          mb: 1,
          justifyContent: "space-between",
          display: { xs: "flex", lg: "none" },
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
      <Box sx={{ pt: 0.5 }}>
        <Container fixed>
          <Box>
            <Box sx={{ my: "auto" }}>
              <Grid container spacing={6} justifyContent="center">
                <Grid item xs={12} lg={6} sx={{ pb: 4 }}>
                  <Paper
                    elevation={3}
                    sx={{
                      boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
                      borderRadius: "15px",
                      backgroundColor: "rgba(255, 255, 255, .15)",

                      backdropFilter: "blur(5px)",
                      border: "1px solid #fdb714",
                      p: 3,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          textAlign: "center",
                          py: 1,
                          fontWeight: "bold",
                          color: "#fff",
                          fontSize: "20px",
                        }}
                      >
                        Sign Up
                      </Typography>
                    </Box>
                    <Box sx={{ mx: 2, py: 1 }}>
                      <form onSubmit={handleSubmit}>
                        <Box sx={{ mt: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  color: "#ffffff",
                                }}
                              >
                                First Name
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                              <TextField
                              required
                                onChange={handleChangeFirstName}
                                fullWidth
                                sx={{
                                  width:{xs:120,lg:"auto"},
                                  mb: 2,
                                  background: "#fff",
                                  borderRadius: "4px",
                                }}
                                size="small"
                                onKeyPress={(e) => {
                                  if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                                  } else e.preventDefault();
                                }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  color: "#ffffff",
                                }}
                              >
                                Middle Name
                              </Typography>
                              <TextField
                              
                                onChange={handleChangeMiddleName}
                                fullWidth
                                sx={{
                                  width:{xs:120,lg:"auto"},
                                  mb: 2,
                                  background: "#fff",
                                  borderRadius: "4px",
                                }}
                                size="small"
                                onKeyPress={(e) => {
                                  if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                                  } else e.preventDefault();
                                }}
                              />
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  color: "#ffffff",
                                }}
                              >
                                Last Name<span style={{ color: "red" }}>*</span>
                              </Typography>
                              <TextField
                              required
                                onChange={handleChangeLastName}
                                fullWidth
                                sx={{
                                  width:{xs:120,lg:"auto"},
                                  mb: 2,
                                  background: "#fff",
                                  borderRadius: "4px",
                                }}
                                size="small"
                                onKeyPress={(e) => {
                                  if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                                  } else e.preventDefault();
                                }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  color: "#ffffff",
                                }}
                              >
                                Email<span style={{ color: "red" }}>*</span>
                              </Typography>
                              <TextField
                              required
                                onChange={handleChangeEmail}
                                type="email"
                                fullWidth
                                sx={{
                                  width:{xs:120,lg:"auto"},
                                  mb: 2,
                                  background: "#fff",
                                  borderRadius: "4px",
                                }}
                                size="small"
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                fontSize: "14px",
                                color: "#ffffff",
                              }}
                            >
                              Program <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <FormControl fullWidth>
                              <Select
                              required
                                size="small"
                                sx={{ width:{xs:"auto",lg:470}, background: "#fff" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={country}
                                defaultValue="program"
                                label="course"
                                // onChange={handleChangeCountry}
                              >
                                   <MenuItem value="program">
            <em>Select program</em>
          </MenuItem>
                                {course.map((val, i) => (
                                  <MenuItem
                                    onClick={() =>
                                      handleChangecourse(
                                        val.id,
                                        val.name
                                      )
                                    }
                                    value={val.id}
                                  >
                                    {val.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            {/* <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#ffffff",
                          }}
                        >
                          Password <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField onChange={handleChangePassword} type="password" fullWidth sx={{mb:2,background:"#fff",borderRadius:"4px"}} size="small"/>
                        */}
                          </Box>
                        </Box>
                        <Box sx={{ mt: 1, mb: 1 }}>
                          <Box>
                            {/* <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#ffffff",
                          }}
                        >
                          {" "}
                          Confirm Password{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField onChange={handleChangeComfirm}  type="password" fullWidth sx={{mb:2,background:"#fff",borderRadius:"4px"}} size="small"/>
                        */}
                          </Box>
                        </Box>

                        <Button
                          sx={{
                            background: "#fdb714",
                            color: "#fff",
                            "&:hover": { background: "#fdb714", color: "#fff" },
                          }}
                          variant="contained"
                          fullWidth
                          type="submit"
                        >
                          Sign Up
                        </Button>
                      </form>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ py: 1, color: "#fff" }}>
                          Already a user?
                        </Typography>
                        <Link
                          style={{
                            marginTop: "-5px",
                            marginLeft: "10px",
                            color: "#fff",
                          }}
                          to="/login"
                        >
                          Login
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
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backopen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
      {/* <Footer/> */}
    </>
  );
}
