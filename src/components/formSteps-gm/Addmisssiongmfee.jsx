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
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import useRazorpay from "react-razorpay";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Backdrop from "@mui/material/Backdrop";
import { Country, State, City } from "country-state-city";
import CircularProgress from "@mui/material/CircularProgress";
import { SettingsEthernetOutlined } from "@mui/icons-material";
import logo from '../../images/accredian-logo.png'
import FormGroup from '@mui/material/FormGroup';
import icon from '../../images/icon.png'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#d9d9d9" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: 480,
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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#fdb714" : "#fdb714",
  },
}));
const AdmissionfeeNew = (props) => {
  let navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    setUser(user_id);
  }, []);

  if (user == null) {
    navigate(`/Login`);
  }
  const [backopen, setBackopen] = useState(false);
  const LoaderClose = () => {
    setBackopen(false);
  };
  const LoaderOpen = () => {
    setBackopen(true);
  };
  const [openPersonal, setOpenPersonal] = useState(false);
  const [openADD, setOpenADD] = useState(false);
  const [openaddress, setOpenaddress] = useState(false);
  const [payment, setPayment] = useState();
  const [addmissionPayment, setAddmissionpayment] = useState();
  const [course, setCourse] = useState([]);
  const [batch, setBatch] = useState([]);
  const [paymentid, setPaymentid] = useState("");
  const [show, setShow] = useState(false);
  const [paymentChanges, setpaymentChange] = useState(false);
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [address, setaddress] = useState();
  const [addresstwo, setAddresstwo] = useState("");
  const [country_name, setCountryName] = useState("");
  const [cities, setCities] = useState([]);
  const [stateCode, setStatecode] = useState();
  const[enrol,setEnrol]=useState('')
  const[enablePay,setPay]=useState(true)
  const [checked,setChecked]=useState(false)
  const[enablePayFinance,setPayFinance]=useState(true)

  useEffect(() => {
    // LogRocket.init('ndxxcf/xlriiitg');
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

  useEffect(()=>{
    if(addmissionPayment){
      setPay(false)
    }
    else{
      setPay(true)
    }
  },[enablePay,addmissionPayment])

  useEffect(()=>{
    if(country_name&&state&&city&&pincode&&address){
      setPayFinance(false)
    }
    else{
      setPayFinance(true)
    }
  },[enablePayFinance,country_name,state,city,pincode,address])
  const handleCheck=( event)=>{
    setChecked(event.target.checked);
  }
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    setState('');
    setCity('')
  };
  const handleChangeState = (event) => {
    setState(event.target.value);
    setCity('')
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
  const handleChange = (e) => {
    setPayment(e.target.value);
    if(e.target.value=='Finance partner'){
      setAddmissionpayment('')
      }
      // fetchEnrol()
  };
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

  const handleChangePayment=()=>{
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
      data: {
        type: "update_choice_admission_payment_test",
        user_id: parseInt(localStorage.getItem("user_id")),
       
      },
    }).then((res)=>{
      if(res.data.status==200){
        setpaymentChange(true)
        setShow(false)
        setChecked(false)
        localStorage.setItem("currentStep", res.data.data.current_step_count);
        localStorage.setItem("currentStepStatus", res.data.data.current_step_status);
      }
    })
    // setpaymentChange(true)
    // setShow(false)
    // localStorage.setItem("currentStep", 'UXxd22qvQ9kHfw0FjJnXaQ==');
    // localStorage.setItem("currentStepStatus", "pending");
  }
  const handleClick = () => {
    LoaderOpen();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
      data: {
        type: "update_vendor_admission_payment_test",
        user_id: parseInt(localStorage.getItem("user_id")),
        
      },
    }).then((res)=>{
      LoaderClose()
      if(res.data.status==200){
      
       localStorage.setItem("currentStep", res.data.data.current_step_count);
       localStorage.setItem("currentStepStatus", res.data.data.current_step_status);
       toast.success(
        "Thanks for submitting your request. We will get back to you for further process",
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
      setTimeout(() => {
        setShow(true);
      }, 4000);
      }
    })
    
  };
console.log(enrol,"enroll")
const fetchEnrol=()=>{
  axios({
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data.php`,
    data: {
      type: "enrolment_details",
      user_id:parseInt(localStorage.getItem("user_id"))
    },
  }).then((response) => {
    
    if(response.data.status==200){
      setEnrol(response.data[0].enrol_id)
    }
    
  });
}
  useEffect(() => {
    

    const fetchone=()=>{
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
        data: {
          type: "fetch_xlri_programs_and_batches_test",
          category_id:localStorage.getItem("category")
        },
      }).then((response) => {
        // console.log(response.data[0].pname,"courseee")
        if(response.data.status==200){
          if(response.data.batches.status==200){
            // setBatch(response.data);
            setBatch([
              {
                id: response.data.batches.batch,
                name: response.data.batches.batch_text,
                batch_id: response.data.batches.batch_id,
              },
            ]);
            // setBatchid(response.data.batches.batch_id)
            // setBatchtxt(response.data.batches.batch_text);
          }
          if(response.data.programs.status==200){
            // setCourse(response.data);
            setCourse([
              {
                id: response.data.programs.pid,
                name: response.data.programs.pname,
                pcode: response.data.programs.pcode,
              },
            ]);
            // setCoursescode(response.data.programs.pcode);
            // setCourses(response.data.programs.pid);
          }
        }
        
      });
    }
    // const fetchCourse = () => {
    //   axios({
    //     method: "post",
    //     url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
    //     data: {
    //       type: "fetch_xlri_programs_test",
    //     },
    //   }).then((response) => {
    //     // console.log(response.data[0].pname,"courseee")
    //     setCourse([
    //       {
    //         id: response.data[0].pid,
    //         name: response.data[0].pname,
    //         pcode: response.data[0].pcode,
    //       },
    //     ]);
    //   });
    // };
    // const fetchBatch = () => {
    //   axios({
    //     method: "post",
    //     url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
    //     data: {
    //       type: "fetch_xlri_batches_test",
    //     },
    //   }).then((response) => {
    //     setBatch([
    //       {
    //         id: response.data[0].batch,
    //         name: response.data[0].batch_text,
    //         batch_id: response.data[0].batch_id,
    //       },
    //     ]);
    //   });
    // };
    // fetchCourse();
    // fetchBatch();
    // fetchEnrol()
    fetchone()
    // props.userd();
  }, []);

  console.log(batch,"lll")
  useEffect(() => {
    if (paymentid) {
      LoaderOpen();
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
        data: {
          type: "insert_admissions_details_pubsub_test",
          user_id: parseInt(localStorage.getItem("user_id")),
          payment_id: paymentid,
          firstname: localStorage.getItem("firstname"),
          lastname: localStorage.getItem("lastname"),
          mobile: localStorage.getItem("mobile"),
          email: localStorage.getItem("email"),
          batch: batch[0].batch_id,
          program: course[0].id,
          amount: addmissionPayment * 100,
          // enrol_id:enrol
        },
      }).then((response) => {
        
        if (response.data.status == 200) {
          LoaderClose();
          props.handleNext3();
          localStorage.setItem("currentStep", response.data.data.current_step_count);
          localStorage.setItem("currentStepStatus", response.data.data.current_step_status);
          
        } 
      });
    }
  }, [paymentid]);
  const paymentChange = (e) => {
    setAddmissionpayment(e.target.value);
  };
  const checkoutHandler = async (amount) => {
    const options = {
      // key: "rzp_live_kuHNpOKPMVihkI",
      key:"rzp_test_KAHiAuZT84j7ih",
      amount: addmissionPayment * 100,
      currency: "INR",
      name: "Accredian",
      description: "admission fees for " + course[0].pcode,
      image:
       {logo},
      // order_id: order.data.response.id,
      handler: function (response) {
        setPaymentid(response.razorpay_payment_id);
      },
      prefill: {
        name:
          localStorage.getItem("firstname") + localStorage.getItem("lastname"),
        email: localStorage.getItem("email"),
        contact: localStorage.getItem("mobile"),
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  // console.log(payment,"seee")
  return (
    <>
    {/* desktop version */}
    <Box >
    <Box
        sx={{ mb: 2, p: 1, borderRadius: "5px" }}
        onClick={handleClickPersonal}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "23px",
          }}
        >
          Admission Fee Payment
        </Typography>
      </Box>
      {localStorage.getItem("currentStepStatus") == "pending" || paymentChanges  ? (
        <Box>
          {!show ? (
            <Box sx={{  display: {xs:"",lg:"flex"} }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#fff",
                  mt: 2,
                  mb: 1,
                  // width: 150,
                  width: {lg:330,xl:520},
                  textAlign:"center"
                }}
              >
                Payment Type
              </Typography>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
                <Select
                  size="small"
                  sx={{ width: {xs:280,lg:480}, background: "#fff", mt: 1 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={payment}
                  onChange={handleChange}
                  defaultValue={"select"}
                >
                  <MenuItem disabled="true" value={"select"}>
                    Select Payment Type
                  </MenuItem>
                  <MenuItem value={"Finance partner"}>Finance partner</MenuItem>
                  <MenuItem value={"Debit card EMI"}>Debit card EMI</MenuItem>
                  <MenuItem value={"Credit card EMI"}>Credit card EMI</MenuItem>
                  <MenuItem value={"Full Payment"}>Full Payment</MenuItem>
                  {/* <MenuItem value={30}>Others</MenuItem> */}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box></Box>
          )}

          {show ? (
            <Box
              sx={{
                display: {xs:"",lg:"flex"},
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: "5px",
                  border: "1px solid #fdb714",
                  p: 3,
                  width: 300,
                }}
              >
                <BorderLinearProgress
                  variant="determinate"
                  value={80}
                  sx={{ mb: 2 }}
                />
                <Typography sx={{mb:1.5}}>
                  Your payment is under process. Please contact your admission
                  counsellor for further details
                </Typography>
                <Box  sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Button
                      variant="conatained"
                      size="small"
                      sx={{
                        textAlign:"center",
                        color: "#fff",
                        mr: 2,
                        textTransform:"none",
                        background: "#fdb714",
                        "&:hover": { background: "#fdb714", color: "#fff" },
                      }}
                      onClick={handleChangePayment}
                    >
                      Choose Another Payment Method
                    </Button>
                </Box>
                
              </Box>
             
            </Box>
          ) : (
            <Box></Box>
          )}
          {payment == undefined ? (
            <Box></Box>
          ) : (
            <Box>
              {payment == "Finance partner" ? (
                <Box sx={{ mt: 2,  }}>
                  {!show ? (
                    <Box>
                      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Box
            sx={{
              background: "#fff",
              borderRadius: "5px",
              border: "1px solid #fdb714",
              p: 3,
              width: 300,
            }}
          >
            <BorderLinearProgress
              variant="determinate"
              value={80}
              sx={{ mb: 2 }}
            />
            <Typography sx={{mb:1.5}}>
              Your payment is under process. Please contact your admission
              counsellor for further details
            </Typography>
            <Box  sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Button
                      variant="conatained"
                      size="small"
                      sx={{
                        textAlign:"center",
                        color: "#fff",
                        mr: 2,
                        textTransform:"none",
                        background: "#fdb714",
                        "&:hover": { background: "#fdb714", color: "#fff" },
                      }}
                      onClick={handleChangePayment}
                    >
                      Choose Another Payment Method
                    </Button>
                </Box>
          </Box> */}
           <Box sx={{background:"#fff",borderRadius:"8px",border:"1px solid #fdb714",px:1,pb:1.5,width:460}}>
     <Box sx={{textAlign:"center",my:1,}}>
     <img src={icon} alt="logo"  /> 
</Box>
      
       <Typography sx={{fontWeight:"300",fontSize:"16px",mb:1.5,textAlign:"center",p:1}}>
       Thank you for choosing Finance partner as your 
payment option for the program. Please note that 
Finance partner is a third-party payment service 
provider and their terms and conditions will apply 
to your transaction.
       
       </Typography>
       <FormGroup>
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
      <FormControlLabel  control={<Checkbox sx={{fontSize:"12px"}} onChange={handleCheck} />} label={
         <div style={{fontSize:"10px",padding:"5px",textAlign:"left"}}>
       
      <span style={{color:"red"}}>*</span> I agree to the terms and conditions of the finance partner and provide required documents for loan approval.
       </div>
      } />
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
   
       
     </Box>
        </Box>

       
                       {/* <Box
          sx={{ mb: 0.5, p: 1, borderRadius: "5px" }}
          onClick={handleClickaddress}
        >
         
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "23px",
            }}
          >
            Address Details
          </Typography>
        </Box> */}
        {/* <Collapse in={openaddress} timeout="auto" unmountOnExit sx={{mb:2}}> */}
        {/* <Box
          sx={{
            display: {xs:"",lg:"flex"},
            justifyContent: "space-between",
            mt: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Country <span style={{ color: "red" }}>*</span>{" "}
            </Typography>
            <FormControl fullWidth>
            
              <Select
                size="small"
                sx={{ width: {xs:280,lg:480}, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Gender"
                onChange={handleChangeCountry}
              >
                {Country.getAllCountries().map((val, i) => (
                  <MenuItem value={val.isoCode}>{val.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              State <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              
              <Select
                size="small"
                sx={{ width: {xs:280,lg:480}, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                label="Gender"
                onChange={handleChangeState}
              >
                {State.getAllStates()
                  .filter((val) => {
                    return val.countryCode == country;
                  })
                  .sort()
                  .map((val) => (
                    <MenuItem value={val.name}>{val.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: {xs:"",lg:"flex"},
            justifyContent: "space-between",
            mt: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              City <span style={{ color: "red" }}>*</span>
            </Typography>
           
            <FormControl fullWidth>
              
              <Select
                size="small"
                sx={{ width: {xs:280,lg:480}, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                label="Gender"
                onChange={handleChangeCity}
              >
                {cities.map((val) => (
                  <MenuItem value={val.name}>{val.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Pincode <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
                         onChange={handleChangePincode}
                         value={pincode}
                         type="number"
                        sx={{
                          width: {xs:280,lg:480},
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                        size="small"
                      />
            
          </Box>
        </Box>
        <Box
          sx={{
            display: {xs:"",lg:"flex"},
            justifyContent: "space-between",
            mt: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Address one <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
                          onChange={handleChangeAddress}
                          value={address}
                        sx={{
                          width: {xs:280,lg:480},
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                        size="small"
                      />
           
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Address two{" "}
            </Typography>
            <TextField
                          onChange={handleChangeAddresst}
                          value={addresstwo}
                        sx={{
                          width: {xs:280,lg:480},
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                        size="small"
                      />
            
          </Box>
        </Box> */}
        <Box sx={{display:"flex",justifyContent:"flex-end",mt:2}}>
        <Button
                      variant="conatained"
                      size="small"
                      disabled={!checked}
                      sx={{
                        color: "#fff",
                        mr: 2,
                        textTransform:"none",
                        background: "#fdb714",
                        "&:hover": { background: "#fdb714", color: "#fff" },
                      }}
                      onClick={handleClick}
                    >
                      Submit
                    </Button>
        </Box>
        
                    </Box>
                    
                  ) : (
                    <Box></Box>
                  )}
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      display: {xs:"",lg:"flex"},
                      justifyContent: "space-between",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                      >
                        First Name <span style={{ color: "red" }}>*</span>{" "}
                      </Typography>
                      <BootstrapInput
                        sx={{ width: {xs:280,lg:480} }}
                        size="small"
                        inputProps={{ readOnly: true }}
                        value={localStorage.getItem("firstname")}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                      >
                        Middle Name 
                      </Typography>
                      <BootstrapInput
                        sx={{ width: {xs:280,lg:480} }}
                        size="small"
                        inputProps={{ readOnly: true }}
                        value={localStorage.getItem("middlename")}
                      />
                    </Box>
                    
                  </Box>
                  <Box
                    sx={{
                      display: {xs:"",lg:"flex"},
                      justifyContent: "space-between",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                      >
                        Last Name <span style={{ color: "red" }}>*</span>{" "}
                      </Typography>
                      <BootstrapInput
                        sx={{ width: {xs:280,lg:480} }}
                        size="small"
                        inputProps={{ readOnly: true }}
                        value={localStorage.getItem("lastname")}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                      >
                        Phone Number <span style={{ color: "red" }}>*</span>{" "}
                      </Typography>
                      <BootstrapInput
                        type="number"
                        sx={{ width: {xs:280,lg:480} }}
                        size="small"
                        inputProps={{ readOnly: true }}
                        value={localStorage.getItem("mobile")}
                      />
                    </Box>
                   
                  </Box>
                  <Box
                    sx={{
                      display: {xs:"",lg:"flex"},
                      justifyContent: "space-between",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                     <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                      >
                        Email ID <span style={{ color: "red" }}>*</span>{" "}
                      </Typography>
                      <BootstrapInput
                        type="email"
                        sx={{ width: {xs:280,lg:480} }}
                        size="small"
                        inputProps={{ readOnly: true }}
                        value={localStorage.getItem("email")}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                      >
                        Course Applying For <span style={{ color: "red" }}>*</span>{" "}
                      </Typography>
                      {/* <FormControl fullWidth>
                       
                        <Select
                          size="small"
                          sx={{ width: {xs:280,lg:480}, background: "#fff" }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={country}
                          defaultValue="38"
                          label="course"
                          // onChange={handleChangeCountry}
                        >
                          {course.map((val, i) => (
                            <MenuItem value={val.id}>{val.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
                      <BootstrapInput
                  type="text"
                  sx={{ width: {xs:280,lg:480} }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={course[0].name}
                />
                    </Box>

                   
                  </Box>
                  <Box
                    sx={{
                      display: {xs:"",lg:"flex"},
                      justifyContent: "space-between",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                     <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                      >
                        Admission Fee <span style={{ color: "red" }}>*</span>{" "}
                      </Typography>
                      <TextField
                      type="number"
                        onChange={paymentChange}
                        sx={{
                          width: {xs:280,lg:480},
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                        size="small"
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                      >
                        Batch <span style={{ color: "red" }}>*</span>{" "}
                      </Typography>
                      {/* <FormControl fullWidth>
                       
                        <Select
                          size="small"
                          sx={{ width: {xs:280,lg:480}, background: "#fff" }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={country}
                          defaultValue="2023-06-18"
                          label="batch"
                          // onChange={handleChangeCountry}
                        >
                          {batch.map((val, i) => (
                            <MenuItem value={val.id}>{val.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
                      <BootstrapInput
                  type="text"
                  sx={{ width: {xs:280,lg:480} }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={batch[0].name}
                />
                    </Box>
                  </Box>

                  {/* <Box
          sx={{ mb: 0.5, p: 1, borderRadius: "5px" }}
          onClick={handleClickaddress}
        >
          
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "23px",
            }}
          >
            Address Details
          </Typography>
        </Box> */}
        {/* <Collapse in={openaddress} timeout="auto" unmountOnExit sx={{mb:2}}> */}
        {/* <Box
          sx={{
            display: {xs:"",lg:"flex"},
            justifyContent: "space-between",
            mt: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Country <span style={{ color: "red" }}>*</span>{" "}
            </Typography>
            <FormControl fullWidth>
              
              <Select
                size="small"
                sx={{ width: {xs:280,lg:480}, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Gender"
                onChange={handleChangeCountry}
              >
                {Country.getAllCountries().map((val, i) => (
                  <MenuItem value={val.isoCode}>{val.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              State <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              
              <Select
                size="small"
                sx={{ width: {xs:280,lg:480}, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                label="Gender"
                onChange={handleChangeState}
              >
                {State.getAllStates()
                  .filter((val) => {
                    return val.countryCode == country;
                  })
                  .sort()
                  .map((val) => (
                    <MenuItem value={val.name}>{val.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Box> */}
        {/* <Box
          sx={{
            display: {xs:"",lg:"flex"},
            justifyContent: "space-between",
            mt: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              City <span style={{ color: "red" }}>*</span>
            </Typography>
           
            <FormControl fullWidth>
              
              <Select
                size="small"
                sx={{ width: {xs:280,lg:480}, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                label="Gender"
                onChange={handleChangeCity}
              >
                {cities.map((val) => (
                  <MenuItem value={val.name}>{val.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Pincode <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
                         onChange={handleChangePincode}
                         value={pincode}
                         type="number"
                        sx={{
                          width: {xs:280,lg:480},
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                        size="small"
                      />
            
          </Box>
        </Box> */}
        {/* <Box
          sx={{
            display: {xs:"",lg:"flex"},
            justifyContent: "space-between",
            mt: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Address one <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
                          onChange={handleChangeAddress}
                          value={address}
                        
                        sx={{
                          width: {xs:280,lg:480},
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                        size="small"
                      />
           
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Address two{" "}
            </Typography>
            <TextField
                           onChange={handleChangeAddresst}
                           value={addresstwo}
                        sx={{
                          width: {xs:280,lg:480},
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                        size="small"
                      />
            
          </Box>
        </Box> */}

                  
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#fff",
                        mb: 1,
                      }}
                    >
                      <i>Please make the payment below</i>
                    </Typography>

                    <Button
                      variant="conatained"
                      size="small"
                      disabled={enablePay}
                      sx={{
                        color: "#fff",
                        mr: 2,
                        background: "#fdb714",
                        "&:hover": { background: "#fdb714", color: "#fff" },
                      }}
                      onClick={() => {
                        checkoutHandler(addmissionPayment);
                      }}
                    >
                      Pay
                    </Button>
                  </Box>
                </Box>
              )}
              <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}></Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              borderRadius: "5px",
              border: "1px solid #fdb714",
              p: 3,
              width: 300,
            }}
          >
            <BorderLinearProgress
              variant="determinate"
              value={80}
              sx={{ mb: 2 }}
            />
            <Typography sx={{mb:1.5}}>
              Your payment is under process. Please contact your admission
              counsellor for further details
            </Typography>
            <Box  sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Button
                      variant="conatained"
                      size="small"
                      sx={{
                        textAlign:"center",
                        color: "#fff",
                        mr: 2,
                        textTransform:"none",
                        background: "#fdb714",
                        "&:hover": { background: "#fdb714", color: "#fff" },
                      }}
                      onClick={handleChangePayment}
                    >
                      Choose Another Payment Method
                    </Button>
                </Box>
          </Box>
          
        </Box>
      )}

    </Box>
      
     {/* Mobile version */}
     
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
export default AdmissionfeeNew;
