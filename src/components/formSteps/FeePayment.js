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
import axios from "axios";
import useRazorpay from "react-razorpay";


const Payment=()=>{
    // const Razorpay = useRazorpay();
    // function loadScript(src) {
    //     return new Promise((resolve) => {
    //         const script = document.createElement("script");
    //         script.src = src;
    //         script.onload = () => {
    //             resolve(true);
    //         };
    //         script.onerror = () => {
    //             resolve(false);
    //         };
    //         document.body.appendChild(script);
    //     });
    // }
    
    // useEffect(() => {
    //     loadScript("https://checkout.razorpay.com/v1/checkout.js");
    // });
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
        // const res = await loadScript(
        //     "https://checkout.razorpay.com/v1/checkout.js"
        // );
        // if (!res) {
        //     alert("Razorpay SDK failed to load. Are you online?");
        //     return;
        // }


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
            image: "https://www.insaid.co/wp-content/uploads/2021/05/insaid-text-logo-2x.png",
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

        console.log("chala kya")
    }
console.log(window,"seee")
    return (
        <>
        <Box sx={{mb:0.5,background:"#fff5e7",p:1,borderRadius:"5px",display:"flex"}} onClick={handleClickPersonal}>
            {openPersonal ? <ExpandLess sx={{color:"#fba016"}} /> : <ExpandMore sx={{color:"#fba016"}} />}
                <Typography sx={{color:"#fba016"}}>Payment</Typography>
                
            </Box>
            <Collapse in={openPersonal} timeout="auto" unmountOnExit sx={{mb:2}}>
            <Box sx={{mt:1,mb:1}}>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Note:</Typography>
                    <Typography>Please enter full name as per the 10th Certificate</Typography>
               
                    </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Application Number</Typography>
                <TextField type="number" sx={{width:520}} size="small"/>
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Full Name</Typography>
                <TextField sx={{width:520}} size="small"/>
                    </Box>
               
             
                </Box>
                <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Email ID</Typography>
                <TextField type="email" sx={{width:520}} size="small"/>
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Phone Number</Typography>
                <TextField type="number" sx={{width:520}} size="small"/>
                    </Box>
                    
               
             
                </Box>
                <Box sx={{display:"flex",justifyContent:"space-between",mt:1,mb:1}}>
                    
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Course Applying For</Typography>
                <TextField  sx={{width:520}} size="small"/>
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b"}}>Application Fee</Typography>
                <TextField type="number" sx={{width:520}} size="small"/>
                    </Box>
                    
               
             
                </Box>
                <Box>
                <Typography sx={{fontWeight:"bold",fontSize:"14px",color:"#454f5b",mb:1}}><i>Please make the payment below</i></Typography>

                  <Button variant="conatained" size="small" sx={{color:"#fff",mr:2,background:"#fba015","&:hover":{background:'#fba015',color:"#fff"}}}
           onClick={()=>{checkoutHandler(10000)}}
            >
        Pay $10000
            </Button>
               
                </Box>
                
      </Collapse>
            
        </>
    )
}
export default Payment