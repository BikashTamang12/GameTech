import React from 'react'
import CustomerPageProductCard from './CustomerPageProductCard';
import './MainCustomerPageProductCard.css';
import { useState,useEffect } from 'react';

const MainCustomerHomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost/backend/api/customerMainPageProductlist.php') 
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.error('Error fetching products:', error));
      }, []);


  return (
    <div className='mainpage1'>
       {products.length > 0 ? (
        products.map(product => (
          <CustomerPageProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No products found in this category</p>
      )}
    </div>
  )
}

export default MainCustomerHomePage
