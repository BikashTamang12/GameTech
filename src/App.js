
import React from 'react'
import {BrowserRouter as Router, Routes,Route,Navigate} from 'react-router-dom';
import CustomerForm from './Components/CustomerForm';

import NavBar from './Components/NavBar';
import HorizontalNavBar from './Components/HorizontalNavBar';

import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import { Authprovider } from './Components/AuthContext';
import ForgetPassword from './Components/ForgetPassword';
import ByNowDetails from './Components/ByNowDetails';



function App() {
  return (
<>

<Router>
<Authprovider>
  <NavBar/>
  <HorizontalNavBar/>
  
  
  <Routes>
 
  <Route path='/' element={<Navigate to="/home" />} />    
  <Route path='/home' element={<Home/>}/>
  

 <Route path='/buynow' element={<ByNowDetails/>}/>
  
<Route path='/about' element={<About/>}/>
<Route path='/signin' element={<CustomerForm/>}/>

<Route path='/login' element={<Login/>}/>
<Route path='forgetpassword' element={<ForgetPassword/>}/>

</Routes>
</Authprovider>
</Router>


</>
  );
}

export default App;
