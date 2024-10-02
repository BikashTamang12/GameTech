import React, { useState } from 'react'

const CustomerRegestration = () => {
  const [regestration ,setRegestration]=useState({
    address:'',
    username:'',
    phone:'',
    email:'',
    password:'',
    confirmpassword:''
  });

  const handleChange=(e)=>{
    setRegestration({
      ...regestration,
      [e.target.name]:
      e.target.value,
    });
  };
  const customerRegestrationvalidation=(e)=>{
    e.preventDefault();

  }
  return (
    <div>
      <form onSubmit={ customerRegestrationvalidation()}>
        <label htmlFor="username" >Name:</label>
        <input type="text" id="username" name="username" value={'regestration.username'} onChange={handleChange}></input>
        <label htmlFor='address'>Address:</label>
        <input type='text' name='address' id="address" value={'regestration.address'} onChange={handleChange}></input>
        <label htmlFor='phone'>Phone Number:</label>
        <input type='phone' name='phone' id="phone" value={'regestration.phone'} onChange={handleChange}></input>
        <label htmlFor='email'>E-mail:</label>
        <input type='text' name='email' id="email" value={'regestration.email'} onChange={handleChange}></input>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id="password" value={'regestration.password'} onChange={handleChange}></input>
        <label htmlFor='confirmpassword'>Confirm Password:</label>
        <input type='password' name='confirmpassword' id="confirmpassword" value={'regestration.confirmpassword'} onChange={handleChange}></input>
        <input type='submit'  id='submit'>Submit</input>
        
      </form>
    </div>
  )
}

export default CustomerRegestration
