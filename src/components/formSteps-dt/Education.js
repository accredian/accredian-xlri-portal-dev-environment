import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  TextField,
  
  Link,
  Badge,
  
  Tabs,
  Tab,
  Step,
} from "@mui/material";
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
import EmailIcon from '@mui/icons-material/Email';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

const Education = (props) => {
  const [openPersonal, setOpenPersonal] = useState(false);
  const [openADD, setOpenADD] = useState(false);
  const [openaddress, setOpenaddress] = useState(false);
  const [bachelorDegree, setBachelorDegree] = useState("");
  const [collegeName, setCollegename] = useState("");
  const [yearOfCompletion, setCompletionyear] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [companyemail, setCompanyemail] = useState();
  const [previuosCompany, setPreviouscompany] = useState();
  const [bachelorDocuments, setBachelorDcument] = useState("");
  const [experienceDocuments, setexperienceDcument] = useState("");
  const [nxt, setNxt] = useState(true);
  const [choice, setChoice] = useState("");
  const [backopen, setBackopen] = useState(false);
  const [bachelorDegreeOther, setBachelorDegreeother] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [qualification, setqualification] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [Total_exp, setExp] = useState("");
  const [designation, setDesignation] = useState("");
  const [industry, setIndustry] = useState("");
  const [industryOther, setIndustryOther] = useState("");
  const [previndustry, setprevIndustry] = useState("");
  const [previndustryOther, setprevIndustryOther] = useState("");
  const[sno,setsno]=useState(0)
  const [check,setChecked]=useState('')
  const [check2,setChecked2]=useState('')
  const[sheetData,setSheetData]=useState([])
  const [error, setError] = useState(false);
  const [validCmpname, setCmpname] = useState(false);
  const [country, setCountry] = useState('');
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [address, setaddress] = useState();
  const [addresstwo, setAddresstwo] = useState("");
  const [country_name, setCountryName] = useState("");
  const [cities, setCities] = useState([]);
  const [stateCode, setStatecode] = useState();

  const handleKeyPress = (event) => {
    // const charCode = event.charCode;
    // // ASCII range for allowed characters: 48-57 (0-9), 65-90 (A-Z), 97-122 (a-z), 32 (space)
    // if (
    //   (charCode >= 48 && charCode <= 57) || // 0-9
    //   (charCode >= 65 && charCode <= 90) || // A-Z
    //   (charCode >= 97 && charCode <= 122) || // a-z
    //   charCode === 32 // space
    // ) {
    //   setError(false); // Clear the error state if the character is valid
    // } else {
    //   setError(true); // Set the error state if an invalid character is entered
    //   // event.preventDefault();
    // }
    const inputValue = event.target.value;
    // Regular expression to match any special character (excluding space)
    const regex = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
     if (
      regex.test(inputValue)
    ) {
      setError(true); // Clear the error state if the character is valid
    } else {
      setError(false); // Set the error state if an invalid character is entered
      // event.preventDefault();
    }
    // setError();
  };
  const LoaderClose = () => {
    setBackopen(false);
  };
  const LoaderOpen = () => {
    setBackopen(true);
  };
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
  const handleChangeAddresst = (event) => {
    setAddresstwo(event.target.value);
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
  const handleChangeChoice = (event) => {
    setChoice(event.target.value);
    setCompanyName('')
    setexperienceDcument('')
    setPreviouscompany('')
    setCompanyemail('')
    setExp('')
    setIndustry('')
    setDesignation('')
    setIndustryOther('')
    setprevIndustry('')
    setprevIndustryOther('')
    setChecked(false)
    setChecked2(false)

  };
  const handleChangeImage = (event) => {
    setProfileImage(event.target.files[0]);
  };
  const handleChangeDegree = (event) => {
    setBachelorDegree(event.target.value);
  };
  const handleChangeCollegeName = (event) => {
    const regex = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
     if (
      regex.test(event.target.value)
    ) {
      setError(true);
    } else {
      setError(false);
     
    }
    setCollegename(event.target.value)
    
  };
  const handleChangeYear = (event) => {
    setCompletionyear(event.target.value);
  };
  const handleChangeCgpa = (event) => {
    setCgpa(event.target.value);
  };
  const handleChangeDesignation = (event) => {
    setDesignation(event.target.value);
  };
  const handleChangeTotalExp = (event) => {
    setExp(event.target.value);
  };
  const handleChangeCpmanyName = (event) => {
    const regex = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
    if (
     regex.test(event.target.value)
   ) {
     setCmpname(true);
   } else {
    setCmpname(false);
    
   }
    setCompanyName(event.target.value);
  };
  const handleChangeCompanyemail = (event) => {
    setCompanyemail(event.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(event.target.value));
  };
  const handleChangePreviousCompany = (event) => {
    setPreviouscompany(event.target.value);
  };
  const handleChangeDegreeOther = (event) => {
    setBachelorDegreeother(event.target.value);
  };

  const handleChangequalification = (event) => {
    setqualification(event.target.value);
  };
  const handleChangeIndustry=(event)=>{
    setIndustry(event.target.value)
  }
  const handleChangeIndustryOther=(event)=>{
    setIndustryOther(event.target.value)
  }
  const handleChangePrevIndustry=(event)=>{
    setprevIndustry(event.target.value)
  }
  const handleChangePrevIndustryOther=(event)=>{
    setprevIndustryOther(event.target.value)
  }
  const handleChangeBachelorDocuments = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= 5000000) {
      setBachelorDcument(selectedFile);
    } else {
      setBachelorDcument(null);
      alert("Please select a file of size not more than 5MB");
    }
    // setBachelorDcument(event.target.files[0]);
  };
  const handleChangeExperinceDocuments = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= 5000000) {
      setexperienceDcument(selectedFile);
    } else {
      setexperienceDcument(null);
      alert("Please select a file of size not more than 5MB");
    }
    // setexperienceDcument(event.target.files[0]);
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
  const handleChange=( event)=>{
    setChecked(event.target.checked);
  }
  const handleChange2=( event)=>{
    setChecked2(event.target.checked);
  }
  // console.log(
  //   bachelorDegree,
  //   collegeName,
  //   yearOfCompletion,
  //   cgpa,
  //   companyname,
  //   companyemail,
  //   previuosCompany,
  //   bachelorDocuments,
  //   experienceDocuments
  // );
  // if(props){
  useEffect(() => {
    // if (
    //   (bachelorDegree || bachelorDegreeOther) &&
    //     collegeName &&
    //     yearOfCompletion &&
    //     cgpa &&
    //     bachelorDocuments &&
    //     (companyemail &&
    //     companyname) ||
    //   (previuosCompany && experienceDocuments)
    // ) {
    //   setNxt(false);
    // }
    if(country_name&&state&&city&&pincode&&address&&(error?false:collegeName)&&yearOfCompletion&&qualification&&cgpa&&check&&check2&&bachelorDocuments&&(bachelorDegree=='others'?bachelorDegreeOther:bachelorDegree)&&(((isEmailValid?companyemail:false)&&(validCmpname?false:companyname)&&designation&&Total_exp&&(industry=='others'?industryOther:industry))||(previuosCompany && experienceDocuments &&Total_exp&&(previndustry=='others'?previndustryOther:previndustry)))){
      setNxt(false);
    }
    else{
      setNxt(true);
    }
  }, [
    bachelorDegree,country_name,state,city,pincode,address,
    bachelorDegreeOther,
    collegeName,
    yearOfCompletion,
    cgpa,
    check,
    check2,
    companyname,
    companyemail,
    previuosCompany,
    bachelorDocuments,
    experienceDocuments,
    qualification,
    industry,
    industryOther,
    previndustry,
    previndustryOther,
    designation,
    Total_exp
  ]);

  // }
  
   console.log(sheetData,"sheet data")
 
// const InsertintoSheet=(data)=>{
 
//   const formDatab = new FormData();
//   // formDatab.append("Sno",sn);
//   formDatab.append("Batch",data.batch);
//   formDatab.append("Name",data.name);
//   formDatab.append("Email",data.email);
//   formDatab.append("Gender",data.gender);
//   formDatab.append("Dob",data.dob);
//   formDatab.append("Phone",data.phone);
//   formDatab.append("City",data.city);
//   formDatab.append("Workex",data.experience);
//   formDatab.append("Education",data.highest_education);
//   formDatab.append("Company",data.company);
//   formDatab.append("Designation",data.designation);
//   formDatab.append("Industry",data.industry);
//   formDatab.append("WorkexLink",data.company_doc_file_path);
//   formDatab.append("Educationlink",data.degree_file_path);
//   formDatab.append("LMS","Yes");
//   formDatab.append("Enrollment","Yes");

// fetch(
// "https://script.google.com/macros/s/AKfycbxxXozesaCrITu7k-VH_oMav_gvR18i3p_tetNdWOZQHYBoVKifQR9jdNTNb1ruVjgu7Q/exec",
// {
// method: "POST",
// body: formDatab
// }
// )
// .then((res) => res.json())
// .then((data) => {
// console.log(data);
// })
// .catch((error) => {
// console.log(error);
// });
  
  

// }
  // const handleNext = () => {
  //   LoaderOpen();
  //   if (
  //     (bachelorDegree || bachelorDegreeOther) &&
  //     collegeName &&
  //     yearOfCompletion &&
  //     cgpa &&
  //     bachelorDocuments&&qualification
  //   ) {
  //     var formData = new FormData();
  //     formData.append("file", bachelorDocuments);
  //     formData.append("qualification", qualification);
  //     formData.append("type", "insert_education_details");
  //     formData.append("degree", bachelorDegree=="others"?bachelorDegreeOther:bachelorDegree);
  //     formData.append("college_name", collegeName);
  //     formData.append("completion_year", yearOfCompletion);
  //     formData.append("cgpa", cgpa);
  //     formData.append("user_id", parseInt(localStorage.getItem("user_id")));

  //     axios({
  //       method: "post",
  //       url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/file-upload.php`,
  //       headers: { "Content-Type": "multipart/form-data" },
  //       data: formData,
  //     }).then(function (response) {
  //       if (response.data.status == 200) {
  //         if (companyname) {
  //           if (companyname && companyemail && Total_exp &&designation) {
  //             axios({
  //               method: "post",
  //               url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data.php`,
  //               data: {
  //                 type: "insert_work_details",
  //                 user_id: parseInt(localStorage.getItem("user_id")),
  //                 company_name: companyname,
  //                 company_email: companyemail,
  //                 designation:designation,
  //                 current_industry:industry=="others"?industryOther:industry,
  //                 experience:Total_exp,
  //                 working: "yes",
  //               },
  //             }).then((response) => {
  //               if (response.data.status == 200) {
                       
                 
                  
  //                 const options = {
  //                   headers: {
  //                     "Access-Control-Allow-Origin": "*",
  //                     "Content-Type": "application/json",
  //                   },
  //                 };
  //                 const sendData = {
  //                   user_id: localStorage.getItem("user_id"),
  //                 };

  //                 axios({
  //                   method: "post",
  //                   url: `${process.env.REACT_APP_BASE_URL}/generate-xlri-applications.php`,
  //                   data: {
  //                     user_id: localStorage.getItem("user_id"),
  //                   },

  //                   // options
  //                 })
                   
  //                   .then((response) => {
  //                     if (response.data.status == 200) {
  //                       LoaderClose();
  //                       axios({
  //                         method: "post",
  //                         url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data.php`,
  //                         data: {
  //                           type: "fetch_xlri_sheet_data",
  //                           user_id: parseInt(localStorage.getItem("user_id")),
  //                         },
  //                       }).then((res)=>{
  //                        if(res.data[0].status==200){
  //                         InsertintoSheet(res.data[0])
  //                         axios({
  //                           method: "post",
  //                           url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data.php`,
  //                           data: {
  //                             type: "update_step_four_status",
  //                             user_id: parseInt(localStorage.getItem("user_id")),
  //                             status: "complete",
  //                           },
  //                         }).then((response) => {
  //                           if (response.data.status == 200) {
  //                             props.stepCount();
  //                             props.userd();
                            
  //                           }
  //                         });
                         
  //                        }
  //                        else{
  //                         toast.error("Server error please try after some time", {
  //                           position: "top-right",
  //                           autoClose: 2000,
  //                           hideProgressBar: false,
  //                           closeOnClick: true,
  //                           pauseOnHover: true,
  //                           draggable: true,
  //                           progress: undefined,
  //                           theme: "colored",
  //                         });
  //                       }
                          
         
                        
                       
  //                       })
                       
  //                     }
  //                   });
  //               }
  //             });
  //           }
  //         } else if (previuosCompany && experienceDocuments) {
  //           const formData = new FormData();
  //           formData.append("file", experienceDocuments);
  //           formData.append("working", "no");
  //           formData.append("type", 'insert_work_details');
  //           formData.append("company_name", previuosCompany);
  //           formData.append("previous_industry",previndustry=="others"?previndustryOther:previndustry );
  //           formData.append("experience", Total_exp);
  //           formData.append(
  //             "user_id",
  //             parseInt(localStorage.getItem("user_id"))
  //           );
  //           axios({
  //             method: "post",
  //             url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/file-upload.php`,
  //             headers: { "Content-Type": "multipart/form-data" },
  //             data: 
  //               // type: "insert_work_details",
  //               formData,
              
  //           }).then((response) => {
  //             props.handleNext4();
  //             if (response.data.status == 200) {
               
  //              const options = {
  //                 headers: {
  //                   "Access-Control-Allow-Origin": "*",
  //                   "Content-Type": "application/json",
  //                 },
  //               };
  //               const sendData = {
  //                 user_id: localStorage.getItem("user_id"),
  //               };
  //               axios({
  //                 method: "post",
  //                 url: `${process.env.REACT_APP_BASE_URL}/generate-xlri-applications.php`,
  //                 data: {
  //                   user_id: localStorage.getItem("user_id"),
  //                 },

  //                 // options
  //               }).then((response) => {
  //                 if (response.data.status == 200) {
  //                   LoaderClose();
  //                   axios({
  //                     method: "post",
  //                     url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data.php`,
  //                     data: {
  //                       type: "fetch_xlri_sheet_data",
  //                       user_id: parseInt(localStorage.getItem("user_id")),
  //                     },
  //                   }).then((res)=>{
  //                    if(res.data[0].status==200){
  //                     InsertintoSheet(res.data[0])
  //                     axios({
  //                       method: "post",
  //                       url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/data.php`,
  //                       data: {
  //                         type: "update_step_four_status",
  //                         user_id: parseInt(localStorage.getItem("user_id")),
  //                         status: "complete",
  //                       },
  //                     }).then((response) => {
  //                       if (response.data.status == 200) {
                          
  //                         props.stepCount();
  //                     props.userd();
  //                       }
  //                     });
                     
  //                    }
  //                    else{
  //                     toast.error("Server error please try after some time", {
  //                       position: "top-right",
  //                       autoClose: 2000,
  //                       hideProgressBar: false,
  //                       closeOnClick: true,
  //                       pauseOnHover: true,
  //                       draggable: true,
  //                       progress: undefined,
  //                       theme: "colored",
  //                     });
  //                    }
                      
     
                    
                   
  //                   })
                   

  //                 }
  //               });
  //             }
  //           });
  //         }
  //       }
  //     });
  //   }
  // };
  const handleNext = () => {
    LoaderOpen();
    if (
      (bachelorDegree || bachelorDegreeOther) &&
      collegeName &&
      yearOfCompletion &&
      cgpa &&
      bachelorDocuments&&qualification
    ) {
      var formData = new FormData();
      formData.append("education_doc", bachelorDocuments);
      // ? :/
      if(choice=="No"){
        formData.append("work_doc", experienceDocuments)
      }
      formData.append("type", "insert_student_details");
      formData.append("degree", bachelorDegree=="others"?bachelorDegreeOther:bachelorDegree);
      formData.append("qualification", qualification);
      formData.append("college_name", collegeName);
      formData.append("completion_year", yearOfCompletion);
      formData.append("cgpa", cgpa);
      formData.append("country", country_name);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("pincode", parseInt(pincode));
      formData.append("address", address);
      formData.append("addresstwo", addresstwo);
      formData.append("company_name", choice=="Yes"?companyname:previuosCompany);
      formData.append("company_email", companyemail);
      formData.append("designation", designation);
      choice=="Yes"?formData.append("current_industry", industry=="others"?industryOther:industry):formData.append("previous_industry", previndustry=="others"?previndustryOther:previndustry);
      // formData.append("current_industry", cgpa);
      formData.append("experience", Total_exp);
      formData.append("working",choice.toLowerCase());
      formData.append("user_id", parseInt(localStorage.getItem("user_id")));

      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/xlri-backend/new-file-upload.php`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then(function (response) {
        if (response.data.status == 200) {
          LoaderClose()
          axios({
                      method: "post",
                      url: `${process.env.REACT_APP_BASE_URL}/generate-xlri-applications-test.php`,
                      data: {
                        user_id: localStorage.getItem("user_id"),
                        category_id:localStorage.getItem("category"),
                      },
  
                      // options
                    }).then((res)=>{
                      if (res.data.status == 200) {
                        props.handleNext4();
                        localStorage.setItem("currentStep", res.data.data.current_step_count);
                        localStorage.setItem("currentStepStatus", res.data.data.current_step_status);
                        }
                    })
         
        }
      });
    }
  };
  //  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  //  // border-radius: 5px;
  //  backgroundColor: "rgba(255, 255, 255, .15)",
  return (
    <>
      <Box sx={{display: { xs: "none", lg: "block"}}}>
      <Box
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
        </Box>
        {/* <Collapse in={openaddress} timeout="auto" unmountOnExit sx={{mb:2}}> */}
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
              Country <span style={{ color: "red" }}>*</span>{" "}
            </Typography>
            <FormControl fullWidth>
            {/* <InputLabel  htmlFor="my-select">Select an option</InputLabel> */}
              <Select
                size="small"
                sx={{ width: {xs:220,lg:480}, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Gender"
                onChange={handleChangeCountry}
                // inputProps={{
                //   name: 'my-select',
                //   id: 'my-select',
                // }}
              >
                 {/* <MenuItem value='' ><i>Select your Country</i></MenuItem> */}
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
        </Box>
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
            Education Details
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
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#ffffff",
                  }}
                >
                  Highest Qualification <span style={{ color: "red" }}>*</span>
                </Typography>
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
                  <Select
                    size="small"
                    sx={{ width:{xs:280,lg:480}, background: "#fff" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //  value={bachelorDegree}
                    onChange={handleChangequalification}
                    defaultValue={"select"}
                  >
                    <MenuItem disabled="true" value={"select"}>
                      Select your Qualification
                    </MenuItem>
                    <MenuItem value={"High School Diploma"}>
                      High School Diploma
                    </MenuItem>
                    <MenuItem value={"Associate Degree"}>
                      Associate Degree
                    </MenuItem>
                    <MenuItem value={"Bachelor Degree"}>
                      Bachelor Degree
                    </MenuItem>
                    <MenuItem value={"Master Degree"}>Master Degree</MenuItem>
                    <MenuItem value={"Doctorate/Ph.D"}>Doctorate/Ph.D</MenuItem>

                    {/* <MenuItem value={30}>Others</MenuItem> */}
                  </Select>
                </FormControl>
                {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
              </Box>

          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Degree Name<span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
              <Select
                size="small"
                sx={{ width: 480, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //  value={bachelorDegree}
                onChange={handleChangeDegree}
                defaultValue={"select"}
              >
                <MenuItem disabled="true" value={"select"}>
                  Select your degree
                </MenuItem>
                <MenuItem value={"B.Tech"}>B.Tech</MenuItem>
                <MenuItem value={"B.Voc"}>B.Voc</MenuItem>
                <MenuItem value={"B.Sc"}>B.Sc</MenuItem>
                <MenuItem value={"B.S"}>B.S</MenuItem>
                <MenuItem value={"BPharm"}>BPharm</MenuItem>
                <MenuItem value={"B.com"}>B.com</MenuItem>
                <MenuItem value={"BBA"}>BBA</MenuItem>
                <MenuItem value={"BBA Honors"}>BBA Honors</MenuItem>
                <MenuItem value={"BCA"}>BCA</MenuItem>
                <MenuItem value={"BArch"}>BArch</MenuItem>
                <MenuItem value={"B.L.L.A.B"}>B.L.L.A.B</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
                {/* <MenuItem value={30}>Others</MenuItem> */}
              </Select>
            </FormControl>
            {bachelorDegree=="others"?(
                      <Box sx={{mt:1}}>
                         <BootstrapInput
                         sx={{width:480}}
                      placeholder="Enter Bachelor's Degree Name"
                    onChange={handleChangeDegreeOther}
                    value={bachelorDegreeOther}
                    //   sx={{ width: 480 }}
                    size="small"
                    //  onKeyPress={(e) => {
                    //     if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    //     } else e.preventDefault();
                    //   }}
                  />
                      </Box>
                  ):(
                    <Box>

                    </Box>
                  )}
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
              College/University Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              onChange={handleChangeCollegeName}
              value={collegeName}
              sx={{ width: 480,background:"#fff",borderRadius:"5px" }}
              size="small"
              error={error}
        // onKeyPress={handleKeyPress}
        helperText={error ? 'Special characters are not allowed' : ''}
              //  onKeyPress={(e) => {
              //     if (new RegExp(/[a-zA-Z]/).test(e.key)) {
              //     } else e.preventDefault();
              //   }}
            />
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Year of Completion<span style={{ color: "red" }}>*</span>
            </Typography>
            <BootstrapInput
              type="number"
              sx={{ width: 480 }}
              size="small"
              onChange={handleChangeYear}
              value={yearOfCompletion}
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
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Degree % / CGPA<span style={{ color: "red" }}>*</span>
            </Typography>
            <BootstrapInput
              type="number"
              sx={{ width: 480 }}
              size="small"
              onChange={handleChangeCgpa}
              value={cgpa}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Upload Relevant Document<span style={{ color: "red" }}>*<i style={{ color: "#fff",fontSize:"12px" }}>(Please upload the documents in pdf format)</i></span>
            </Typography>
            <TextField
              inputProps={{
                accept: "application/pdf",
                // onChange: handleFileChange,
              }}
              onChange={handleChangeBachelorDocuments}
              size="small"
              sx={{ width: 480, background: "#fff", borderRadius: "4px" }}
              fullWidth
              type="file"
            ></TextField>
          </Box>
        </Box>
<Box sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            mb: 1,
          }}>
            {/* <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Upload your professional headshot<span style={{ color: "red" }}>*<i style={{ color: "#fff",fontSize:"12px" }}></i></span>
            </Typography>
            <TextField
              inputProps={{
                accept: "image/*",
                // onChange: handleFileChange,
              }}
              onChange={handleChangeImage}
              size="small"
              sx={{ width:{xs:220,lg:480}, background: "#fff", borderRadius: "4px" }}
              fullWidth
              type="file"
            ></TextField>
            </Box> */}
</Box>
        <Box
          sx={{ mb: 0.5, p: 1, borderRadius: "5px" }}
          onClick={handleClickaddress}
        >
          {/* {openaddress ? <ExpandLess sx={{color:"#fff"}} /> : <ExpandMore sx={{color:"#fff"}} />} */}
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "23px",
            }}
          >
            Work Experience Details
          </Typography>
        </Box>
        {/* <Collapse in={openaddress} timeout="auto" unmountOnExit sx={{mb:2}}> */}
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              color: "#fff",
              mt: 2,
              mb: 1,
              width: "30%",
              textAlign:"left"
            }}
          >
            Are you currently working?
          </Typography>
          <FormControl  fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
            <Select
              size="small"
              sx={{ width: 480, background: "#fff", mt: 1,ml:{xl:8} }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              onChange={handleChangeChoice}
              defaultValue={"select"}
            >
              <MenuItem disabled="true" value={"select"}>
                select
              </MenuItem>
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
              {/* <MenuItem value={30}>Others</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
        {choice == "" ? (
          <Box></Box>
        ) : (
          <Box>
            {choice == "Yes" ? (
              <Box>
                        <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Box >
  <Typography
    sx={{
      fontWeight: "bold",
      fontSize: "14px",
      color: "#ffffff",
    }}
  >
    Total Years of Experience(Full-time only){" "}
    <span style={{ color: "red" }}>*</span>
  </Typography>
  <TextField
    type="number"
    onChange={handleChangeTotalExp}
    value={Total_exp}
    sx={{
      width:{xs:280,lg:480},
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
              Current Industry<span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
              <Select
                size="small"
                sx={{ width: 480, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                 value={industry}
                onChange={handleChangeIndustry}
                defaultValue={"select"}
              >
                <MenuItem disabled="true" value={"select"}>
                  Select your Current Industry
                </MenuItem>
                <MenuItem value={"Automotive"}>Automotive</MenuItem>
                <MenuItem value={"Banking and Financial Services"}>Banking and Financial Services</MenuItem>
                <MenuItem value={"Construction and Engineering"}>Construction and Engineering</MenuItem>
                <MenuItem value={"Consumer Goods and Retail"}>Consumer Goods and Retail</MenuItem>
                <MenuItem value={"Energy and Utilities"}>Energy and Utilities</MenuItem>
                <MenuItem value={"Food and Beverage"}>Food and Beverage</MenuItem>
                <MenuItem value={"Healthcare and Pharmaceuticals"}>Healthcare and Pharmaceuticals</MenuItem>
                <MenuItem value={"Information Technology and Services"}>Information Technology and Services</MenuItem>
                <MenuItem value={"Insurance"}>Insurance</MenuItem>
                <MenuItem value={"Manufacturing"}>Manufacturing</MenuItem>
                <MenuItem value={"Media and Entertainment"}>Media and Entertainment</MenuItem>
                <MenuItem value={"Professional Services"}>Professional Services</MenuItem>
                <MenuItem value={"Real Estate"}>Real Estate</MenuItem>
                <MenuItem value={"Transportation and Logistics"}>Transportation and Logistics</MenuItem>
                <MenuItem value={"Travel and Hospitality"}>Travel and Hospitality</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
                {/* <MenuItem value={30}>Others</MenuItem> */}
              </Select>
            </FormControl>
            {industry=="others"?(
                      <Box sx={{mt:1}}>
                         <BootstrapInput
                         sx={{width:480}}
                      placeholder="Enter Your Previous Industry"
                    onChange={handleChangeIndustryOther}
                    value={industryOther}
                    //   sx={{ width: 480 }}
                    size="small"
                    //  onKeyPress={(e) => {
                    //     if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    //     } else e.preventDefault();
                    //   }}
                  />
                      </Box>
                  ):(
                    <Box>

                    </Box>
                  )}
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
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
                      color: "#ffffff",
                    }}
                  >
                    Current Company Name <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
              onChange={handleChangeCpmanyName}
              value={companyname}
              sx={{ width: 480,background:"#fff",borderRadius:"5px" }}
              size="small"
              error={validCmpname}
        // onKeyPress={handleKeyPress}
        helperText={validCmpname ? 'Special characters are not allowed' : ''}
              //  onKeyPress={(e) => {
              //     if (new RegExp(/[a-zA-Z]/).test(e.key)) {
              //     } else e.preventDefault();
              //   }}
            />
                  {/* <BootstrapInput
                    onChange={handleChangeCpmanyName}
                    value={companyname}
                    sx={{ width: 480 }}
                    size="small"
                    // onKeyPress={(e) => {
                    //   if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    //   } else e.preventDefault();
                    // }}
                  /> */}
                </Box>
                <Box>
  <Typography
    sx={{
      fontWeight: "bold",
      fontSize: "14px",
      color: "#ffffff",
    }}
  >
    Current Designation
    <span style={{ color: "red" }}>*</span>
  </Typography>
  <BootstrapInput
    onChange={handleChangeDesignation}
    value={designation}
    sx={{ width:480}}
    size="small"
    // onKeyPress={(e) => {
    //   if (new RegExp(/[a-zA-Z]/).test(e.key)) {
    //   } else e.preventDefault();
    // }}
  />
</Box>
               

</Box>

<Box sx={{
  display: {xs:"",lg:"flex"},
  justifyContent: "space-between",
  mt: 1,
  mb: 1,
}}>

<Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#ffffff",
                    }}
                  >
                    Company Email Id <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    type="email"
                    error={!isEmailValid}
                    helperText={!isEmailValid ? 'Invalid email format' : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon color={!isEmailValid ? 'error' : 'action'} />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleChangeCompanyemail}
                    value={companyemail}
                    sx={{ width: 480, background: "#fff", borderRadius: "5px" }}
                    size="small"
                  />
                </Box>
               

</Box>
{/* <FormGroup sx={{display:"flex"}}>
     
      <FormControlLabel required control={<Checkbox onChange={handleChange} style={{color:"#fff"}}   />} href="https://accredian.com/iitg-admissions-policy/" label={
         <div style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
        I agree to confirm that I have gone through the program and it’s details and the program fits my career objective{' '}
        
       </div>
      } />
     
     
    </FormGroup> */}
      <Box sx={{mt:2}}>
                    <FormGroup sx={{mb:1}}>
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
      <FormControlLabel required control={<Checkbox checked={check}  onChange={handleChange} style={{color:"#fff"}} />} label={
         <div style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
         I accept all the terms and conditions{' '}
         <a
           href="https://accredian.com/xlri-admissions-policy/"
           target="_blank"
           rel="noopener noreferrer"
           style={{color:"blue",cursor:"pointer",textDecoration:"none"}}
          //  className={classes.hyperlink}
         >
           (Read more)<span style={{color:"red"}}>*</span>
         </a>
       </div>
      } />
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
    <FormGroup sx={{display:"flex",mt:1}}>
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
      <FormControlLabel required control={<Checkbox checked={check2} onChange={handleChange2} style={{color:"#fff"}} />} href="https://accredian.com/xlri-admissions-policy/" label={
         <div style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
        I confirm that I have gone through the program and it’s details and the program fits my career objective<span style={{color:"red"}}>*</span>{' '}
         {/* <a
           href="https://accredian.com/xlri-admissions-policy/"
           target="_blank"
           rel="noopener noreferrer"
           style={{color:"blue",cursor:"pointer"}}
          //  className={classes.hyperlink}
         >
           (Read more)
         </a> */}
       </div>
      } />
     
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
                    </Box>
              </Box>
      
            ) : (
              <Box>
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
    sx={{
      fontWeight: "bold",
      fontSize: "14px",
      color: "#ffffff",
    }}
  >
    Total Years of Experience(Full-time only){" "}
    <span style={{ color: "red" }}>*</span>
  </Typography>
  <TextField
    type="number"
    onChange={handleChangeTotalExp}
    value={Total_exp}
    sx={{
      width:{xs:280,lg:480},
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
              Previous Industry<span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
              <Select
                size="small"
                sx={{ width: 480, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                 value={previndustry}
                onChange={handleChangePrevIndustry}
                defaultValue={"select"}
              >
                <MenuItem disabled="true" value={"select"}>
                  Select your Previous Industry
                </MenuItem>
                <MenuItem value={"Automotive"}>Automotive</MenuItem>
                <MenuItem value={"Banking and Financial Services"}>Banking and Financial Services</MenuItem>
                <MenuItem value={"Construction and Engineering"}>Construction and Engineering</MenuItem>
                <MenuItem value={"Consumer Goods and Retail"}>Consumer Goods and Retail</MenuItem>
                <MenuItem value={"Energy and Utilities"}>Energy and Utilities</MenuItem>
                <MenuItem value={"Food and Beverage"}>Food and Beverage</MenuItem>
                <MenuItem value={"Healthcare and Pharmaceuticals"}>Healthcare and Pharmaceuticals</MenuItem>
                <MenuItem value={"Information Technology and Services"}>Information Technology and Services</MenuItem>
                <MenuItem value={"Insurance"}>Insurance</MenuItem>
                <MenuItem value={"Manufacturing"}>Manufacturing</MenuItem>
                <MenuItem value={"Media and Entertainment"}>Media and Entertainment</MenuItem>
                <MenuItem value={"Professional Services"}>Professional Services</MenuItem>
                <MenuItem value={"Real Estate"}>Real Estate</MenuItem>
                <MenuItem value={"Transportation and Logistics"}>Transportation and Logistics</MenuItem>
                <MenuItem value={"Travel and Hospitality"}>Travel and Hospitality</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
                {/* <MenuItem value={30}>Others</MenuItem> */}
              </Select>
            </FormControl>
            {previndustry=="others"?(
                      <Box sx={{mt:1}}>
                         <BootstrapInput
                         sx={{width:480}}
                      placeholder="Enter Your Previous Industry"
                    onChange={handleChangePrevIndustryOther}
                    value={previndustryOther}
                    //   sx={{ width: 480 }}
                    size="small"
                    //  onKeyPress={(e) => {
                    //     if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    //     } else e.preventDefault();
                    //   }}
                  />
                      </Box>
                  ):(
                    <Box>

                    </Box>
                  )}
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
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#ffffff",
                    }}
                  >
                    {" "}
                    Previous Company Name{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <BootstrapInput
                    onChange={handleChangePreviousCompany}
                    value={previuosCompany}
                    sx={{ width: 480 }}
                    size="small"
                    // onKeyPress={(e) => {
                    //   if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    //   } else e.preventDefault();
                    // }}
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
                    Upload Relevant Document
                    <span style={{ color: "red" }}>*<i style={{ color: "#fff",fontSize:"12px" }}>(Please upload the documents in pdf format)</i></span>
                
                  </Typography>
                  <TextField
                    inputProps={{
                      accept: "application/pdf",
                      // onChange: handleFileChange,
                    }}
                    onChange={handleChangeExperinceDocuments}
                    size="small"
                    sx={{ width: 480, background: "#fff", borderRadius: "4px" }}
                    fullWidth
                    type="file"
                  ></TextField>
                </Box>

                
              </Box>
              {/* <FormGroup sx={{display:"flex"}}>
      
      <FormControlLabel required control={<Checkbox onChange={handleChange} style={{color:"#fff"}}   />} href="https://accredian.com/xlri-admissions-policy/" label={
         <div style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
        I agree to confirm that I have gone through the program and it’s details and the program fits my career objective{' '}
         
       </div>
      } />
     
      
    </FormGroup> */}
    <Box sx={{mt:2}}>
                    <FormGroup sx={{mb:1}}>
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
      <FormControlLabel required control={<Checkbox checked={check}  onChange={handleChange} style={{color:"#fff"}} />} label={
         <div  style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
         I accept all the terms and conditions{' '}
         <a
           href="https://accredian.com/xlri-admissions-policy/"
           target="_blank"
           rel="noopener noreferrer"
           style={{color:"blue",cursor:"pointer",textDecoration:"none"}}
          //  className={classes.hyperlink}
         >
           (Read more)<span style={{color:"red"}}>*</span>
         </a>
       </div>
      } />
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
    <FormGroup sx={{display:"flex",mt:1}}>
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
      <FormControlLabel required control={<Checkbox checked={check2} onChange={handleChange2} style={{color:"#fff"}} />} href="https://accredian.com/xlri-admissions-policy/" label={
         <div  style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
        I confirm that I have gone through the program and it’s details and the program fits my career objective<span style={{color:"red"}}>*</span>{' '}
         {/* <a
           href="https://accredian.com/xlri-admissions-policy/"
           target="_blank"
           rel="noopener noreferrer"
           style={{color:"blue",cursor:"pointer"}}
          //  className={classes.hyperlink}
         >
           (Read more)
         </a> */}
       </div>
      } />
     
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
                    </Box>

              </Box>
              
            )}
          </Box>
        )}

        {/* </Collapse> */}
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
        </Box>
        {/* <Collapse in={openaddress} timeout="auto" unmountOnExit sx={{mb:2}}> */}
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
        </Box>
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
              fontSize: "20px",
            }}
          >
            Education Details
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
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#ffffff",
                  }}
                >
                  Highest Qualification <span style={{ color: "red" }}>*</span>
                </Typography>
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
                  <Select
                    size="small"
                    sx={{ width:280, background: "#fff" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //  value={bachelorDegree}
                    onChange={handleChangequalification}
                    defaultValue={"select"}
                  >
                    <MenuItem disabled="true" value={"select"}>
                      Select your Qualification
                    </MenuItem>
                    <MenuItem value={"High School Diploma"}>
                      High School Diploma
                    </MenuItem>
                    <MenuItem value={"Associate Degree"}>
                      Associate Degree
                    </MenuItem>
                    <MenuItem value={"Bachelor Degree"}>
                      Bachelor Degree
                    </MenuItem>
                    <MenuItem value={"Master Degree"}>Master Degree</MenuItem>
                    <MenuItem value={"Doctorate/Ph.D"}>Doctorate/Ph.D</MenuItem>

                    {/* <MenuItem value={30}>Others</MenuItem> */}
                  </Select>
                </FormControl>
                {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
              </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Degree Name<span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
              <Select
                size="small"
                sx={{ width: 280, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //  value={bachelorDegree}
                onChange={handleChangeDegree}
                defaultValue={"select"}
              >
                <MenuItem disabled="true" value={"select"}>
                  Select your degree
                </MenuItem>
                <MenuItem value={"B.Tech"}>B.Tech</MenuItem>
                <MenuItem value={"B.Voc"}>B.Voc</MenuItem>
                <MenuItem value={"B.Sc"}>B.Sc</MenuItem>
                <MenuItem value={"B.S"}>B.S</MenuItem>
                <MenuItem value={"BPharm"}>BPharm</MenuItem>
                <MenuItem value={"B.com"}>B.com</MenuItem>
                <MenuItem value={"BBA"}>BBA</MenuItem>
                <MenuItem value={"BBA Honors"}>BBA Honors</MenuItem>
                <MenuItem value={"BCA"}>BCA</MenuItem>
                <MenuItem value={"BArch"}>BArch</MenuItem>
                <MenuItem value={"B.L.L.A.B"}>B.L.L.A.B</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
                {/* <MenuItem value={30}>Others</MenuItem> */}
              </Select>
            </FormControl>
            {bachelorDegree=="others"?(
                      <Box sx={{mt:1}}>
                         <BootstrapInput
                         placeholder="Enter Bachelor's Degree Name"
                    onChange={handleChangeDegreeOther}
                    value={bachelorDegreeOther}
                      sx={{ width: 280 }}
                    size="small"
                    //  onKeyPress={(e) => {
                    //     if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    //     } else e.preventDefault();
                    //   }}
                  />
                      </Box>
                  ):(
                    <Box>

                    </Box>
                  )}
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              College/University Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              onChange={handleChangeCollegeName}
              value={collegeName}
              sx={{ width: 280,background:"#fff",borderRadius:"5px" }}
              size="small"
              error={error}
        // onKeyPress={handleKeyPress}
        helperText={error ? 'Special characters are not allowed' : ''}
              //  onKeyPress={(e) => {
              //     if (new RegExp(/[a-zA-Z]/).test(e.key)) {
              //     } else e.preventDefault();
              //   }}
            />
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
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
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Year of Completion<span style={{ color: "red" }}>*</span>
            </Typography>
            <BootstrapInput
              type="number"
              sx={{ width: 280 }}
              size="small"
              onChange={handleChangeYear}
              value={yearOfCompletion}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Degree % / CGPA<span style={{ color: "red" }}>*</span>
            </Typography>
            <BootstrapInput
              type="number"
              sx={{ width: 280 }}
              size="small"
              onChange={handleChangeCgpa}
              value={cgpa}
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
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Upload Relevant Document<span style={{ color: "red" }}>*<i style={{ color: "#fff",fontSize:"12px" }}>(Please upload the documents in pdf format)</i></span>
            </Typography>
            <TextField
              inputProps={{
                accept: "application/pdf",
                // onChange: handleFileChange,
              }}
              onChange={handleChangeBachelorDocuments}
              size="small"
              sx={{ width: 280, background: "#fff", borderRadius: "4px" }}
              fullWidth
              type="file"
            ></TextField>
          </Box>
           {/* <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#ffffff" }}
            >
              Upload your professional headshot<span style={{ color: "red" }}>*<i style={{ color: "#fff",fontSize:"12px" }}></i></span>
            </Typography>
            <TextField
              inputProps={{
                accept: "image/*",
                // onChange: handleFileChange,
              }}
              onChange={handleChangeImage}
              size="small"
              sx={{ width:{xs:280,lg:480}, background: "#fff", borderRadius: "4px" }}
              fullWidth
              type="file"
            ></TextField>
            </Box> */}
        </Box>

        <Box
          sx={{ mb: 0.5, p: 1, borderRadius: "5px" }}
          onClick={handleClickaddress}
        >
          {/* {openaddress ? <ExpandLess sx={{color:"#fff"}} /> : <ExpandMore sx={{color:"#fff"}} />} */}
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Work Experience Details
          </Typography>
        </Box>
        {/* <Collapse in={openaddress} timeout="auto" unmountOnExit sx={{mb:2}}> */}
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              color: "#fff",
              mt: 2,
              mb: 1,
              width: 250,
            }}
          >
            Are you currently working?
          </Typography>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
            <Select
              size="small"
              sx={{ width: 280, background: "#fff", mt: 1 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              onChange={handleChangeChoice}
              defaultValue={"select"}
            >
              <MenuItem disabled="true" value={"select"}>
                select
              </MenuItem>
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
              {/* <MenuItem value={30}>Others</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
        {choice == "" ? (
          <Box></Box>
        ) : (
          <Box>
            {choice == "Yes" ? (
              <Box
                sx={{
                  // display: "flex",
                  // justifyContent: "space-between",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Box >
  <Typography
    sx={{
      fontWeight: "bold",
      fontSize: "14px",
      color: "#ffffff",
    }}
  >
    Total Years of Experience(Full-time only){" "}
    <span style={{ color: "red" }}>*</span>
  </Typography>
  <TextField
    type="number"
    onChange={handleChangeTotalExp}
    value={Total_exp}
    sx={{
      width:280,
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
              Current Industry<span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
              <Select
                size="small"
                sx={{ width: 280, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                 value={industry}
                onChange={handleChangeIndustry}
                defaultValue={"select"}
              >
                <MenuItem disabled="true" value={"select"}>
                  Select your Current Industry
                </MenuItem>
                <MenuItem value={"Automotive"}>Automotive</MenuItem>
                <MenuItem value={"Banking and Financial Services"}>Banking and Financial Services</MenuItem>
                <MenuItem value={"Construction and Engineering"}>Construction and Engineering</MenuItem>
                <MenuItem value={"Consumer Goods and Retail"}>Consumer Goods and Retail</MenuItem>
                <MenuItem value={"Energy and Utilities"}>Energy and Utilities</MenuItem>
                <MenuItem value={"Food and Beverage"}>Food and Beverage</MenuItem>
                <MenuItem value={"Healthcare and Pharmaceuticals"}>Healthcare and Pharmaceuticals</MenuItem>
                <MenuItem value={"Information Technology and Services"}>Information Technology and Services</MenuItem>
                <MenuItem value={"Insurance"}>Insurance</MenuItem>
                <MenuItem value={"Manufacturing"}>Manufacturing</MenuItem>
                <MenuItem value={"Media and Entertainment"}>Media and Entertainment</MenuItem>
                <MenuItem value={"Professional Services"}>Professional Services</MenuItem>
                <MenuItem value={"Real Estate"}>Real Estate</MenuItem>
                <MenuItem value={"Transportation and Logistics"}>Transportation and Logistics</MenuItem>
                <MenuItem value={"Travel and Hospitality"}>Travel and Hospitality</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
                {/* <MenuItem value={30}>Others</MenuItem> */}
              </Select>
            </FormControl>
            {industry=="others"?(
                      <Box sx={{mt:1}}>
                         <BootstrapInput
                         sx={{width:280}}
                      placeholder="Enter Your Previous Industry"
                    onChange={handleChangeIndustryOther}
                    value={industryOther}
                    //   sx={{ width: 480 }}
                    size="small"
                    //  onKeyPress={(e) => {
                    //     if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    //     } else e.preventDefault();
                    //   }}
                  />
                      </Box>
                  ):(
                    <Box>

                    </Box>
                  )}
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
          </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#ffffff",
                    }}
                  >
                    Current Company Name <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
              onChange={handleChangeCpmanyName}
              value={companyname}
              sx={{ width: 280,background:"#fff",borderRadius:"5px" }}
              size="small"
              error={validCmpname}
        // onKeyPress={handleKeyPress}
        helperText={validCmpname ? 'Special characters are not allowed' : ''}
              //  onKeyPress={(e) => {
              //     if (new RegExp(/[a-zA-Z]/).test(e.key)) {
              //     } else e.preventDefault();
              //   }}
            />
                  {/* <BootstrapInput
                    onChange={handleChangeCpmanyName}
                    value={companyname}
                    sx={{ width: 280 }}
                    size="small"
                    // onKeyPress={(e) => {
                    //   if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    //   } else e.preventDefault();
                    // }}
                  /> */}
                </Box>
                <Box>
  <Typography
    sx={{
      fontWeight: "bold",
      fontSize: "14px",
      color: "#ffffff",
    }}
  >
    Current Designation
    <span style={{ color: "red" }}>*</span>
  </Typography>
  <BootstrapInput
    onChange={handleChangeDesignation}
    value={designation}
    sx={{ width:280}}
    size="small"
    // onKeyPress={(e) => {
    //   if (new RegExp(/[a-zA-Z]/).test(e.key)) {
    //   } else e.preventDefault();
    // }}
  />
</Box>

                <Box sx={{mb:1}}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#ffffff",
                    }}
                  >
                    Company Email Id <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    type="email"
                    
                    error={!isEmailValid}
                    helperText={!isEmailValid ? 'Invalid email format' : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon color={!isEmailValid ? 'error' : 'action'} />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleChangeCompanyemail}
                    value={companyemail}
                    sx={{ width: 280, background: "#fff", borderRadius: "5px" }}
                    size="small"
                  />
                </Box>
                {/* <FormGroup sx={{display:"flex"}}>
      
      <FormControlLabel required control={<Checkbox onChange={handleChange} style={{color:"#fff"}}   />} href="https://accredian.com/xlri-admissions-policy/" label={
         <div style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
        I agree to confirm that I have gone through the program and it’s details and the program fits my career objective{' '}
        
       </div>
      } />
     
     
    </FormGroup> */}
     <Box sx={{mt:2}}>
                    <FormGroup sx={{mb:1}}>
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
      <FormControlLabel required control={<Checkbox checked={check}  onChange={handleChange} style={{color:"#fff"}} />} label={
         <div  style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
         I accept all the terms and conditions{' '}
         <a
           href="https://accredian.com/xlri-admissions-policy/"
           target="_blank"
           rel="noopener noreferrer"
           style={{color:"blue",cursor:"pointer",textDecoration:"none"}}
          //  className={classes.hyperlink}
         >
           (Read more)<span style={{color:"red"}}>*</span>
         </a>
       </div>
      } />
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
    <FormGroup sx={{display:"flex",mt:1}}>
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
      <FormControlLabel required control={<Checkbox checked={check2} onChange={handleChange2} style={{color:"#fff"}} />} href="https://accredian.com/xlri-admissions-policy/" label={
         <div  style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
        I confirm that I have gone through the program and it’s details and the program fits my career objective<span style={{color:"red"}}>*</span>{' '}
         {/* <a
           href="https://accredian.com/iitg-admissions-policy/"
           target="_blank"
           rel="noopener noreferrer"
           style={{color:"blue",cursor:"pointer"}}
          //  className={classes.hyperlink}
         >
           (Read more)
         </a> */}
       </div>
      } />
     
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
                    </Box>
              </Box>
            ) : (
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
    sx={{
      fontWeight: "bold",
      fontSize: "14px",
      color: "#ffffff",
    }}
  >
    Total Years of Experience(Full-time only){" "}
    <span style={{ color: "red" }}>*</span>
  </Typography>
  <TextField
    type="number"
    onChange={handleChangeTotalExp}
    value={Total_exp}
    sx={{
      width:280,
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
              Previous Industry<span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Payment Type</InputLabel> */}
              <Select
                size="small"
                sx={{ width: 280, background: "#fff" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                 value={previndustry}
                onChange={handleChangePrevIndustry}
                defaultValue={"select"}
              >
                <MenuItem disabled="true" value={"select"}>
                  Select your Previous Industry
                </MenuItem>
                <MenuItem value={"Automotive"}>Automotive</MenuItem>
                <MenuItem value={"Banking and Financial Services"}>Banking and Financial Services</MenuItem>
                <MenuItem value={"Construction and Engineering"}>Construction and Engineering</MenuItem>
                <MenuItem value={"Consumer Goods and Retail"}>Consumer Goods and Retail</MenuItem>
                <MenuItem value={"Energy and Utilities"}>Energy and Utilities</MenuItem>
                <MenuItem value={"Food and Beverage"}>Food and Beverage</MenuItem>
                <MenuItem value={"Healthcare and Pharmaceuticals"}>Healthcare and Pharmaceuticals</MenuItem>
                <MenuItem value={"Information Technology and Services"}>Information Technology and Services</MenuItem>
                <MenuItem value={"Insurance"}>Insurance</MenuItem>
                <MenuItem value={"Manufacturing"}>Manufacturing</MenuItem>
                <MenuItem value={"Media and Entertainment"}>Media and Entertainment</MenuItem>
                <MenuItem value={"Professional Services"}>Professional Services</MenuItem>
                <MenuItem value={"Real Estate"}>Real Estate</MenuItem>
                <MenuItem value={"Transportation and Logistics"}>Transportation and Logistics</MenuItem>
                <MenuItem value={"Travel and Hospitality"}>Travel and Hospitality</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
                {/* <MenuItem value={30}>Others</MenuItem> */}
              </Select>
            </FormControl>
            {previndustry=="others"?(
                      <Box sx={{mt:1}}>
                         <BootstrapInput
                         sx={{width:280}}
                      placeholder="Enter Your Previous Industry"
                    onChange={handleChangePrevIndustryOther}
                    value={previndustryOther}
                    //   sx={{ width: 480 }}
                    size="small"
                    //  onKeyPress={(e) => {
                    //     if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    //     } else e.preventDefault();
                    //   }}
                  />
                      </Box>
                  ):(
                    <Box>

                    </Box>
                  )}
            {/* {name?"":<Typography sx={{color:"red"}}>This Filed is Required</Typography>} */}
          </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#ffffff",
                    }}
                  >
                    {" "}
                    Previous Company Name{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <BootstrapInput
                    onChange={handleChangePreviousCompany}
                    value={previuosCompany}
                    sx={{ width: 280 }}
                    size="small"
                    // onKeyPress={(e) => {
                    //   if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    //   } else e.preventDefault();
                    // }}
                  />
                </Box>
                <Box sx={{mb:1}}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#ffffff",
                    }}
                  >
                    Upload Relevant Document
                    <span style={{ color: "red" }}>*<i style={{ color: "#fff",fontSize:"12px" }}>(Please upload the documents in pdf format)</i></span>
                  </Typography>
                  <TextField
                    inputProps={{
                      accept: "application/pdf",
                      // onChange: handleFileChange,
                    }}
                    onChange={handleChangeExperinceDocuments}
                    size="small"
                    sx={{ width: 280, background: "#fff", borderRadius: "4px" }}
                    fullWidth
                    type="file"
                  ></TextField>
                </Box>
                {/* <FormGroup sx={{display:"flex"}}>
    
      <FormControlLabel required control={<Checkbox onChange={handleChange} style={{color:"#fff"}}   />} href="https://accredian.com/iitg-admissions-policy/" label={
         <div style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
        I agree to confirm that I have gone through the program and it’s details and the program fits my career objective{' '}
         
       </div>
      } />
     
     
    </FormGroup> */}
     <Box sx={{mt:2}}>
                    <FormGroup sx={{mb:1}}>
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
      <FormControlLabel required control={<Checkbox checked={check}  onChange={handleChange} style={{color:"#fff"}} />} label={
         <div  style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
         I accept all the terms and conditions{' '}
         <a
           href="https://accredian.com/xlri-admissions-policy/"
           target="_blank"
           rel="noopener noreferrer"
           style={{color:"blue",cursor:"pointer",textDecoration:"none"}}
          //  className={classes.hyperlink}
         >
           (Read more)<span style={{color:"red"}}>*</span>
         </a>
       </div>
      } />
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
    <FormGroup sx={{display:"flex",mt:1}}>
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
      <FormControlLabel required control={<Checkbox checked={check2} onChange={handleChange2} style={{color:"#fff"}} />} href="https://accredian.com/xlri-admissions-policy/" label={
         <div  style={{color:"#fff",fontWeight:"bold",fontSize:"14px"}}>
        I confirm that I have gone through the program and it’s details and the program fits my career objective<span style={{color:"red"}}>*</span>{' '}
         {/* <a
           href="https://accredian.com/iitg-admissions-policy/"
           target="_blank"
           rel="noopener noreferrer"
           style={{color:"blue",cursor:"pointer"}}
          //  className={classes.hyperlink}
         >
           (Read more)
         </a> */}
       </div>
      } />
     
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
                    </Box>
              </Box>
            )}
          </Box>
        )}

        {/* </Collapse> */}
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
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ ml: 2 }}>
            Processing your application form
          </Typography>
        </Box>
      </Backdrop>
      <ToastContainer />
    </>
  );
};
export default Education;
