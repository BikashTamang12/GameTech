import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../Components_CSS/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [updatedQuantity, setUpdatedQuantity] = useState(null);
  const [selectedCartId, setSelectedCartId] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login",{state:{from:"/cart"}});
      return;
    }
  
    const customerId = localStorage.getItem("customerId");
  
    const fetchCartDetails = async () => {
      try {
        // Prepare the request body
        const formData = new FormData();
        formData.append("id", customerId);
  
        // Fetch cart details from the backend
        const response = await fetch("http://localhost/backend/api/getCartItem.php", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
  
        if (data.success) {
          setCartItems(data.items || []);
           
        } else {
          alert(data.message || "Failed to fetch cart items.");
        }
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };
  
    fetchCartDetails();
  }, [isAuthenticated, navigate]);
  

  const handleQuantityChange = (cart_id, action, event) => {
    event.stopPropagation();
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cart_id === cart_id
          ? {
              ...item,
              quantity:
                action === "increment"
                  ? Math.min(item.quantity + 1, 5)
                  : Math.max(item.quantity - 1, 0),
            }
          : item
      )
    );
    setUpdatedQuantity(cart_id);
    setSelectedCartId(cart_id);
  };

  const handleConfirmUpdate = (cart_id, updatedQuantity, event) => {
    event.stopPropagation();

    fetch("http://localhost/backend/api/UpdateCardItem.php", {
      method: "POST",
      body: new URLSearchParams({
        cart_id: cart_id,
        quantity: updatedQuantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Quantity updated successfully");
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item.cart_id === cart_id
                ? { ...item, quantity: updatedQuantity }
                : item
            )
          );
        } else {
          alert("Failed to update quantity");
        }
      })
      .catch((error) => console.error("Error updating cart item:", error));
  };

  const handleDelete = (cart_id, event) => {
    event.stopPropagation();

    fetch("http://localhost/backend/api/DeleteCartItem.php", {
      method: "POST",
      body: new URLSearchParams({ cart_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.cart_id !== cart_id)
          );
          alert("Item deleted successfully");
        } else {
          alert("Failed to delete item");
        }
      })
      .catch((error) => console.error("Error deleting cart item:", error));
  };

  const goToProductDetails = (product_id, event) => {
    event.stopPropagation();
    navigate(`/product-details/${product_id}`);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.cart_id}
              className="cart-item"
              onClick={(e) => goToProductDetails(item.product_id, e)}
            >
              <img
                src={`data:image/jpeg;base64,${item.main_image}`}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: Rs.{item.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={(e) =>
                      handleQuantityChange(item.cart_id, "decrement", e)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={(e) =>
                      handleQuantityChange(item.cart_id, "increment", e)
                    }
                  >
                    +
                  </button>

                  {updatedQuantity === item.cart_id && (
                    <button
                      className="confirm-button"
                      onClick={(e) =>
                        handleConfirmUpdate(item.cart_id, item.quantity, e)
                      }
                    >
                      Confirm
                    </button>
                  )}
                </div>
                <button
                  className="delete-button"
                  onClick={(e) => handleDelete(item.cart_id, e)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
