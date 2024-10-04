
import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import CustomerForm from './Components/CustomerForm';
import Login from './Components/Login';






function App() {
  return (
<>
<Router>
  <Routes>
  <Route path="/" element={<CustomerForm />} /> {/* Default page*/}
<Route path="/register" element={<CustomerForm/>}/>
<Route path='/login' element={<Login/>}/>
</Routes>
</Router>


</>
  );
}

export default App;
