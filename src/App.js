
import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import CustomerForm from './Components/CustomerForm';

import NavBar from './Components/NavBar';
import HorizontalNavBar from './Components/HorizontalNavBar';

import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
 



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
