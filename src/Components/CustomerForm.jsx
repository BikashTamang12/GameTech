import React, { useState } from 'react'

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
    setRegestration({
      ...regestration,
      [e.target.name]:
      e.target.value,
    });
    setErrors({...errors,
        [e.target.name]:''// it clears the error message when it is inputted the value.
    });
  };

  

  //Form validation....
  const customerRegestrationvalidation=(e)=>{
    const newErrors={};
    e.preventDefault();

    if(regestration.username===0||regestration.address==0||regestration.phone==0||regestration.email==0||regestration.password==0||regestration.confirmpassword==0){
      alert("The form cannot be empty!!");
    }

  }
  return (
    <div>
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
        
      </form>
    </div>
  )
}

export default CustomerForm
