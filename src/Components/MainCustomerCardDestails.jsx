import React from 'react'
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MainCustomerCardDetails.css';
const MainCustomerCardDestails = () => {
    const { product_id } = useParams(); 
    const [product, setProduct] = useState(null);
    useEffect(() => {
       
        fetch(`http://localhost/backend/api/mainCardDetails.php?product_id=${product_id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [product_id]);

    if (!product) {
        return <p>Loading product details...</p>;
    }

    const { title, main_image, sub_image, price, description } = product;

    const mainImage = `data:image/jpeg;base64,${main_image}`;
    const subImage = `data:image/jpeg;base64,${sub_image}`;
  return (
    <div className='backgroundimage12'>
    

    <fieldset className="productDetails12">
    <div className="custcardoverlay1"></div>
    <div className='outsidecustcard'>
        <div className='prodhead'>
    <p id='producthead'>{title}</p>
    </div>
    <div className="productImages12">
        <img src={mainImage} alt={title} className="mainImage12"/>
    </div>
    <div className='subImage12'>
    <img src={subImage} alt={title} className="subimage88"/>
    </div>
    <div className='prodprice'>
    <p className="productPrice">Rs. {price}</p>
    </div>
    <div className='proddesc12'>
    <p className="productDescription">{description}</p>
    </div>
    <div className='buybutton'>
        <button id='buynow1'>Buy</button>
    </div>
    <div className='cartbutton'>
        <button id='cartnow1'>Add To Cart</button>
    </div>
    </div>
</fieldset>
</div>
  )
}

export default MainCustomerCardDestails
