// ProductForm.jsx
//in here the work for the pass of add product and update product is done
import React from "react";
import "./ProductForm.css";

const ProductForm = ({
  product, // The product details filed
  onChange, // Handle input changes
  onSubImageChange, // Handler for sub-image file input changes
  onSubmit, // Handle submission
  isEditing, // to indicate if we're in editing mode
}) => (
  <div className="form-container">
    {/* Header indicating if we're adding or updating a product */}
    <h2>{isEditing ? "Update Product" : "Add Product"}</h2>
    <form>
      {/* Title input field */}
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={product.title} // Binding to the title value of the product
          onChange={onChange} // Call onChange when the input value changes
          required // Make this field mandatory
        />
      </label>
      {/* Main Image URL input field */}
      <label>
        Main Image URL:
        <input
          type="text"
          name="image"
          value={product.image} // Binding to the image URL of the product
          onChange={onChange} // Call onChange when the input value changes
          required // Make this field filled
        />
      </label>
      {/* Sub Images file input field */}
      <label>
        Sub Images:
        <input
          type="file"
          name="subImages"
          multiple // Allow multiple file uploads
          onChange={onSubImageChange} // Call onSubImageChange when files are selected
        />
      </label>
      {/* Category selection dropdown */}
      <label>
        Category:
        <select
          name="category"
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
      </label>
      {/* Price input field */}
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={product.price} // Binding to the price value of the product
          onChange={onChange} // Call onChange when the input value changes
          required
        />
      </label>
      {/* Description textarea */}
      <label>
        Description:
        <textarea
          name="description"
          value={product.description} // Binding to the description value of the product
          onChange={onChange} // Call onChange when the input value changes
          required
        ></textarea>
      </label>
      {/* Submit button to either add or update a product */}
      <button type="button" onClick={onSubmit}>
        {isEditing ? "Update Product" : "Add Product"}{" "}
        {/* Button text changes based on editing state */}
      </button>
    </form>
  </div>
);

export default ProductForm;
