import React from 'react'
import "./ProductFilterCard.css";

const FilterProductCard = ({product}) => {
    const image = `data:image/jpeg;base64,${product.main_image}`;
  return (
    <div className="filterproductcard">
        <h3 className="producttitle22">{product.title}</h3>
        <div className='imageofproduct'>
      <img src={image} alt ={product.title} className="product_image"/>
      </div>
      <p className='product_price'>Rs.{product.price}</p>
      

    </div>
  )
}

export default FilterProductCard
