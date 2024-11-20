import React, { useState, useEffect } from "react";
import "./UserAdmin.css";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";

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
      } else {
        setMessage("Please upload a main image.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost/backend/api/addProduct.php",
          {
            method: "POST",
            body: formData,
          }
        );
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditProduct = (index) => {
    setNewProduct({
      ...products[index],
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
      !newProduct.image ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.description
    ) {
      setMessage("Please fill out all fields.");
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
    <div className="UserAdmin">
      <nav className="sidebar">
        <div className="addBut1">
          <button id="addBut" onClick={toggleAddForm}>
            Add Product
          </button>
        </div>
        <div className="modBut1">
          <button id="modBut" onClick={handleShowModify}>
            Modify Product
          </button>
        </div>
        <div className="orderManage">
          <button id="orderBut" onClick={toggleOrderPage}>
            Manage Orders
          </button>
        </div>
        <div className="canceledodredrs">
          <button id="cancelorder" onClick={toggleCanceledOrders}>
            Cancelled Orders
          </button>
        </div>
        <div className="logBut1">
          <button id="logBut" onClick={logoutOperation}>
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
          <div className="product-list">
            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products.map((product, index) => (
                <div key={index} className="product-card">
                  <img
                    src={`data:image/jpeg;base64,${product.main_image}`}
                    alt={product.title}
                  />
                  <h3>{product.title}</h3>
                  <p>Category: {product.category}</p>
                  <p>Price: Rs{product.price}</p>
                  <p>Description: {product.description}</p>
                  <button onClick={() => handleEditProduct(index)}>
                    Update
                  </button>
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
