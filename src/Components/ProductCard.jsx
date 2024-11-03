import React from 'react'
import './ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({title,image,price}) => {
  return (
    <div className='product'>
      <div className='topic'>
        <h2 id='title'>{title}</h2>
        </div>
        <div className='image'>
            <image src={image}></image>
             </div>
            <div className='price'>Rs.{price}

            </div>
           
            <div className='cart'>
           <Link to="/buynow">
                <button id='purchase'>Buy</button>
                </Link>
                <button id='cart'>Add To Cart</button>
                </div>       
      
      </div>
    
  )
}

export default ProductCard
