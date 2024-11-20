import React from "react";
import "./ProductForm.css";

const ProductForm = ({
  product,
  onChange,
  onMainImageChange,
  onSubmit,
  isEditing,
  message,
}) => (
  <div className="form-container">
    <form className="adminproductform">
      <div className="productoverlay"></div>

      <div className="outsideoverlay">
        <div id="head1123">
          <p id="head786">{isEditing ? "Update Product" : "Add Product"}</p>

          {message && <p className="errorMessage">{message}</p>}
        </div>

        <div className="locationshift">
          <label id="addtitle">Title:</label>
          <input
            type="text"
            name="title"
            id="addtitle2"
            value={product.title}
            onChange={onChange}
            required
          />

          <label id="imagetitle">Main Image:</label>
          <input
            type="file"
            name="mainImage"
            id="imagetitle2"
            onChange={onMainImageChange}
            required
          />

          <label id="cat23">Category:</label>
          <select
            name="category"
            id="cat78"
            value={product.category}
            onChange={onChange}
            required
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

          <label id="price888">Price:</label>
          <input
            type="number"
            name="price"
            id="price777"
            value={product.price}
            onChange={onChange}
            required
          />

          <label id="dec78">Description:</label>
          <textarea
            name="description"
            id="desc56"
            value={product.description}
            onChange={onChange}
            required
          ></textarea>

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
