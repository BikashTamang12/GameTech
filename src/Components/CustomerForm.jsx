import React, { useState } from 'react'
import './CustomerForm.css';
import { Link } from 'react-router-dom';

const CustomerForm = () => {
  const [regestration ,setRegestration]=useState({  // Initiliaze the value or simply state multiple inputs 
    address:'',
    username:'',
    phone:'',
    email:'',
    password:'',
    confirmpassword:''
  });
  const [errors,setErrors]=useState({});

  const handleChange=(e)=>{// capture the input value
    const{name,value}=e.target;
    setRegestration({//update the state of  regestration with new input.
      ...regestration,
      [name] : value,
    });
    setErrors({});// clears the error when the user input the value.
  };

  

  //Form validation....
  const customerRegestrationvalidation=(e)=>{
    const newErrors={};
    e.preventDefault();

    //The regular expressin for proper validation.
    let a=/\d/; //checks the number.
    const b = /^(?:\+?1\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;//For Phone.
    const c = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;//For E-mail.
    const d = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;//For Password.

   //User name validation.
      if (regestration.username.length === 0) {
        newErrors.username = "*User name can't be empty";
      } else if (regestration.username.length < 3) {
        newErrors.username = "*User name must be at least 3 characters long";
      } else if (a.test(regestration.username)) { // Checks if username contains numbers
        newErrors.username = "*Numbers are not allowed in the username!";
      }else{
        newErrors.username='';
      }



      //Address Validation.
      if(regestration.address.length===0){
        newErrors.address="*Address field is required!";
      }else{
        newErrors.address="";
      }



      //Phone Number Validation.
      if(regestration.phone.length===0){
        newErrors.phone="*phone number is required!";

      }else if(!b.test(regestration.phone)){
        newErrors.phone="*wrong phone number !!";
      }  else {
        newErrors.phone="";
      }
      



      //Email Validation.
      if(regestration.email.length===0){
        newErrors.email="*email is required!!";
      }
      else if(!c.test(regestration.email)){
        newErrors.email="*wrong email!!";
      }else{
        newErrors.email="";
      }
      
      


      //Password Validation.
      if(regestration.password.length===0){
        newErrors.password="*password is required!";
      }
      else if(regestration.password.length<8){
        newErrors.password="*password must be at least 8 digit or more than that!!";        
      }
      else if(!d.test(regestration.password)){
        newErrors.password="*password must contain 1 uppercase ,1 special character and lowercase";
      }
      else{
        newErrors.password="";
      }
      if(regestration.confirmpassword.length===0){
        newErrors.confirmpassword="*this field can't be empty!";
      }
     else if(regestration.confirmpassword!==regestration.password){
        newErrors.confirmpassword="*password didn't match!";
      }
      else{
        newErrors.confirmpassword="";
      }

      setErrors(newErrors);//Upadte the state of error.

  }
  return (
    <div>
    <h>Customer Regestration</h>
      <form onSubmit={ customerRegestrationvalidation}>
        {/*Email Creation */}
        <label htmlFor="username" >Name:</label>
        <input type="text" id="username" name="username" value={regestration.username} onChange={handleChange}></input>
        {errors.username&&<span style={{color:'red'}}>{errors.username}</span>}
       <br></br>
       <br></br>
       {/*Address Creation */}
        <label htmlFor='address'>Address:</label>
        <input type='text' name='address' id="address" value={regestration.address} onChange={handleChange}></input>
        {errors.address&&<span style={{color:'red'}}>{errors.address}</span>}
       <br></br>
       <br></br>
       {/*Phone Creation */}
        <label htmlFor='phone'>Phone Number:</label>
        <input type='phone' name='phone' id="phone" value={regestration.phone} onChange={handleChange}></input>
        {errors.phone&&<span style={{color:'red'}}>{errors.phone}</span>}
        <br></br>
        <br></br>
       {/*Email Creation */}
        <label htmlFor='email'>E-mail:</label>
        <input type='text' name='email' id="email" value={regestration.email} onChange={handleChange}></input>
        {errors.email&&<span style={{color:'red'}}>{errors.email}</span>}
        <br></br>
        <br></br>
       {/*Password Creation */}
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id="password" value={regestration.password} onChange={handleChange}></input>
        {errors.password&&<span style={{color:'red'}}>{errors.password}</span>}
        <br></br>
        <br></br>
        {/* Confirm Email Creation */}
       <label htmlFor='confirmpassword'>Confirm Password:</label>
        <input type='password' name='confirmpassword' id="confirmpassword" value={regestration.confirmpassword} onChange={handleChange}></input>
        {errors.confirmpassword&&<span style={{color:'red'}}>{errors.confirmpassword}</span>}
        <br></br>
        <br></br>
        {/*Submit button*/}
        <input type='submit'  id='submit' value="Submit"></input>
       <div id='div1'>
       <p>Already have an account?<Link to="/login">Login</Link> </p>
       
       </div>
        
      
        
      </form>
    </div>
  )
}

export default CustomerForm
