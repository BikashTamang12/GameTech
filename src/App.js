import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CustomerForm from './Components/CustomerForm';
import NavBar from './Components/NavBar';
import HorizontalNavBar from './Components/HorizontalNavBar';
import About from './Components/About';
import Login from './Components/Login';
import { Authprovider } from './Components/AuthContext';
import ForgetPassword from './Components/ForgetPassword';
import ByNowDetails from './Components/ByNowDetails';
//import CustomerHomePage from './Components/CustomerHomePage';
import UserAdmin from './Components/UserAdmin';
import FilterProductList from './Components/FilterProductList';
//import ProductDetails from './Components/ProductDetails';

function App() {
  return (
    <Router>
      <Authprovider>
        <AppContent />
      </Authprovider>
    </Router>
  );
}

function AppContent() {
  const [products, setProducts] = useState([]); // To make products as an empty array
  const location = useLocation();

  const hideNavBars = location.pathname === '/adminPage'; // Conditionally hide NavBar on adminPage

  return (
    <>
      {!hideNavBars && (
        <>
          <NavBar />
          <HorizontalNavBar />
        </>
      )}

      <Routes>
      

        



        <Route path="/adminPage" element={<UserAdmin products={products} setProducts={setProducts} />} /> {/* Pass props here */}
        <Route path="/buynow" element={<ByNowDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<CustomerForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/products/:category" element={<FilterProductList/>}/>
      </Routes>
    </>
  );
}

export default App;
