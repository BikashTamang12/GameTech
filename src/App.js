
import React from 'react'
import {BrowserRouter as Router, Routes,Route,Navigate} from 'react-router-dom';
import CustomerForm from './Components/CustomerForm';

import NavBar from './Components/NavBar';
import HorizontalNavBar from './Components/HorizontalNavBar';

import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
<<<<<<< HEAD
import { Authprovider } from './Components/AuthContext';
import ForgetPassword from './Components/ForgetPassword';
import ByNowDetails from './Components/ByNowDetails';
=======
 



// // App.js of admin to pass
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import UserAdmin from "./UserAdmin";
// import CustomerHomePage from "./CustomerHomePage";
// import NavBar from "./NavBar";
// import ProductDetails from "./ProductDetails";

// function App() {
//   const [products, setProducts] = useState([]);

//   return (
//     <Router>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<CustomerHomePage products={products} />} />
//         <Route path="/admin" element={<UserAdmin products={products} setProducts={setProducts} />} />
//         <Route path="/product/:id" element={<ProductDetails products={products} />} /> {/* New route */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
>>>>>>> 7cd6cc54b56cc03c665902cb9473e488aaa2dbfe



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
