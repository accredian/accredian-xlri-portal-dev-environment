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
// import { TextField, withStyles } from '@material-ui/core';
import { withStyles } from "@mui/styles";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';
import { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber,isPossiblePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css';
import './Personal.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import ReactPhoneInput from 'react-phone-input-material-ui'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// console.log(City.getAllCities())
// console.log(State.getAllStates())

const styles = theme => ({
  field: {
    margin: '10px 0',
  },
  countryList: {
    ...theme.typography.body1,
  },
});
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
    width: 480,
    height: 19,
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

const PersonalNew = (props) => {
  // const classes = useStyles();
  const today = new Date().toISOString().split('T')[0];
  const [openPersonal, setOpenPersonal] = useState(false);
  const [openADD, setOpenADD] = useState(false);
  const [openaddress, setOpenaddress] = useState(false);
  const [age, setAge] = useState("");
  const [name, setname] = useState(localStorage.getItem("firstname"));
  const [email, setemail] = useState(localStorage.getItem("email"));
  const [number, setnumber] = useState("");
  const [dob, setdob] = useState("");
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [address, setaddress] = useState();
  const [gender, setgender] = useState();
  const [country_name, setCountryName] = useState("");
  const [cities, setCities] = useState([]);
  const [stateCode, setStatecode] = useState();
  const[sno,setsno]=useState(0)
  const [lastName, setLastname] = useState(
    (localStorage.getItem("lastname")&&
    localStorage.getItem("lastname").split(" ").length > 1)
      ? localStorage.getItem("lastname").split(" ")[1]
      : localStorage.getItem("lastname")
  );
  const [middleName, setMiddlename] = useState(
    // (localStorage.getItem("lastname")&&
    // localStorage.getItem("lastname").split(" ").length > 1)
    //   ? localStorage.getItem("lastname").split(" ")[1]
    //   : localStorage.getItem("lastname")
    localStorage.getItem("middlename")
  );
  const [nxt, setNxt] = useState(true);
  const [addresstwo, setAddresstwo] = useState("");
  const [backopen, setBackopen] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [value, setValue] = useState()




  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

// console.log(isValidPhoneNumber(("+"+number.toString())),"number2222")
// useEffect(()=>{
//   axios({
//     method: "post",
//     url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
//     data: {
//       type: "fetch_xlri_sheet_data",
//       user_id: parseInt(localStorage.getItem("user_id")),
//     },
//   }).then((res)=>{
   
//   })
// },[])
// useEffect(()=>{
  
//   var serial=0
//   const formDatab = new FormData();
//   formDatab.append("Sno",serial+1);
//   formDatab.append("Batch","PM-02");
//   formDatab.append("Name",localStorage.getItem("firstname")+" "+localStorage.getItem("lastname"));
//   formDatab.append("Email",localStorage.getItem("email"));
//   formDatab.append("Gender",localStorage.getItem("gender"));
//   formDatab.append("Dob","26-06-2020");
//   formDatab.append("Phone","9876543210");
//   formDatab.append("City","Agra");
//   formDatab.append("Workex","10");
//   formDatab.append("Eduaction","Btech");
//   formDatab.append("Company","Insaid");
//   formDatab.append("Designation","Software Engineer");
//   formDatab.append("Industry","IT");
//   formDatab.append("WorkexLink","yes");
//   formDatab.append("Educationlink","yes");
//   formDatab.append("LMS","yes");
//   formDatab.append("Enrollment","yes");

//   fetch(
//   "https://script.google.com/macros/s/AKfycbySIoejaDLoegWkpdAAfB3OwMz-lhHwqWe4dVMBINCKtOLP7-zuOLiNxIsdYCNtDT7Czw/exec", 
//   {
//       method: "POST",
//       body: formDatab
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });

// },[])





  // console.log(gender,"see the gender")
  const LoaderClose = () => {
    setBackopen(false);
  };
  const LoaderOpen = () => {
    setBackopen(true);
  };
  // console.log(Country.getAllCountries())
  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await City.getCitiesOfState(country, stateCode);
        let allCities = [];
        allCities = result?.map(({ name }) => ({
          name,
        }));
        // console.log(allCities,"rrrr")
        setCities(allCities);
      } catch (error) {
        setCities([]);
      }
    };

    getCities();
  }, [state, stateCode, country]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChangeName = (event) => {
    setname(event.target.value);
  };
  const handleChangeMiddle = (event) => {
    setMiddlename(event.target.value);
  };
  const handleChangelast = (event) => {
    setLastname(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setemail(event.target.value);
  };
  const handleChangeNumber = (event) => {
    // setnumber(event.target.value);
    setnumber(event.target.value);
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number format
    setIsPhoneNumberValid(phoneRegex.test(event.target.value));
  };
  console.log(number,"iii")
  const handleChangeDob = (event) => {
    setdob(event.target.value);
  };
  const handleChangeGender = (event) => {
    setgender(event.target.value);
    localStorage.setItem("gender",event.target.value)
  };
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeState = (event) => {
    setState(event.target.value);
  };
  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };
  const handleChangePincode = (event) => {
    setPincode(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setaddress(event.target.value);
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
  const handleChangeAddresst = (event) => {
    setAddresstwo(event.target.value);
  };
  useEffect(() => {
    var firstname = localStorage.getItem("firstname");
    var lastname = localStorage.getItem("lastname");
    var email = localStorage.getItem("email");
    var mobile = localStorage.getItem("mobile");
    setname(firstname);
    setLastname(lastname);
    setemail(email);
    setnumber(mobile);
    // console.log(firstname);
  }, []);
  useEffect(() => {
    if (country) {
      const country_name = Country.getAllCountries().filter((val) => {
        return val.isoCode == country;
      });
      // console.log(country_name[0].name)
      setCountryName(country_name[0].name);
    }
  }, [country]);
  useEffect(() => {
    if (state) {
      const states = State.getAllStates().filter((val) => {
        return val.name == state;
      });
      // console.log(states[0].isoCode)
      setStatecode(states[0].isoCode);
    }
  }, [state]);

  // if(props){
  useEffect(() => {
    if (
      name &&
      gender &&
      email &&
      number &&
      // state &&
      // city &&
      // pincode &&
      // address &&
      dob &&
      lastName
      // country_name
    ) {
      setNxt(false);
    }
    else{
      setNxt(true);
    }
  }, [
    name,
    gender,
    email,
    number,
    lastName,
    // state,
    // city,
    // pincode,
    // address,
    dob,
    // country_name,
  ]);

  const handleNext = () => {
    if(number.toString().slice(0,2)=='91'){
      if(number.toString().length==12){
        localStorage.setItem("mobile",number)
        LoaderOpen();
        if (
          name &&
          gender &&
          email &&
          number &&
          dob 
        ) {
          axios({
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
            data: {
              type: "insert_xlri_basic_detials_test",
              user_id: parseInt(localStorage.getItem("user_id")),
              firstname: name,
              lastname: middleName+" "+lastName,
              email: email,
              mobile: parseInt(number),
              gender: gender,
              dob: dob,
            },
          }).then(function (response) {
            LoaderClose();
            if (response.data.status == 200) {
              props.handleNext1();
              localStorage.setItem("currentStep", response.data.data.current_step_count);
              localStorage.setItem("currentStepStatus", response.data.data.current_step_status);
              // axios({
              //   method: "post",
              //   url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
              //   data: {
              //     type: "xlri_steptrcker_one_test",
              //     user_id: parseInt(localStorage.getItem("user_id")),
              //     stepone: "complete",
              //   },
              // }).then((response) => {
              //   if (response.data.status == 200) {
              //     props.stepCount();
              //     // props.userd();
              //   }
              // });
            }
          });
        }
      }
      else{
        toast.error("Please enter a valid 10 digit mobile number", {
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
     
  
    }
    else{
      LoaderOpen();
      if (
        name &&
        gender &&
        email &&
        number &&
        dob 
      ) {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
          data: {
            type: "insert_xlri_basic_detials_test",
            user_id: parseInt(localStorage.getItem("user_id")),
            firstname: name,
            lastname: middleName+" "+lastName,
            email: email,
            mobile: parseInt(number),
            gender: gender,
            dob: dob,
          },
        }).then(function (response) {
          LoaderClose();
          if (response.data.status == 200) {
            props.handleNext1();
            localStorage.setItem("currentStep", response.data.data.current_step_count);
              localStorage.setItem("currentStepStatus", response.data.data.current_step_status);
            // axios({
            //   method: "post",
            //   url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
            //   data: {
            //     type: "xlri_steptrcker_one_test",
            //     user_id: parseInt(localStorage.getItem("user_id")),
            //     stepone: "complete",
            //   },
            // }).then((response) => {
            //   if (response.data.status == 200) {
            //     props.stepCount();
            //     // props.userd();
            //   }
            // });
          }
        });
      }
    }
     };
  // function userd() {
  //   axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
  //     data: {
  //       type: "get_user_basic_details_test",
  //       user_id: localStorage.getItem("user_id"),
  //     },
  //   }).then(function (response) {
  //     // console.log(response.data,"user")
  //     // setfirstname(response.data.firstname)
  //     // setLastName(response.data.lastname)
  //     setname(response.data.firstname);
     
  //     localStorage.setItem("firstname", response.data.firstname);
  //     if(response.data.lastname.split(" ").length>1){
  //       setLastname(response.data.lastname.split(" ")[1]);
  //       localStorage.setItem("lastname", response.data.lastname.split(" ")[1]);
  //       setMiddlename(response.data.lastname.split(" ")[0])
  //       localStorage.setItem("middlename", response.data.lastname.split("")[0]);
  //     }
  //     else{
  //       setLastname(response.data.lastname);
  //       localStorage.setItem("lastname", response.data.lastname);
  //     }
  //   });
  // }
  // useEffect(() => {
  //   userd();
  //   // setname(props.firstname)
  //   // setLastname(props.lastName)
  // }, []);
  //  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  //  // border-radius: 5px;
  //  backgroundColor: "rgba(255, 255, 255, .15)",
  return (
    <>
      <Box sx={{display: { xs: "none", lg: "block"}}}>
        <Box
          sx={{ mb: 1, p: 1, borderRadius: "5px" }}
          onClick={handleClickPersonal}
        >
          {/* {openPersonal ? <ExpandLess sx={{color:"#fff"}} /> : <ExpandMore sx={{color:"#fff"}} />} */}
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "23px",
            }}
          >
            Personal Details
          </Typography>
        </Box>
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              First Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <BootstrapInput
              onChange={handleChangeName}
              value={name}
              sx={{ width: 480 }}
              size="small"
              helperText={name ? "" : "This filed is required"}
              onKeyPress={(e) => {
                if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Middle Name
            </Typography>
            <BootstrapInput
              onChange={handleChangeMiddle}
              value={middleName}
              sx={{ width: 480 }}
              size="small"
              helperText={name ? "" : "This filed is required"}
              onKeyPress={(e) => {
                if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
          </Box>
         
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            mb: 1,
          }}
        >
           <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Last Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <BootstrapInput
              onChange={handleChangelast}
              value={lastName}
              sx={{ width: 480 }}
              size="small"
              helperText={name ? "" : "This filed is required"}
              onKeyPress={(e) => {
                if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Email ID <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="email"
              sx={{ width: 480, background: "#d9d9d9", borderRadius: "5px" }}
              size="small"
              value={email}
              inputProps={{ readOnly: true }}
              onChange={handleChangeEmail}
            />
          </Box>
         
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            mb: 3,
          }}
        >
           <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Phone Number <span style={{ color: "red" }}>*</span>
            </Typography>
            {/* <TextField
              type="number"
              
              error={!isPhoneNumberValid}
        helperText={!isPhoneNumberValid ? 'Invalid phone number format' : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PhoneIcon color={!isPhoneNumberValid ? 'error' : 'action'} />
            </InputAdornment>
          ),
        }}
              
              sx={{ width: 480,background:"#fff",borderRadius:"5px" }}
              size="small"
              value={number}
              onChange={handleChangeNumber}
            /> */}
            <PhoneInput
            label=""
         
          country={'in'}
         size="small"
        
  placeholder="Enter phone number"
  value={number}
  onChange={setnumber}
 
  />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Gender <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Gender</InputLabel> */}
              <Select
                size="small"
                sx={{ width: 480, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleChangeGender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>
          </Box>

         
        </Box>
        <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 1,
          mb: 3,
        }}
        >
        <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Date of Birth <span style={{ color: "red" }}>*</span>
            </Typography>
            <BootstrapInput
              type="date"
              sx={{ width: 480 }}
              value={dob}
              inputProps={{ max: today }}
              size="small"
              onChange={handleChangeDob}
            />
          </Box>
        </Box>

       
        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Button
            variant="conatained"
            size="small"
            sx={{
              color: "#fff",
              background: "#fdb714",
              "&:hover": { background: "#fdb714", color: "#fff" },
            }}
            onClick={handleNext}
            disabled={nxt}
          >
            Submit
          </Button>
        </Box>
      </Box>


      {/* mobile version */}

      <Box sx={{display: { xs: "block", lg: "none"}}}>
        <Box
          sx={{ mb: 1, p: 1, borderRadius: "5px" }}
          onClick={handleClickPersonal}
        >
          {/* {openPersonal ? <ExpandLess sx={{color:"#fff"}} /> : <ExpandMore sx={{color:"#fff"}} />} */}
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "23px",
            }}
          >
            Personal Details
          </Typography>
        </Box>
        
        <Box
          sx={{
            // display: "flex",
            // justifyContent: "space-between",
            mt: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              First Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <BootstrapInput
              onChange={handleChangeName}
              value={name}
              sx={{ width: 220 }}
              size="small"
              helperText={name ? "" : "This filed is required"}
              onKeyPress={(e) => {
                if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Middle Name
            </Typography>
            <BootstrapInput
              onChange={handleChangeMiddle}
              value={middleName}
              sx={{ width: 220 }}
              size="small"
              helperText={name ? "" : "This filed is required"}
              onKeyPress={(e) => {
                if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
          </Box>
          
        </Box>
        <Box
          sx={{
          
            mt: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Last Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <BootstrapInput
              onChange={handleChangelast}
              value={lastName}
              sx={{ width: 220 }}
              size="small"
              helperText={name ? "" : "This filed is required"}
              onKeyPress={(e) => {
                if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Email ID <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="email"
              sx={{ width: 220, background: "#d9d9d9", borderRadius: "5px" }}
              size="small"
              value={email}
              inputProps={{ readOnly: true }}
              onChange={handleChangeEmail}
            />
          </Box>
         
        </Box>

        <Box
          sx={{
            
            mt: 1,
            mb: 1,
          }}
        >
           <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Phone Number <span style={{ color: "red" }}>*</span>
            </Typography>
            {/* <TextField
              type="number"
             
              error={!isPhoneNumberValid}
        helperText={!isPhoneNumberValid ? 'Invalid phone number format' : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PhoneIcon color={!isPhoneNumberValid ? 'error' : 'action'} />
            </InputAdornment>
          ),
        }}
              sx={{ width: 220,background:"#fff",borderRadius:"5px" }}
              size="small"
              value={number}
              onChange={handleChangeNumber}
            /> */}
             <PhoneInput
          
          country={'in'}
         size="small"
        
  placeholder="Enter phone number"
  value={number}
  onChange={setnumber}
 
  />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Gender <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Gender</InputLabel> */}
              <Select
                size="small"
                sx={{ width: 220, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleChangeGender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>
          </Box>

          
        </Box>
        <Box 
        sx={{
            
          mt: 1,
          mb: 3,
        }}
        >
        <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Date of Birth <span style={{ color: "red" }}>*</span>
            </Typography>
            <BootstrapInput
              type="date"
              sx={{ width: 220 }}
              value={dob}
              size="small"
              inputProps={{ max: today }}
              onChange={handleChangeDob}
            />
          </Box>
        </Box>

        
        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Button
            variant="conatained"
            size="small"
            sx={{
              color: "#fff",
              background: "#fdb714",
              "&:hover": { background: "#fdb714", color: "#fff" },
            }}
            onClick={handleNext}
            disabled={nxt}
          >
            Submit
          </Button>
        </Box>
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backopen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
    </>
  );
};
export default PersonalNew;
