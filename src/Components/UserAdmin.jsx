import React, { useState ,useEffect} from "react";
import "./UserAdmin.css";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";

function UserAdmin({ products, setProducts }) {


  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost/backend/api/getproduct.php");
      const data = await response.json();
      setProducts(data); // Update the state with fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  // Use fetchProducts on component load
  useEffect(() => {
    fetchProducts();
  }, []);



  const [showForm, setShowForm] = useState(false); // to toggle the visibility of the form when other button is clicked
  const [showModifyList, setShowModifyList] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // check if we are editing a product
  const [currentProductIndex, setCurrentProductIndex] = useState(null); // show the index of the product being edited
  const navigate =useNavigate();
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

  // Handle changes in the main image file input
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      //const imageUrl = URL.createObjectURL(file);
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
    }
  };

  // Handle changes in the sub images file input
  const handleSubImagesChange = (e) => {
    const files = Array.from(e.target.files);
   // const subImageUrls = files.map((file) => URL.createObjectURL(file));
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      subImages: files,
    }));
  };

  // new product add
  const handleAddProduct = async() => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("category", newProduct.category);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      
      // Append the main image file
      if (newProduct.image) {
        formData.append("main_image", newProduct.image);
      } else {
        setMessage("Please upload a main image.");
        return;
      }
      
      // Append all sub-images
      if (newProduct.subImages.length > 0) {
        newProduct.subImages.forEach((file) => {
          formData.append("sub_images[]", file);
        });
      }
  
      // Send request to PHP backend
      try {
        const response = await fetch("http://localhost/backend/api/addProduct.php", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        if (result.message) {
          setMessage(result.message);
          setTimeout(() => setMessage(""), 2000);
          resetForm();
          setShowForm(false);
          fetchProducts(); // Fetch updated products list
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };


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
  const logoutOperation=()=>{
    navigate("/logoutDemo");
  }

  return (
    <div className="UserAdmin">
      <nav className="sidebar">
        <button onClick={toggleAddForm}>Add Product</button>
        <button onClick={handleShowModify}>Modify Product</button>
        <button onClick={logoutOperation}>Logout</button> {/* logout handler */}
      </nav>
      <main>
        {message && <p className="message">{message}</p>}{" "}
        {/* Display user actions messages */}
        {showForm && ( // Show the form if the user is adding or editing a product
          <ProductForm
            product={newProduct} // Pass the product details to the form
            onChange={handleInputChange} // Input change handler
            onMainImageChange={handleMainImageChange} // Pass main image change handler
            onSubImageChange={handleSubImagesChange} // Sub image change handler
            onSubmit={isEditing ? handleUpdateProduct : handleAddProduct} // Submit based on editing condition
            isEditing={isEditing} // Pass editing state to the form
          />
        )}
        {/* Only show the product list if not in the process of adding/updating a product */}
        {!showForm &&
          showModifyList && ( // Show product list only if "Modify Product" is clicked and no form is shown
            <div className="product-list">
              {products.length === 0 ? (
                <p>No products available.</p> // shows when no products are available
              ) : (
                products.map((product, index) => (
                  <div key={index} className="product-card">
                     <img src={`data:image/jpeg;base64,${product.main_image}`} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>Category: {product.category}</p>
                    <p>Price: Rs{product.price}</p>
                    <p>Description: {product.description}</p>
                    <button onClick={() => handleEditProduct(index)}>
                      Update
                    </button>{" "}
                    <button onClick={() => handleDelete(index)}>Delete</button>
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