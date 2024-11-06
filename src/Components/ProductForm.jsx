import React from "react";
import "./ProductForm.css";

const ProductForm = ({
  product, // The product details field
  onChange, // Handle input changes
  onMainImageChange, // New handler for main image file input change
  onSubImageChange, // Handler for sub-image file input changes
  onSubmit, // Handle submission
  onDelete, // Handle delete action
  isEditing, // to indicate if we're in editing mode
}) => (
  <div className="form-container">
    {/* Header indicating if we're adding or updating a product */}
    
    <form  className="adminproductform">
    <div className="productoverlay"></div>

    <div className="outsideoverlay">
      <div id="head1123">
    <p id="head786">{isEditing ? "Update Product" : "Add Product"}</p>
    </div>
      {/* Title input field */}
    
       <div className="locationshift">


      <label id="addtitle">
        Title:
        </label>
        <input

          type="text"
          name="title"
          id="addtitle2"
          value={product.title} // Binding to the title value of the product
          onChange={onChange} // Call onChange when the input value changes
          required // Make this field mandatory
        />
    

      {/* Main Image file input field */}
      <div className="mainimagecss">
      <label id="imagetitle">
        Main Image:
        </label>
        <input
          type="file"
          name="mainImage"
          id="imagetitle2"
          onChange={onMainImageChange} // Call onMainImageChange when the file is selected
          required // Make this field filled
        />
        </div>
      

      {/* Sub Images file input field */}
      <div className="subimagecss">
      <label id="imagetitle5">
        Sub Images:
        </label>
        <input
          type="file"
          name="subImages"
          id="imagetitle56"
          multiple // Allow multiple file uploads
          onChange={onSubImageChange} // Call onSubImageChange when files are selected
        />
      </div>

      {/* Category selection dropdown */}

      <div className="cat12">
      <label id="cat23">
        Category:
        </label>
        <select
          name="category"
          id="cat78"
          value={product.category} // Binding to the category value of the product
          onChange={onChange} // Call onChange when the selected category changes
          required
        >
          <option value="">Select a category</option> {/* Default prompt */}
          <option value="laptop">Laptop</option>
          <option value="mouse">Mouse</option>
          <option value="keyboard">Keyboard</option>
          <option value="pc">PC</option>
          <option value="xbox">Xbox</option>
          <option value="joystick">Joystick</option>
          <option value="cd">CD</option>
          <option value="psp">PSP</option>
        </select>
        </div>

      {/* Price input field */}

      <div className="price43">
      <label id="price888">
        Price:
        </label>
        <input
          type="number"
          name="price"
          id="price777"
          value={product.price} // Binding to the price value of the product
          onChange={onChange} // Call onChange when the input value changes
          required
        />
      </div>

      {/* Description textarea */}

      <div className="div1234">
      <label id="dec78">
        Description:
        </label>
        <textarea
          name="description"
          id="desc56"
          value={product.description} // Binding to the description value of the product
          onChange={onChange} // Call onChange when the input value changes
          required
        ></textarea>
        </div>
   

      {/* Buttons container */}
      <div className="button-container">
        <button id="addbutton123" type="button" onClick={onSubmit}>
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </div>
      </div>
      </div>
    </form>
  </div>
);

export default ProductForm;
