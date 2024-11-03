import React, { useState } from "react";
import "./UserAdmin.css";
import ProductForm from "./ProductForm";

function UserAdmin({ products, setProducts }) {
  const [showForm, setShowForm] = useState(false); // to toggle the visibility of the form when other button is clicked
  const [showModifyList, setShowModifyList] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // check if we are editing a product
  const [currentProductIndex, setCurrentProductIndex] = useState(null); // show the index of the product being edited
  const [newProduct, setNewProduct] = useState({
    // product details
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
    subImages: [], // To store sub images
  });
  const [message, setMessage] = useState(""); // hold messages for user actions

  // Handle changes in the input fields of the product form
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle changes in the sub images file input
  const handleSubImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const subImageUrls = files.map((file) => URL.createObjectURL(file));
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      subImages: subImageUrls,
    }));
  };

  // new product add
  const handleAddProduct = () => {
    if (validateForm()) {
      const newProductWithId = { ...newProduct, id: products.length + 1 }; // Assign a unique ID
      setProducts([...products, newProductWithId]); // Add new product to the products list
      setMessage("Product added successfully!"); // Success message
      setTimeout(() => setMessage(""), 2000); // Clear the message after 2 seconds
      resetForm(); // Reset form fields
      setShowForm(false); // Hide the form
    }
  };

  // To update an existing product
  const handleUpdateProduct = () => {
    if (validateForm()) {
      const updatedProducts = [...products];
      updatedProducts[currentProductIndex] = newProduct; // Update the specific product
      setProducts(updatedProducts); // Update the products
      setMessage("Successfully updated!");
      setTimeout(() => setMessage(""), 2000); // Clear the message after 2 seconds
      resetForm();
      setShowForm(false);
    }
  };

  // delete the product
  const handleDelete = (index) => {
    const confirmed = window.confirm("Delete this product?"); // Confirm deletion
    if (confirmed) {
      const updatedProducts = products.filter((_, i) => i !== index); // Remove the product from the list
      setProducts(updatedProducts); // Update the deleted products
      setMessage("Product deleted successfully."); // Success message
      setTimeout(() => setMessage(""), 2000); // Clear the message after 2 seconds
    }
  };

  // edit a specific product
  const handleEditProduct = (index) => {
    setNewProduct(products[index]); // Load the product details into the form
    setIsEditing(true); // Set editing mode
    setCurrentProductIndex(index); // Set the index of the product being edited
    setShowForm(true); // Show the form for editing
  };

  // Validate the form inputs
  const validateForm = () => {
    if (
      !newProduct.title ||
      !newProduct.image ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.description
    ) {
      setMessage("Please fill out all fields."); // Error message if fields are empty
      setTimeout(() => setMessage(""), 2000); // Clear the message after 2 seconds
      return false;
    }
    return true; // If form is valid
  };

  const toggleAddForm = () => {
    setShowForm((prev) => !prev);
    resetForm();
    setShowModifyList(false); // Hide modify list when adding a product
  };

  const handleShowModify = () => {
    setShowModifyList((prev) => !prev); // Toggle visibility of the modify list
    setShowForm(false); // Ensure the form is hidden
  };

  const resetForm = () => {
    setNewProduct({
      title: "",
      image: "",
      category: "",
      price: "",
      description: "",
      subImages: [], // Reset subImages when form is reset
    });
    setIsEditing(false);
    setCurrentProductIndex(null);
  };

  return (
    <div className="UserAdmin">
      <nav className="sidebar">
        <button onClick={toggleAddForm}>Add Product</button>
        <button onClick={handleShowModify}>Modify Product</button>
        <button>Logout</button> {/* logout handler */}
      </nav>
      <main>
        {message && <p className="message">{message}</p>}{" "}
        {/* Display user actions messages */}
        {showForm && (
          <ProductForm
            product={newProduct} // Pass the product details to the form
            onChange={handleInputChange} // Input change handler
            onSubImageChange={handleSubImagesChange} // Sub image change handler
            onSubmit={isEditing ? handleUpdateProduct : handleAddProduct} // Submit based on editing condition
            isEditing={isEditing} // Pass editing state to the form
          />
        )}
        {showModifyList && ( // Show product list only if "Modify Product" is clicked
          <div className="product-list">
            {products.length === 0 ? (
              <p>No products available.</p> // shows when no products are available
            ) : (
              products.map((product, index) => (
                <div key={index} className="product-card">
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>Category: {product.category}</p>
                  <p>Price: Rs{product.price}</p>
                  <p>Description: {product.description}</p>
                  <button onClick={() => handleEditProduct(index)}>
                    Update
                  </button>{" "}
                  {/* Edit button */}
                  <button onClick={() => handleDelete(index)}>
                    Delete
                  </button>{" "}
                  {/* Delete button */}
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default UserAdmin;
