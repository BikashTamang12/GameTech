import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";

function ModifyProduct({ products, setProducts, match }) {
  const [product, setProduct] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const productId = match.params.id;

  useEffect(() => {
    const productToEdit = products.find(
      (p) => p.product_id === parseInt(productId)
    );
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [products, productId]);

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
    }
  };

  const validateForm = () => {
    if (
      !product.title ||
      !product.image ||
      !product.category ||
      !product.price ||
      !product.description
    ) {
      setMessage("Please fill out all fields.");
      setTimeout(() => setMessage(""), 2000);
      return false;
    }
    return true;
  };

  // Define fetchProducts to get the updated list of products
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost/backend/api/getProducts.php"
      );
      const result = await response.json();
      return result.products; // assuming the API returns products in an array
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const handleEditProduct = async () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("product_id", product.product_id);
      formData.append("title", product.title);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("description", product.description);

      if (product.image) {
        formData.append("main_image", product.image);
      }

      try {
        const response = await fetch(
          "http://localhost/backend/api/editProduct.php",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        if (result.message) {
          setMessage(result.message);
          setTimeout(() => setMessage(""), 2000);

          // Fetch updated product list and update state
          const updatedProducts = await fetchProducts();
          setProducts(updatedProducts);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <ProductForm
        product={product}
        onChange={handleInputChange}
        onMainImageChange={handleMainImageChange}
        onSubmit={handleEditProduct}
        message={message}
      />
    </div>
  );
}

export default ModifyProduct;
