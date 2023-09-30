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
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import logo from '../../images/accredian-logo.png'

import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from '@mui/styles';
import CircularProgress from "@mui/material/CircularProgress";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import icon from '../../images/icon.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { chromeTabsStylesHook } from '@mui-treasury/styles/tabs';
// import { tabsStyles,tabItemStyles } from "./style";
// import { appleTabsStylesHook } from '@mui-treasury/styles/tabs';



const tabsStyles = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: theme.spacing(2),
  },
  tab: {
    minWidth: 'auto',
    padding: '8px 16px',
    borderRadius: '16px',
    fontWeight: 600,
    margin: '0 8px',
    '&.Mui-selected': {
      backgroundColor: "#fdb714",
      color:"#Fff",
    },
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#d9d9d9" : "#2b2b2b",
    border: "1px solid #d9d9d9",
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

const ApplicationFee = (props) => {
  const classes = useStyles();
  // const tabsStyles = appleTabsStylesHook.useTabs();
  // const tabItemStyles = appleTabsStylesHook.useTabItem();
  // console.log(props.step, "step 2");
  // const tabsStyles = chromeTabsStylesHook.useTabs();
  // const tabItemStyles = chromeTabsStylesHook.useTabItem();
  let navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    setUser(user_id);
  }, []);

  if (user == null) {
    navigate(`/Login`);
  }

  const [openPersonal, setOpenPersonal] = useState(false);
  const [openADD, setOpenADD] = useState(false);
  const [openaddress, setOpenaddress] = useState(false);
  const [course, setCourse] = useState([]);
  // const [batch, setBatch] = useState([]);
  const [paymentid, setPaymentid] = useState("");
  const [backopen, setBackopen] = useState(false);
  const [batchid, setBatchid] = useState("");
  const [batchs, setBatchs] = useState(" ");
  const [batchtext, setBatchtxt] = useState(" ");
  const [courses, setCourses] = useState(" ");
  const [category, setCategory] = useState(" ");
  const [coursescode, setCoursescode] = useState(" ");
  const [value, setValue] = useState(0);
  const [payment, setPayment] = useState();
  const [addmissionPayment, setAddmissionpayment] = useState('');
  // const [course, setCourse] = useState([]);
  const [batch, setBatch] = useState([]);
  // const [paymentid, setPaymentid] = useState("");
  const [show, setShow] = useState(false);
  const [paymentChanges, setpaymentChange] = useState(false);
  // const [paymentChanges, setpaymentChange] = useState(false);
  const[enablePayFinance,setPayFinance]=useState(true)
  const[enablePay,setPay]=useState(true)
  const [checked,setChecked]=useState(false)
  const [programName,setProgramName]=useState("")
  const LoaderClose = () => {
    setBackopen(false);
  };

  console.log(addmissionPayment,"feeeee")
  useEffect(()=>{
    if(addmissionPayment){
      setPay(false)
    }
    else{
      setPay(true)
    }
  },[addmissionPayment])
  const handleCheck=( event)=>{
    setChecked(event.target.checked);
  }
  const handleChangePayment=()=>{
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
      data: {
        type: "update_choice_full_payment_test",
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
   
    
  }
  const LoaderOpen = () => {
    setBackopen(true);
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
  // function userd() {
  //   axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
  //     data: {
  //       type: "get_user_basic_details_test",
  //       user_id: localStorage.getItem("user_id"),
  //     },
  //   }).then(function (response) {
  //     localStorage.setItem("firstname", response.data.firstname);
  //     if (response.data.lastname.split(" ").length > 1) {
  //       localStorage.setItem("lastname", response.data.lastname.split(" ")[1]);
  //       localStorage.setItem(
  //         "middlename",
  //         response.data.lastname.split(" ")[0]
  //       );
  //     } else {
  //       localStorage.setItem("lastname", response.data.lastname);
  //     }
  //     localStorage.setItem("mobile", response.data.mobile);
  //   });
  // }
  // useEffect(() => {
  //   userd();
  // }, []);
  function TabPanel(props) {
    const { children, value, index } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const handleChange = (event, newValue) => {
   
    setValue(newValue);
    
  };

  const handleChangefull = (e) => {
    setPayment(e.target.value);
    if(e.target.value=='Finance partner'){
      setAddmissionpayment('')
      }
  };
  useEffect(() => {
    if (paymentid) {
     
      if(value==0){
        LoaderOpen();
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
          data: {
            type: "insert_application_details_pubsub_test",
            user_id: parseInt(localStorage.getItem("user_id")),
            payment_id: paymentid,
            firstname: localStorage.getItem("firstname"),
            lastname: localStorage.getItem("lastname"),
            mobile: localStorage.getItem("mobile"),
            email: localStorage.getItem("email"),
            batch: batchid,
            program: courses,
            amount: 1000000,
          },
        }).then((response) => {
          if (response.data.status == 200) {
            
            props.handleNext2();
            localStorage.setItem("currentStep", response.data.data.current_step_count);
            localStorage.setItem("currentStepStatus", response.data.data.current_step_status);
            LoaderClose();
            // axios({
            //   method: "post",
            //   url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
            //   data: {
            //     type: "update_step_two_status_test",
            //     user_id: parseInt(localStorage.getItem("user_id")),
            //     status: "complete",
            //   },
            // }).then((response) => {
            //   if (response.data.status == 200) {
            //     props.stepCount();
            //     // props.userd();
            //   }
            // });
          }
          //  else {
          //   axios({
          //     method: "post",
          //     url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
          //     data: {
          //       type: "update_step_two_status_test",
          //       user_id: parseInt(localStorage.getItem("user_id")),
          //       status: "inprocess",
          //     },
          //   }).then((response) => {
          //     if (response.data.status == 200) {
          //       console.log("inprocess");
          //     }
          //   });
          // }
        });
      }
      else{
        LoaderOpen();
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
          data: {
            type: "insert_full_payment_details_pubsub_test",
            user_id: parseInt(localStorage.getItem("user_id")),
            payment_id: paymentid,
            firstname: localStorage.getItem("firstname"),
            lastname: localStorage.getItem("lastname"),
            mobile: localStorage.getItem("mobile"),
            email: localStorage.getItem("email"),
            batch: batchid,
            program: courses,
            amount: addmissionPayment * 100,
          },
        }).then((response) => {
          if (response.data.status == 200) {
           
            props.handleNext2();
            props.handleNext3();
            localStorage.setItem("currentStep", response.data.data.current_step_count);
            localStorage.setItem("currentStepStatus", response.data.data.current_step_status);
            LoaderClose();
            // axios({
            //   method: "post",
            //   url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
            //   data: {
            //     type: "update_step_two_status_test",
            //     user_id: parseInt(localStorage.getItem("user_id")),
            //     status: "complete",
            //   },
            // }).then((response) => {
            //   if (response.data.status == 200) {
            //     props.stepCount();
            //     // props.userd();
            //   }
            // });
          }
          //  else {
          //   axios({
          //     method: "post",
          //     url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
          //     data: {
          //       type: "update_step_two_status_test",
          //       user_id: parseInt(localStorage.getItem("user_id")),
          //       status: "inprocess",
          //     },
          //   }).then((response) => {
          //     if (response.data.status == 200) {
          //       console.log("inprocess");
          //     }
          //   });
          // }
        });
      }
     
    }
  }, [paymentid]);
  // console.log(course, "array");
  useEffect(() => {
    const fetchone = () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
        data: {
          type: "fetch_xlri_programs_and_batches_test",
          category_id:localStorage.getItem("category")
        },
      }).then((response) => {
        if(response.data.status==200){
          if(response.data.batches.status==200){
            // setBatch(response.data);
            setBatchid(response.data.batches.batch_id)
            setBatchtxt(response.data.batches.batch_text);
          }
          if(response.data.programs.status==200){
            // setCourse(response.data);
            setCoursescode(response.data.programs.pcode);
            setCourses(response.data.programs.pid);
            setProgramName(response.data.programs.pname)
          }
        }
        // console.log(response.data[0].pname,"courseee")
        // setCourse([
        //   {
        //     id: response.data[0].pid,
        //     name: response.data[0].pname,
        //     pcode: response.data[0].pcode,
        //   },
        // ]);
        // setCourse(response.data);
        // setCoursescode(response.data[0].pcode);
        // setCourses(response.data[0].pid);
      });
    };
    // const fetchCourse = () => {
    //   axios({
    //     method: "post",
    //     url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
    //     data: {
    //       type: "fetch_xlri_programs_test",
    //     },
    //   }).then((response) => {
    //     // console.log(response.data[0].pname,"courseee")
    //     // setCourse([
    //     //   {
    //     //     id: response.data[0].pid,
    //     //     name: response.data[0].pname,
    //     //     pcode: response.data[0].pcode,
    //     //   },
    //     // ]);
    //     setCourse(response.data);
    //     setCoursescode(response.data[0].pcode);
    //     setCourses(response.data[0].pid);
    //   });
    // };
    // // console.log(course, "eee");
    // const fetchBatch = () => {
    //   axios({
    //     method: "post",
    //     url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
    //     data: {
    //       type: "fetch_xlri_batches_test",
    //     },
    //   }).then((response) => {
    //     setBatch(response.data);
    //     setBatchtxt(response.data[0].batch_text);
    //   });
    // };
    // fetchCourse();
    // fetchBatch();
    fetchone();
    // props.userd();
  },[]);

  const paymentChangefull = (e) => {
    // console.log(e.target.value,"ooooo")
    // const currentScrollY = window.scrollY;
    // e.preventDefault();
    setAddmissionpayment(e.target.value);
    // window.scrollTo(0, currentScrollY);
  };
  const handleChangecourse = (pcode, pid, cid) => {
    setCourses(pid);
    setCoursescode(pcode);
    setCategory(cid);

    console.log(pid);
  };
  const handleChangebatch = (registerId, batch, batchtext) => {
    setBatchs(batch);
    setBatchtxt(batchtext);
    //  setRegisterid(registerId)
  };


  const handleClick = () => {
    LoaderOpen();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
      data: {
        type: "update_vendor_full_payment_test",
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
  // console.log(course[0].pcode,"check")
  const checkoutHandler = async (amount) => {
    const options = {
      // key: "rzp_live_kuHNpOKPMVihkI",
      key:process.env.REACT_APP_RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "Accredian",
      description: "registration fees for " + coursescode,
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

    console.log("chala kya");
  };

  console.log(value, "seee");
  // const blinkingStyle = {
  //   animation: 'blink 1s infinite',
  //   '@keyframes blink': {
  //     '0%, 100%': {
  //       opacity: 1,
  //       transform: 'scale(1)',
  //     },
  //     '50%': {
  //       opacity: 0.5,
  //       transform: 'scale(1.1)',
  //     },
  //   },
  // };

  return (
    <>
    {/* <BlinkingTextField/> */}
    {/* <Box sx={{display:"flex",pla}}> */}
    
    <Box sx={{display:"grid",placeItems:"center"}}>
      {/* <Box sx={{display:"flex"}}> */}
      <Typography sx={{color:"red", animation: "blink 1s infinite ",'@keyframes blink': {
      '0%, 100%': {
        opacity: 1,
        transform: 'scale(1)',
      },
      '50%': {
        opacity: 1,
        transform: 'scale(1.1)',
      },
    },fontSize:{xs:"14px",lg:"16px"}}}><i style={{textAlign:"center"}}>Please select a payment option</i></Typography>
    <ArrowDownwardIcon sx={{color:"red", mb:1, animation: "blink 1s infinite ",'@keyframes blink': {
      '0%, 100%': {
        opacity: 1,
        transform: 'scale(1)',
      },
      '50%': {
        opacity: 1,
        transform: 'scale(1.1)',
      },
    },}}/>
    <Box sx={{border:"2px solid white",width:{xs:220,lg:"fit-content"},borderRadius:{xs:"7px",lg:"9px"},height:"41px"}}>
    <Tabs
                        orientation="horizontal"
                        onChange={handleChange}
                        value={value}
                        centered
    
                        sx={{
                        //  border:"2px solid black",
                          "& button": {
                            borderRadius: 1,
                            color:"#fff !important",
                            minHeight: "fit-content !important",
                            textTransform: "initial !important",
                          },
                          "& button.Mui-selected": {
                            backgroundColor: "#fdb714 !important",
                            color: "#fff!important",
                            borderRadius: "8px",
                            // width: "100%",
                          },
                          "& span.MuiTabs-indicator": { 
                            display:"none"
    

                           },
                        }}
                      >
                        <Tab
                       
                          value={0}
                          sx={{textAlign:"left"}}
                          label="Registration"
                        ></Tab>
                         <Tab
                       
                          value={1}
                          sx={{textAlign:"left"}}
                          label="Full Payment"
                        ></Tab>
                         
                      
                        

                       
                      </Tabs>
                          {/* <FormControl >
     
      <RadioGroup
      sx={{display:"flex"}}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Registration" />
        <FormControlLabel value="male" control={<Radio />} label="Full Payment" />
       
      </RadioGroup>
    </FormControl> */}

    </Box>
      {/* </Box> */}
    
    </Box>
    {/* </Box> */}
    
    
   
    {value===0 &&(
      <Box>
     {localStorage.getItem("currentStepStatus") == "pending" ? (
        <Box>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <Box
              sx={{
                mb: 0.5,

                p: 1,
                borderRadius: "5px",
              }}
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
                Payment
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
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  First Name
                </Typography>
                <BootstrapInput
                  sx={{ width: 480 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={localStorage.getItem("firstname")}
                />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Middle Name
                </Typography>
                <BootstrapInput
                  sx={{ width: 480 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={localStorage.getItem("middlename")}
                />
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
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Last Name
                </Typography>
                <BootstrapInput
                  sx={{ width: 480 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={localStorage.getItem("lastname")}
                />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Phone Number
                </Typography>
                <BootstrapInput
                  type="number"
                  sx={{ width: 480 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={localStorage.getItem("mobile")}
                />
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
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Email ID
                </Typography>
                <BootstrapInput
                  type="email"
                  sx={{ width: 480 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={localStorage.getItem("email")}
                />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Course Applying For
                </Typography>

                <BootstrapInput
                  type="email"
                  sx={{ width: 480 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={programName}
                />
                {/* <FormControl fullWidth>
                <Select
                  size="small"
                  sx={{ width: 480, background: "#fff" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={country}
                  defaultValue="38"
                  label="course"
                  // onChange={handleChangeCountry}
                >
                  
                  {course.map((val, i) => (
                    <MenuItem  onClick={() => handleChangecourse(val.pcode, val.pid,val.category_id)} value={val.pid}>{val.pname}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
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
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Application Fee
                </Typography>
                <BootstrapInput
                  sx={{ width: 480 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="INR10,000"
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Batch
                </Typography>
                {/* <FormControl fullWidth>
             
              <Select
                size="small"
                sx={{ width: 480, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={country}
                defaultValue="2023-06-01"
                label="batch"
                // onChange={handleChangeCountry}
              >
                 {batch.map((val, i) => (
                      <MenuItem  onClick={() => handleChangebatch(val.register_id,val.batch_id,val.batch_text)} value={val.batch_id}>{val.batch_text}</MenuItem>
                    ))}
               
              </Select>
            </FormControl> */}
                <BootstrapInput
                  type="email"
                  sx={{ width: 480 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={batchtext}
                />
              </Box>
            </Box>

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
                sx={{
                  color: "#fff",
                  mr: 2,
                  background: "#fdb714",
                  "&:hover": { background: "#fdb714", color: "#fff" },
                }}
                onClick={() => {
                  checkoutHandler(10000);
                }}
              >
                Pay ₹10,000
              </Button>
            </Box>
          </Box>

          {/*  mobile version */}
          <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <Box
              sx={{
                mb: 0.5,

                p: 1,
                borderRadius: "5px",
              }}
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
                Payment
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
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  First Name
                </Typography>
                <BootstrapInput
                  sx={{ width: 280 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={localStorage.getItem("firstname")}
                />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Middle Name
                </Typography>
                <BootstrapInput
                  sx={{ width: 280 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={localStorage.getItem("middlename")}
                />
              </Box>
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
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Last Name
                </Typography>
                <BootstrapInput
                  sx={{ width: 280 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={localStorage.getItem("lastname")}
                />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Phone Number
                </Typography>
                <BootstrapInput
                  type="number"
                  sx={{ width: 280 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={localStorage.getItem("mobile")}
                />
              </Box>
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
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Email ID
                </Typography>
                <BootstrapInput
                  type="email"
                  sx={{ width: 280 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={localStorage.getItem("email")}
                />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Course Applying For
                </Typography>
                {/* <FormControl fullWidth>
                <Select
                  size="small"
                  sx={{ width: 280, background: "#fff" }}
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
                  type="email"
                  sx={{ width: 280 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={programName}
                />
              </Box>
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
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Application Fee
                </Typography>
                <BootstrapInput
                  sx={{ width: 280 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  defaultValue="INR10,000"
                />
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#fff" }}
                >
                  Batch
                </Typography>
                <BootstrapInput
                  type="email"
                  sx={{ width: 280 }}
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={batchtext}
                />
                {/* <FormControl fullWidth>

              <Select
                size="small"
                sx={{ width: 220, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={country}
                defaultValue="2023-06-01"
                label="batch"
                // onChange={handleChangeCountry}
              >
                {batch.map((val, i) => (
                  <MenuItem value={val.id}>{val.name}</MenuItem>
                ))}
              </Select>
            </FormControl> */}
              </Box>
            </Box>

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
                sx={{
                  color: "#fff",
                  mr: 2,
                  background: "#fdb714",
                  "&:hover": { background: "#fdb714", color: "#fff" },
                }}
                onClick={() => {
                  checkoutHandler(10000);
                }}
              >
                Pay ₹10,000
              </Button>
            </Box>
          </Box>
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
              width: {lg:300,xs:230},
              mt:4
            }}
          >
            <BorderLinearProgress
              variant="determinate"
              value={80}
              sx={{ mb: 2 }}
            />
            <Typography>
              Your payment is under process. Please contact your admission
              counsellor for further details
            </Typography>
            <Box  sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt:2
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
    )}

    {value===1 &&(
      <Box>
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
          Full Payment
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
                  onChange={handleChangefull}
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
                  width: {lg:300,xs:230},
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
           <Box sx={{background:"#fff",borderRadius:"8px",border:"1px solid #fdb714",px:1,pb:1.5,width:{lg:460,xs:250}}}>
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
        <Box sx={{display:"flex",justifyContent:"flex-end",mt:3}}>
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
                  value={programName}
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
                      value={addmissionPayment}
                      onChange={paymentChangefull}
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
                  value={batchtext}
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
                sx={{ width: {xs:220,lg:480}, background: "#fff" }}
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
                sx={{ width: {xs:220,lg:480}, background: "#fff" }}
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
                sx={{ width: {xs:220,lg:480}, background: "#fff" }}
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
                          width: {xs:220,lg:480},
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
                          width: {xs:220,lg:480},
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
                          width: {xs:220,lg:480},
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
              width:{lg:300,xs:230},
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
      </Box>
    )}

                      {/* <TabPanel value={value} index={0}>
                 
                    </TabPanel> */}
                    {/* <TabPanel value={value} index={1}>
                   
                    </TabPanel> */}
                      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backopen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
                    <ToastContainer/>
      
    </>
  );
};
export default ApplicationFee;
