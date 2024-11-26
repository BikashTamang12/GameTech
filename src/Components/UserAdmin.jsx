import React, { useState, useEffect } from "react";
import "../Components_CSS/UserAdmin.css";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import adminLogo from "./Images/gt_logo.png";
import { Link } from "react-router-dom";

function UserAdmin({ products, setProducts }) {
  const [showForm, setShowForm] = useState(true); // Default to true (show add product form initially)
  const [showModifyList, setShowModifyList] = useState(false); // Show modify list only when needed
  const [isEditing, setIsEditing] = useState(false); // Track if we're editing a product
  const [currentProductIndex, setCurrentProductIndex] = useState(null); // Track which product we're editing
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
    subImages: "",
  });
  const [message, setMessage] = useState("");

  // Fetch products from the backend API
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost/backend/api/getproduct.php"
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch the products on initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
    }
  };

  const handleAddProduct = async () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("category", newProduct.category);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
  
      if (newProduct.image) {
        formData.append("main_image", newProduct.image);
      }
  
      // Add product ID if editing
      if (isEditing && currentProductIndex !== null) {
        formData.append("product_id", products[currentProductIndex].product_id);
      }
  
      try {
        const endpoint = isEditing
          ? "http://localhost/backend/api/updateProduct.php"
          : "http://localhost/backend/api/addProduct.php";
  
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        if (result.message) {
          setMessage(result.message);
          setTimeout(() => setMessage(""), 2000);
          resetForm();
          fetchProducts();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleDelete = async (index) => {
    const productId = products[index].product_id;
    try {
      const response = await fetch(
        "http://localhost/backend/api/deleteProduct.php",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ id: productId }),
        }
      );
      const result = await response.json();
      if (result.message) {
        setMessage(result.message);
        setTimeout(() => setMessage(""), 2000);
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        alert("Item deleted sucessfull");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditProduct = (index) => {
    setNewProduct({
      ...products[index],
      image: "", // Reset the image field for new uploads (optional)
      price: products[index].price || "",
    });
    setIsEditing(true);
    setCurrentProductIndex(index);
    setShowForm(true); // Show the form in edit mode
    setShowModifyList(false); // Hide the modify list
  };
  const validateForm = () => {
    if (
      !newProduct.title ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.description
    ) {
      setMessage("Please fill out all fields.");
      setTimeout(() => setMessage(""), 2000);
      return false;
    }
  
    // Check price validation
    const price = parseFloat(newProduct.price);
    if (isNaN(price) || price < 0) {
      setMessage("Please don't put a negative price.");
      setTimeout(() => setMessage(""), 2000);
      return false;
    }
  
    // Main image is required only for adding a new product
    if (!newProduct.image && !isEditing) {
      setMessage("Please upload a main image.");
      setTimeout(() => setMessage(""), 2000);
      return false;
    }
  
    return true;
  };

  const toggleAddForm = () => {
    setShowForm(true); // Show the add product form
    setShowModifyList(false); // Hide the modify list
    resetForm(); // Reset the form state
  };

  const handleShowModify = () => {
    setShowModifyList(true); // Show the modify product list
    setShowForm(false); // Hide the add product form
    resetForm();
  };

  const resetForm = () => {
    setNewProduct({
      title: "",
      image: "",
      category: "",
      price: "", 
      description: "",
      subImages: [],
    });
    setIsEditing(false);
    setCurrentProductIndex(null);
  };

  const logoutOperation = () => {
    localStorage.removeItem("authToken");
    navigate("/home", { replace: true });
  };

  const toggleOrderPage = () => {
    navigate("/adminPage/orderpage");
  };

  const toggleCanceledOrders = () => {
    navigate("/adminPage/cancelorderpage");
  };

  return (
    <div className="user-admin-main-page">
      <nav className="admin-navbar">
      <Link to="/adminPage" id="admin-logo">
          <img src={adminLogo} className="Admin-Logo" alt="Company Logo" />
        </Link>
        <div className="admin-add-product">
          
          <button id="admin-add-product-button" onClick={toggleAddForm}>
            Add Product
          </button>
        </div>
        <div className="admin-modify">
          <button id="admin-modify-button" onClick={handleShowModify}>
            Modify Product
          </button>
        </div>
        <div className="admin-order">
          <button id="admin-order-button" onClick={toggleOrderPage}>
            Manage Orders
          </button>
        </div>
        <div className="admin-cancel-order">
          <button id="admin-cancel-order-button" onClick={toggleCanceledOrders}>
            Cancelled Orders
          </button>
        </div>
        <div className="admin-logout">
          <button id="admin-logout-button" onClick={logoutOperation}>
            Logout
          </button>
        </div>
      </nav>
      <main>
        {showForm && (
          <ProductForm
            product={newProduct}
            onChange={handleInputChange}
            onMainImageChange={handleMainImageChange}
            onSubmit={handleAddProduct}
            isEditing={isEditing}
            message={message}
          />
        )}
        {showModifyList && (
          <div className="admin-product-list">
            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products.map((product, index) => (
                <div key={index} className="admin-product-card">
                  <img  id="admin-product-card-image"
                    src={`data:image/jpeg;base64,${product.main_image}`}
                    alt={product.title}
                  />
                  <h3 id="card-title">{product.title}</h3>
                  <p id="card-category">Category: {product.category}</p>
                  <p id="card-price">Price: Rs{product.price}</p>
                  <p id="card-description">Description: {product.description}</p>
                  <button  id="admin-card-button" onClick={() => handleEditProduct(index)}>
                    Update
                  </button>
                  <button id="admin-card-delete" onClick={() => handleDelete(index)}>Delete</button>
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
