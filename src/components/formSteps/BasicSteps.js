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
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StepButton from '@mui/material/StepButton';
import Personal from "./Personal";
import Payment from "./FeePayment";
// import makeStyles from "@mui/material";
// import { withStyles } from '@material-ui/core/styles';
const Basic=()=>{
   
    const [activeStep, setActiveStep] = useState(0);
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
    
      function _renderStepContent(step) {
        switch (step) {
          case 0:
            return <Personal />;
          case 1:
            return <Payment  />;
        //   case 2:
        //     return <SymptomForm  />;
        //   case 3:
        //     return <ReasonForm  />;
        //   case 4:
        //     return <UploadForm  />;
        //   case 5:
        //     return <ResultForm  />;
        //   case 6:
        //     return <AddressForm  />;
        //   case 7:
        //     return <ReviewOrder />;
          default:
            return <div>Not Found</div>;
        }
      }
   
    const steps = [
        'Basic Steps',
        'Application Fee Payment',
        'Admission fee payment',
        'Education and Work Details',
        'Document Upload',
      ];
      const [completed, setCompleted] = React.useState({});

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

  const handleNext = () => {

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    // const newCompleted = completed;
    // newCompleted[activeStep] = true;
    // setCompleted(newCompleted);
    // handleNext();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // const newCompleted = completed;
    // newCompleted[activeStep] = false;
    // setCompleted(newCompleted);
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
    return(
        <>
        <Box sx={{background:'rgb(243 105 2)',height:"80px",display:"flex",justifyContent:"center",alignItems:"center",mb:6}}>
            <Typography sx={{color:"#fff",fontSize:"30px"}}>
            2022-2023 Online Application
            </Typography>
        </Box>
        <Box sx={{ width: '60%',mb:6,marginLeft:"auto",marginRight:"auto" }}>
        {/* <Stepper activeStep={activeStep} alternativeLabel connector={false}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        //   if (isStepOptional(index)) {
        //     labelProps.optional = (
        //       <Typography variant="caption">Optional</Typography>
        //     );
        //   }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps} >
              <StepLabel  {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper> */}
      <Stepper nonLinear activeStep={activeStep} alternativeLabel connector={false}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography> */}
            {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}> */}
              {/* <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button> */}
              {/* <Box sx={{ flex: '1 1 auto' }} /> */}
              {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button> */}
              {/* {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))} */}
            {/* </Box> */}
          </React.Fragment>
        )}
      </div>
    </Box>

    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>

        <Paper elevation={7} sx={{border:"1px solid rgb(253 181 21)",p:3,width:"85%",borderRadius:"15px"}}>
            {_renderStepContent(activeStep)}
           
      <Box sx={{display:"flex",justifyContent:'end',mt:1}}>
      <Button variant="conatained" size="small" sx={{color:"#fff",mr:2,background:"#fba015","&:hover":{background:'#fba015',color:"#fff"}}}
            disabled={activeStep === 0}
            onClick={handleBack}
            >
        Back
            </Button>
            <Button variant="conatained" size="small" sx={{color:"#fff",background:"#fba015","&:hover":{background:'#fba015',color:"#fff"}}}
            onClick={handleNext}
            >
        Next
            </Button>
        </Box>

        </Paper>
    </Box>
       
        </>
    )
}
export default Basic