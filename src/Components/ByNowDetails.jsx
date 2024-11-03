import React, { useState } from 'react'
import './ByNowDetails.css';

const ByNowDetails = () => {
 const[reciever,setReciever]=useState({
    recievername:"",
    recieverphone:"",
    recieveraddress:""
 });

 const[error,setErrors]=useState({});

 const handleChange=(e)=>{
    const{name,value}=e.target;
    setReciever({
        ...reciever,
        [name]:value,
    });
  setErrors({});
 }



  return (
    <div className='mainbody'>
        <fieldset className='revieverfeildset'>
      <div id="headingbuy">
        <p id='headingbuy1'>Provide The Reciever Details</p>
      </div>
      
      <div className='recievername'>
        <label htmlFor='revievername1' id='recievername1'>Reciever Name</label>
        <input type='text' id='recievername2' name='recievername' value={reciever.recievername} onChange={handleChange}></input>
        {error.recievername && (
                <div id="emailerror">
                  <span style={{ color: "red" }}>{error.recievername}</span>
                </div>
              )}
        </div>
        <div className='recieverphone'>
        <label htmlFor='recieverphone1'  id='recieverphone1'>Phone</label>
        <input type='phone' id='recieverphone2' name='recieverphone' value={reciever.recieverphone} onChange={handleChange}></input>
        {error.recieverphone && (
                <div id="emailerror">
                  <span style={{ color: "red" }}>{error.recieverphone}</span>
                </div>
              )}
        </div>
        <div className='recieveraddress'>
            <label htmlFor='recieveraddress' id='recieveraddress1'>Address</label>
            <input type='text' id='recieveraddress2' name='recieveraddress'  value={reciever.recieveraddress} onChange={handleChange}></input>
            {error.recieveraddress && (
                <div id="emailerror">
                  <span style={{ color: "red" }}>{error.recieveraddress}</span>
                </div>
              )}
        </div>
        </fieldset>
    </div>
  )
}

export default ByNowDetails
