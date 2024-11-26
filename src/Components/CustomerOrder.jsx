import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Components_CSS/CustomerOrder.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const CustomerOrder = () => {
  const [orders, setOrders] = useState([]); 
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();








  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login",{state:{from:"/customerorder"}});
      return;
    }
  
    const customerId = localStorage.getItem("customerId");
  
    const fetchCartDetails = async () => {
      try {
        // Prepare the request body
        const formData = new FormData();
        formData.append("id", customerId);
  
        // Fetch cart details from the backend
        const response = await fetch("http://localhost/backend/api/fetchorderCustomer.php", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
  
        if (data.success) {
          setOrders(data.orders || []); // Assume the API returns an "items" array
        } else {
          alert(data.message || "Failed to fetch cart items.");
        }
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };
  
    fetchCartDetails();
  }, [isAuthenticated, navigate]);





/*
  useEffect(() => {
   if(!isAuthenticated){
    navigate("/login");
   }else{
    
    axios
      .get("http://localhost/backend/api/fetchorderCustomer.php")
      .then((response) => {
        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setOrders(response.data); // Set the orders data
        } else {
          console.error("Expected array, but received:", response.data);
          setOrders([]); // Set an empty array in case of unexpected data
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]); // Handle error gracefully by setting empty array
      });
    }
  }, [isAuthenticated,navigate]);
*/







  const cancelOrder = (order_id) => {
    // Send the cancellation request to the backend
    axios
      .post("http://localhost/backend/api/addorderStatusCustomer.php", {
        order_id: order_id,
      })
      .then((response) => {
        if (response.data.success) {
          alert("Order has been canceled.");
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.order_id === order_id
                ? { ...order, customer_status: "Canceled" }
                : order
            )
          );
        } else {
          alert("Failed to cancel the order.");
        }
      })
      .catch((error) => {
        console.error("Error canceling the order:", error);
      });
  };

  if (orders.length === 0) {
    return <div className="empty-message">Your orders are empty.</div>; // Display message when there are no orders
  }

  return (
    <div className="orders-page">
      <h1>Order Details</h1>
      {orders.map((order) => {
        // Determine the order status
        let orderStatus = order.delivery_date; // The backend has already handled the delivery date logic

        return (
          <div key={order.order_id} className="order-details">
           <div id="image-order">
            <img id='im'
              src={`data:image/jpeg;base64,${order.main_image}`}
              alt={order.title}
            />
            </div>
            <div className="order-info">
              <h2>{order.title}</h2>
              <p>
                <strong>Price:</strong> Rs.{order.price}
              </p>
              <p>
                <strong>Order Status:</strong> {orderStatus}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Delivery Date:</strong>{" "}
                {orderStatus === "Canceled" ? "Canceled" : order.delivery_date}
              </p>
            </div>

            {/* Show the Cancel Order button only if the order's delivery date is not 'Canceled' */}
            {orderStatus !== "Canceled" && (
              <button onClick={() => cancelOrder(order.order_id)}>
                Cancel Order
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CustomerOrder;
