import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  Badge,
  Checkbox,
  Tabs,
  Tab,
  Step,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StepButton from "@mui/material/StepButton";
import Personal from "./Personal";
import PersonalNew from "./PersonalNew";
import PaymentNew from "./FeePayment-new";
import Payment from "./FeePayment";
import AdmissionNew from "./AddmissionFee-new";
import Education from "./Education";
import XLRI_LOGO from "../../images/xlri.png";
import Insaid_LOGO from "../../images/white-logo (1).png";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import PreviewForm from "./FormPreview";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import logo from '../../images/accredainw.webp'

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  // fontSize:"100px",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#fdb714",
  }),
  ...(ownerState.completed && {
    backgroundColor: "green",
  }),
}));


function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? (
        <Check sx={{ fontSize: "35px" }} />
      ) : (
        <Box>
          {active ? (
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {icons[String(props.icon)]}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "20px" }}>
              {icons[String(props.icon)]}
            </Typography>
          )}
        </Box>
      )}
    </ColorlibStepIconRoot>
  );
}

// Mobile Version
const ColorlibStepIconRootMob = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 25,
  height: 25,
  // fontSize:"100px",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#fdb714",
  }),
  ...(ownerState.completed && {
    backgroundColor: "green",
  }),
}));


function ColorlibStepIconMob(props) {
  const { active, completed, className } = props;

  const icons = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  };

  return (
    <ColorlibStepIconRootMob
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? (
        <Check sx={{ fontSize: "17px" }} />
      ) : (
        <Box>
          {active ? (
            <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
              {icons[String(props.icon)]}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "12px" }}>
              {icons[String(props.icon)]}
            </Typography>
          )}
        </Box>
      )}
    </ColorlibStepIconRootMob>
  );
}


const BasicNew = () => {
  // const classes = useStyles();
  let navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    setUser(user_id);
  }, []);

  if (user == null) {
    navigate(`/Login`);
  }
  let [activeStep, setActiveStep] = useState(0);
  const [nxt, setNxt] = useState(true);
  const [step, setSteps] = useState("");
  const [completed, setCompleted] = useState({});
  // const[firstname,setfirstname]=useState('')
  // const[lastname,setLastName]=useState('')
  // const[stepState,setStepstate]=useState('')
  const current_step_count=localStorage.getItem("currentStep")
  const current_step_status=localStorage.getItem("currentStepStatus")
  function stepCount() {
    // axios({
    //   method: "post",
    //   url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data-test.php`,
    //   data: {
    //     type: "xlri_step_test",
    //     user_id: localStorage.getItem("user_id"),
    //   },
    // }).then(function (response) {
    //   console.log(response.data[0], "step");
    //   setSteps(response.data[0]);
    // });
    if (current_step_count) {
      // console.log("inside step");
      if (current_step_count=='r/+KNaP4RD0DybChQ+ORJA==' && current_step_status == "pending") {
        setActiveStep(0);
        _renderStepContent(0);
      }
      if (
        ((current_step_count=='uGugRq191xjUiMV0Z4gbZQ==' &&current_step_status == "pending") || (current_step_count=='uGugRq191xjUiMV0Z4gbZQ==' && current_step_status == "inprocess")) 
        // current_step_count=='1'&& current_step_status == "complete"
      ) {
        setActiveStep(1);
        const newCompleted = completed;
        newCompleted[0] = true;
        setCompleted(newCompleted);
        _renderStepContent(1);
      }
      if (
        ((current_step_count=='UXxd22qvQ9kHfw0FjJnXaQ==' &&current_step_status == "pending") || (current_step_count=='UXxd22qvQ9kHfw0FjJnXaQ==' && current_step_status == "inprocess")) 
        // current_step_count=='2'&& current_step_status == "complete"
      ) {
        setActiveStep(2);
        const newCompleted = completed;
        newCompleted[0] = true;
        newCompleted[1] = true;
        setCompleted(newCompleted);
        _renderStepContent(2);
      }
      if (
        ((current_step_count=='kEZPY1a8e83FuRRLDy8czA==' &&current_step_status == "pending") || (current_step_count=='kEZPY1a8e83FuRRLDy8czA==' && current_step_status == "inprocess"))
        // current_step_count=='3'&& current_step_status == "complete"
      ) {
        setActiveStep(3);
        const newCompleted = completed;
        newCompleted[0] = true;
        newCompleted[1] = true;
        newCompleted[2] = true;
        setCompleted(newCompleted);
        _renderStepContent(3);
      }
      if (
        ((current_step_count=='VftoxbQ3nU9eJFNpAidRig==' &&current_step_status == "pending") || (current_step_count=='VftoxbQ3nU9eJFNpAidRig==' && current_step_status == "inprocess")) 
        // current_step_count=='4'&& current_step_status == "complete"
      ) {
        setActiveStep(4);
        const newCompleted = completed;
        newCompleted[0] = true;
        newCompleted[1] = true;
        newCompleted[2] = true;
        newCompleted[3] = true;
        setCompleted(newCompleted);
        _renderStepContent(4);
      }
      if (
        
        (current_step_count=='VftoxbQ3nU9eJFNpAidRig==' &&current_step_status == "complete")
      ) {
        setActiveStep(4);
        const newCompleted = completed;
        newCompleted[0] = true;
        newCompleted[1] = true;
        newCompleted[2] = true;
        newCompleted[3] = true;
        setCompleted(newCompleted);
        _renderStepContent(4);
      }
    }
  }
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
  //     localStorage.setItem("firstname", response.data.firstname);
  //     localStorage.setItem("mobile", response.data.mobile);
  //     if(response.data.lastname.split(" ").length>1){
  //       localStorage.setItem("lastname", response.data.lastname.split(" ")[1]);
  //       localStorage.setItem("middlename", response.data.lastname.split(" ")[0]);
  //     }
  //     else{
  //       localStorage.setItem("lastname", response.data.lastname);
  //     }
  //   });
  // }
  // useEffect(() => {
  //   stepCount();
  //   // userd();
  // }, []);
  // console.log(step, "step ka ibject");
 
  useEffect(() => {
    stepCount()
  }, [activeStep, step,current_step_count,current_step_status]);
  // console.log(activeStep,"step count")
  function _renderStepContent(steps) {
    switch (steps) {
      case 0:
        return (
          <PersonalNew
            setNxt={setNxt}
            handleNext1={handleNext1}
            stepCount={stepCount}
            // userd={userd}
            step={step}
            // firstname={firstname}
            // lastname={lastname}
          />
        );
      case 1:
        return (
          <PaymentNew
            // step={step}
            // userd={userd}
            stepCount={stepCount}
            handleNext2={handleNext2}
            handleNext3={handleNext3}
          />
        );
      case 2:
        return (
          <AdmissionNew
            // step={step}
            stepCount={stepCount}
            // userd={userd}
            handleNext3={handleNext3}
          />
        );
      case 3:
        return (
          <Education
            // step={step}
            stepCount={stepCount}
            // userd={userd}
            handleNext4={handleNext4}
          />
        );
      case 4:
        return <PreviewForm  />;
      default:
        return <div>Not Found</div>;
    }
  }

  const steps = [
    "Basic Details",
    "Application Fee Payment",
    "Admission Fee Payment",
    "Education,Work & More",
    "Admission Form Preview",
  ];

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext1 = () => {
    // activeStep++;
    setActiveStep(1);
    const newCompleted = completed;
    newCompleted[0] = true;
    setCompleted(newCompleted);
    _renderStepContent(1);
  };
  const handleNext2 = () => {
    // activeStep++;
    setActiveStep(2);
    const newCompleted = completed;
    newCompleted[0] = true;
    newCompleted[1] = true;
    setCompleted(newCompleted);
    _renderStepContent(2);
  };
  const handleNext3 = () => {
    // activeStep++;
    setActiveStep(3);
    const newCompleted = completed;
    newCompleted[0] = true;
    newCompleted[1] = true;
    newCompleted[2] = true;
    setCompleted(newCompleted);
    _renderStepContent(3);
  };
  const handleNext4 = () => {
    // activeStep++;
    setActiveStep(4);
    const newCompleted = completed;
    newCompleted[0] = true;
    newCompleted[1] = true;
    newCompleted[2] = true;
    newCompleted[3] = true;
    setCompleted(newCompleted);
    _renderStepContent(4);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.clear();
    navigate("/login");
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  //   const handleComplete = () => {

  //   };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  return (
    <>
      <Box className="bg">
        <Box sx={{ mb: 3, display: "flex" }}>
          <Box>
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
            <CardMedia
              fullWidth
              component="img"
              image={XLRI_LOGO}
              alt="green iguana"
              sx={{
                display: { xs: "block", lg: "none" },
                //  objectFit:"none",
                width: 110,
                py: 1,
                mt: 1,
                ml: 1,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "end", width: "82%" }}>
          <Box sx={{display: { xs: "none", lg: "block" }}}>
            <img style={{height:"fit-content",margin:"20px 10px 0px 0px"}} src={logo} alt="logo" width="180px"/>
           
            </Box>
            {/* <Box sx={{font}}> */}
            <Box sx={{display: { xs: "block", lg: "none" }}}>
            <img style={{height:"fit-content",margin:"18px 10px 0px 0px"}} src={logo} alt="logo" width="160px"/>
           
            </Box>
            {/* </Box> */}
           
          </Box>

          <Box sx={{ mt: 3.8,ml:2,display: { xs: "none", lg: "block" } }}>
            <LogoutIcon
              sx={{ color: "#fff", cursor: "pointer" }}
              onClick={handleLogout}
            />
          </Box>
          <Box sx={{ mt: 3.2,mr:1,display: { xs: "block", lg: "none" } }}>
            <LogoutIcon
              sx={{ color: "#fff", cursor: "pointer",fontSize:"1.2rem" }}
              onClick={handleLogout}
            />
          </Box>
        </Box>
        <Box
          sx={{
            boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
            borderRadius: "15px",
            backgroundColor: "rgba(255, 255, 255, .30)",
            backdropFilter: "blur(5px)",
            border: "1px solid #fdb714",
            p: 3,
            mx: 4,
            height: 425,
          }}
        >
        {/* desktop version of stepper  */}
          <Box
            sx={{
              width: "80%",
              mb: 2,
              marginLeft: "auto",
              marginRight: "auto",
              display: { xs: "none", lg: "block" }
            }}
          >
           

            <Stepper
              nonLinear
              activeStep={activeStep}
              alternativeLabel
              connector={false}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            

            <div>
              {allStepsCompleted() ? (
                <React.Fragment></React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </div>
          </Box>
          {/* Mobile version of stepper */}
          <Box
            sx={{
              width: "100%",
              mb: 2,
              marginLeft: "auto",
              marginRight: "auto",
              display: { xs: "block", lg: "none" }
            }}
          >
            

            <Stepper
              nonLinear
              activeStep={activeStep}
              alternativeLabel
              connector={false}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepLabel StepIconComponent={ColorlibStepIconMob}>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: "0.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
           

            <div>
              {allStepsCompleted() ? (
                <React.Fragment></React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </div>
          </Box>

        {/* Desktop version */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                p: 3,
                width: "85%",
                borderRadius: "15px",

                overflowY: "scroll",
                height: 270,
                "&::-webkit-scrollbar": {
                  width: "0.2em",
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px silver",
                  webkitBoxShadow: "inset 0 0 6px silver",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "silver",
                  outline: "1px solid silver",
                },
              }}
            >
              {_renderStepContent(activeStep)}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default BasicNew;
