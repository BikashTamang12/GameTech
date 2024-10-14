import React from 'react'
import './ProductCard.css';

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
           
                <button id='purchase'>Buy</button>
            
                <button id='cart'>Add To Cart</button>
                </div>       
      
      </div>
    
  )
}

export default ProductCard
