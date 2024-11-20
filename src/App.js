import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import CustomerForm from "./Components/CustomerForm";
import NavBar from "./Components/NavBar";
import HorizontalNavBar from "./Components/HorizontalNavBar";
import About from "./Components/About";
import Login from "./Components/Login";
import { Authprovider } from "./Components/AuthContext";
import ForgetPassword from "./Components/ForgetPassword";
import ByNowDetails from "./Components/ByNowDetails";
import UserAdmin from "./Components/UserAdmin";
import FilterProductList from "./Components/FilterProductList";
import MainCustomerHomePage from "./Components/MainCustomerHomePage";
import MainCustomerCardDestails from "./Components/MainCustomerCardDestails";
import CartPage from "./Components/CartPage";
import OrderManagementPage from "./Components/OrderManagementPage";
import CustomerOrder from "./Components/CustomerOrder";
import CanceledOrders from "./Components/CanceldOrders";

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
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // Hide NavBars for admin pages
  const hideNavBars = location.pathname.startsWith("/adminPage");

  return (
    <>
      {!hideNavBars && (
        <>
          <NavBar />
          <HorizontalNavBar />
        </>
      )}

      <Routes>
        {/* Customer Routes */}
        <Route
          path="/"
          element={
            <MainCustomerHomePage
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route
          path="/home"
          element={
            <MainCustomerHomePage
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<CustomerForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/products/:category" element={<FilterProductList />} />
        <Route
          path="/product-details/:product_id"
          element={<MainCustomerCardDestails />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/buyform" element={<ByNowDetails />} />
        <Route path="/customerorder" element={<CustomerOrder />} />
        {/* Admin Routes */}
        <Route
          path="/adminPage"
          element={<UserAdmin products={products} setProducts={setProducts} />}
        />
        <Route path="/adminPage/orderpage" element={<OrderManagementPage />} />
        <Route path="/adminPage/cancelorderpage" element={<CanceledOrders />} />
      </Routes>
    </>
  );
}

export default App;
