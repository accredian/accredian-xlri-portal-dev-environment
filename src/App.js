import './App.css';
import Basic from './components/formSteps/BasicSteps';
import Login from './components/Login';
import NewLogin from './components/Login_new'
import SignUp from './components/signUp';
import BasicNew from './components/formSteps/BasicStep-new';
import BasicDT from './components/formSteps-dt/stepPage';
import CustomizedInputs from './components/formSteps/dummy';
import {
  Routes,
  Route,
  Navigate,

} from "react-router-dom";
import BasicGM from './components/formSteps-gm/stepPage';

function App() {

  function PrivateOutlet() {
    const useAuth=()=>{
      const user=localStorage.getItem('user_id')
      if(user){
        return true
      } else {
        return false
      }
    }
    const auth = useAuth();
    return auth ? <BasicNew /> : <Navigate to="/Login" />;
  }
  function PrivateOutletGM() {
    const useAuth=()=>{
      const user=localStorage.getItem('user_id')
      if(user){
        return true
      } else {
        return false
      }
    }
    const auth = useAuth();
    return auth ? <BasicGM /> : <Navigate to="/Login" />;
  }
  function PrivateOutletDT() {
    const useAuth=()=>{
      const user=localStorage.getItem('user_id')
      if(user){
        return true
      } else {
        return false
      }
    }
    const auth = useAuth();
    return auth ? <BasicDT /> : <Navigate to="/Login" />;
  }
  return (
    <>
    <Routes>
    <Route path='/' element={<SignUp />} />
    {/* <Route path='/login' element={<Login />} /> */}
    <Route path='/login' element={<NewLogin />} />
    {/* <div className='bg'> */}
    {/* <Route path='/Form' element={<Basic/>} /> */}
    <Route path='/form' element={<PrivateOutlet/>} />
    <Route path='/GMform' element={<PrivateOutletGM/>} />
    <Route path='/DTform' element={<PrivateOutletDT/>} />
    {/* <Route path='/dummy' element={<CustomizedInputs/>} /> */}
    {/* </div> */}
    
    </Routes>
    
    </>
  );
}

export default App;
