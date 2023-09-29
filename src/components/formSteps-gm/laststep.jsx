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
  CardMedia
} from "@mui/material";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from "axios";
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import useRazorpay from "react-razorpay";
import {  useNavigate } from "react-router-dom";
import { Preview } from "@mui/icons-material";
import XLRI_LOGO from '../../images/xlri.png'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
      width: 480,
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
  const getDownload=(word,url)=>{
    const a = document.createElement("a");
    a.href = url
    a.download = `${word}.pdf`
    a.target="blank"
    a.click();
    
    };

const Laststep=(props)=>{
//   console.log(props.step,"step 2")
  let navigate = useNavigate();
  const[user,setUser]=useState('');
     useEffect(()=>{
      var user_id = localStorage.getItem("user_id");
      setUser(user_id)
     },[])
  
     if (user == null) {
      navigate(`/Login`);
     }
     const InsertintoSheet=(data)=>{
 
      const formDatab = new FormData();
      // formDatab.append("Sno",sn);
      formDatab.append("Batch",data.batch);
      formDatab.append("Name",data.name);
      formDatab.append("Email",data.email);
      formDatab.append("Gender",data.gender);
      formDatab.append("Dob",data.dob);
      formDatab.append("Phone",data.phone);
      formDatab.append("City",data.city);
      formDatab.append("Workex",data.experience);
      formDatab.append("Education",data.highest_education);
      formDatab.append("Company",data.company);
      formDatab.append("Designation",data.designation);
      formDatab.append("Industry",data.industry);
      formDatab.append("WorkexLink",data.company_doc_file_path);
      formDatab.append("Educationlink",data.degree_file_path);
      formDatab.append("LMS","Yes");
      formDatab.append("Enrollment","Yes");
    
    fetch(
    "https://script.google.com/macros/s/AKfycbz0H5zSbqOdTKkxMTxd76VlU2ahBEXufxZV33OEFXX1ibj1GGAIbjSCc_KWrjWx23FlBg/exec",
    {
    method: "POST",
    body: formDatab
    }
    )
    .then((res) =>{ 
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
        data: {
          type: "update_last_step_status_test",
          user_id: parseInt(localStorage.getItem("user_id")),
        },
      }).then((res)=>{
        localStorage.setItem("currentStep", res.data.data.current_step_count);
        localStorage.setItem("currentStepStatus", res.data.data.current_step_status);
      })
      
      res.json()})
    .then((data) => {
     
    console.log(data);
    })
    .catch((error) => {
    console.log(error);
    });
      
      
    
    }
     useEffect(()=>{
      if(localStorage.getItem("currentStepStatus")=="pending"){
        axios({
                          method: "post",
                          url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-data-test.php`,
                          data: {
                            type: "fetch_xlri_sheet_data_test",
                            user_id: parseInt(localStorage.getItem("user_id")),
                            category_id:localStorage.getItem("category")
                          },
                        }).then((res)=>{
                         if(res.data[0].status==200){
                          InsertintoSheet(res.data[0])
                         }})
      }
     },[])
    const [openPersonal, setOpenPersonal] = useState(false);
    const [openADD, setOpenADD] = useState(false);
    const [openaddress, setOpenaddress] = useState(false);
    const handleClickPersonal = () => {
        setOpenPersonal(!openPersonal);
      };
      const handleClickAdd = () => {
        setOpenADD(!openADD);
      };
      const handleClickaddress = () => {
        setOpenaddress(!openaddress);
      };
      const checkoutHandler = async (amount) => {
       


        const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

        const order = await axios.post("http://localhost:4000/api/checkout", {
            amount
        })
        // const data=order.json()
        console.log(order,"see the order")
        const options = {
            key,
            amount: order.data.response.amount,
            currency: "INR",
            name: "Insaid",
            description: "Tutorial of RazorPay",
            image: "https://www.accredian.co/wp-content/uploads/2021/05/insaid-text-logo-2x.png",
            order_id: order.data.response.id,
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                name: "Himanshu Banswal",
                email: "himanhsu.banswal@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();

        
    }

    // Your admission request has been successfully submitted. You'll receive an admission confirmation letter from XLRI within 7 working days

    return (
        <>
      {/* desktop version */}

      <Box sx={{display: { xs: "none", lg: "flex"},justifyContent:"center",alignItems:"center"}}>
       {/* <CheckCircleIcon sx={{color:"green",fontSize:"55px"}}/> */}
              <Box sx={{background:"#fff",borderRadius:"5px",border:"1px solid #fdb714",px:3,pb:3,width:330}}>
              <Box sx={{textAlign:"center"}}>
        <CheckCircleIcon sx={{color:"#fdb714",fontSize:"80px",pt:1,pb:0.5}}/>
       </Box>
                <Typography sx={{textAlign:"center",fontWeight:"500",fontSize:"20px",mb:0.5}}>Thank You!</Typography>
                <Typography sx={{textAlign:"center",fontWeight:"300",fontSize:"16px",mb:3}}>
                Your admission request has been successfully submitted.You'll receive an admission confirmation letter from XLRI within 7 working days.
                </Typography>
            <Box sx={{display:"flex",justifyContent:"center",alignItem:"center"}}>
              {/* <a
               style={{textDecoration:"none"}}
              href={`https://insaid.co//wp-content/xlriapplications/${localStorage.getItem("user_id")}.pdf`}
              download={`${localStorage.getItem("user_id")}.pdf`}
              > */}
              {/* <Button variant="conatained" size="small" sx={{color:"#fff",background:"#fdb714",textTransform:"none",width:150
          ,"&:hover":{background:"#fdb714",color:"#fff"}}}
          onClick={()=>{getDownload(localStorage.getItem("user_id"),`${process.env.REACT_APP_BASE_URL}//wp-content/xlriapplications/XLRI_Application_${localStorage.getItem("user_id")}.pdf`)}}
          
          >
            Download Form
          </Button> */}
              
              <Button  href="https://www.accredian.com/my-account/" target="blank"  variant="conatained" size="small" sx={{color:"#fff",background:"#fdb714",textTransform:"none",width:150
          ,"&:hover":{background:"#fdb714",color:"#fff"}}}
          // onClick={handleNext}
          // disabled={nxt}
          >
          Go To Dashboard
          </Button>
            {/* </a> */}
            
            
          
            </Box>
                
              </Box>
            </Box>
           {/* mobile version */}
           <Box sx={{display: { xs: "flex", lg: "none"},justifyContent:"center",alignItems:"center"}}>
       {/* <CheckCircleIcon sx={{color:"green",fontSize:"55px"}}/> */}
              <Box sx={{background:"#fff",borderRadius:"5px",border:"1px solid #fdb714",px:3,pb:3,width:350}}>
              <Box sx={{textAlign:"center"}}>
        <CheckCircleIcon sx={{color:"#fdb714",fontSize:"80px",pt:1,pb:0.5}}/>
       </Box>
                <Typography sx={{textAlign:"center",fontWeight:"500",fontSize:"20px",mb:0.5}}>Thank You!</Typography>
                <Typography sx={{textAlign:"center",fontWeight:"300",fontSize:"16px",mb:3}}>
                Your admission request has been successfully submitted.You'll receive an admission confirmation letter from XLRI within 7 working days.
                </Typography>
            <Box sx={{display:"flex",justifyContent:"center",alignItem:"center"}}>
              {/* <a
               style={{textDecoration:"none"}}
              href={`${process.env.REACT_APP_BASE_URL}//wp-content/xlriapplications/${localStorage.getItem("user_id")}.pdf`}
              download={`${localStorage.getItem("user_id")}.pdf`}
              > */}
              {/* <Button variant="conatained" size="small" sx={{color:"#fff",background:"#fdb714",textTransform:"none",width:85,height:50 
          ,"&:hover":{background:"#fdb714",color:"#fff"}}}
          onClick={()=>{getDownload(localStorage.getItem("user_id"),`${process.env.REACT_APP_BASE_URL}//wp-content/xlriapplications/XLRI_Application_${localStorage.getItem("user_id")}.pdf`)}}
          
          >
            Download Form
          </Button> */}
              
              <Button  href="https://www.accredian.com/my-account/" target="blank"  variant="conatained" size="small" sx={{color:"#fff",background:"#fdb714",textTransform:"none",width:85,height:50,ml:2,textAlign:"center"
          ,"&:hover":{background:"#fdb714",color:"#fff"}}}
          // onClick={handleNext}
          // disabled={nxt}
          >
          Go To Dashboard
          </Button>
            {/* </a> */}
            
            
          
            </Box>
                
              </Box>
            </Box>
            
        </>
    )
}
export default Laststep


// cii11621@omeie.com