
import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import CustomerForm from './Components/CustomerForm';

import NavBar from './Components/NavBar';
import HorizontalNavBar from './Components/HorizontalNavBar';

import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';



 






function App() {
  return (
<>
<Router>
  <NavBar/>
  <HorizontalNavBar/>
  
  
  <Routes>
  
  <Route path='/' element={<Home/>}/>
  
<Route path='/about' element={<About/>}/>
<Route path='/login' element={<Login/>}/>

<Route path='/signin' element={<CustomerForm/>}/>
</Routes>
</Router>


</>
  );
}

export default App;
