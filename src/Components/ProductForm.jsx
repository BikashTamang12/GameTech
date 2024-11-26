import React from "react";
import "../Components_CSS/ProductForm.css";
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import ImageIcon from '@mui/icons-material/Image';

const ProductForm = ({
  product,
  onChange,
  onMainImageChange,
  onSubmit,
  isEditing,
  message,
}) => (
  <div className="admin-form-container">
    <form className="admin-product-form">
     
      <div className="admin-second-div">
        <div id="admin-title-head">
          <p id="admin-titles">{isEditing ? "Update Product" : "Add Product"}</p>

          {message && <p className="admin-error-Message">{message}</p>}
        </div>

        <div className="admin-product-fieldset">


          {/*Title Creation*/}
          <div className="admin-form-title">
          <TitleIcon></TitleIcon>
          <input
            type="text"
            name="title"
            id="form-title"
            value={product.title}
            onChange={onChange}
            required
            placeholder="Enter the title"
          />
          </div>


          {/*Image Creation*/}
          <div className="admin-from-image">
         <ImageIcon></ImageIcon>
          <input
            type="file"
            name="mainImage"
            id="from-image"
            onChange={onMainImageChange}
            required
          />

</div>


{/*Category Creation*/}
          <div className="admin-form-category">
          <CategoryIcon></CategoryIcon>
          <select
            name="category"
            id="from-category"
            value={product.category}
            onChange={onChange}
            required
            placeholder="choose the category"
          >
            <option value="">Select a category</option>
            <option value="laptop">Laptop</option>
            <option value="mouse">Mouse</option>
            <option value="keyboard">Keyboard</option>
            <option value="pc">PC</option>
            <option value="xbox">Xbox</option>
            <option value="joystick">Joystick</option>
            <option value="cd">CD</option>
            <option value="psp">PSP</option>
            <option value="headphone">HeadPhone</option>
          </select>

          </div>
{/*Form Price Creation*/}
          <div className="admin-form-price">
          <AttachMoneyIcon></AttachMoneyIcon>
        
          <input
            type="number"
            name="price"
            id="from-price"
            value={product.price}
            onChange={onChange}
            required
            placeholder="Enter the price in RS."
          />

</div>
{/*Form Description*/}

<div className="admin-form-description">
         <DescriptionIcon></DescriptionIcon>
          <textarea
            name="description"
            id="form-description"
            value={product.description}
            onChange={onChange}
            required
            placeholder="Enter the product details"
          ></textarea>
          </div>

{/*Add product Button*/}
          <div className="add-product-button">
            <button id="add-product-form-button" type="button" onClick={onSubmit}>
              {isEditing ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
);

export default ProductForm;
