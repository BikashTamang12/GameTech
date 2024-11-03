import React from 'react'
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
  
  return (
    <div>
      <ProductCard title="BAg" price="5000"/>

      <Link to='/home'></Link>
      
      
    </div>
  )
}

export default Home
