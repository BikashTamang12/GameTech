import React, { useState, useEffect } from "react";
import "../Components_CSS/OrderManagementPage.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate } from 'react-router-dom';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  // Get today's date in the required format for the input (yyyy-mm-dd)
  const today = new Date().toISOString().split("T")[0];
  const navigate=useNavigate();
  // Fetch orders data from backend
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost/backend/api/FetchOrders.php"
      ); // Replace with your backend endpoint
      const data = await response.json();
      console.log(data);
      setOrders(data.filter((order) => order.status !== "Cancelled")); // Filter out canceled orders from the frontend
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  // UseEffect to fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  
  const backhome= () =>{
    navigate('/adminPage');
     }
   
  // Handle cancel order
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost/backend/api/cancelOrder.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        }
      );

      if (response.ok) {
        setOrders(orders.filter((order) => order.order_id !== orderId));
        alert("Order cancelled sucessfully");
      } else {
        console.error("Error canceling the order");
      }
    } catch (error) {
      console.error("Error canceling order: ", error);
    }
  };

  // Handle delivery date change
  const handleDeliveryDateChange = async (orderId, newDate) => {
    if (new Date(newDate) < new Date(today)) {
      alert("Delivery date must be today or in the future.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/backend/api/deliverydate.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, newDate }),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        // Fetch updated orders after successful update
        fetchOrders();
        alert("Sucessfully delivery date provided");
      } else {
        alert(result.message); // Show error message if update fails
      }
    } catch (error) {
      console.error("Error updating delivery date: ", error);
      alert("Failed to update delivery date.");
    }
  };

  return (
    <div className="order-manage">

<div id='arrow2'>
  
  <ArrowCircleLeftIcon
          id="arrowm"
          onClick={backhome}
          onMouseEnter={() => setIsHovered(true)} // Show text on hover
          onMouseLeave={() => setIsHovered(false)} // Hide text when not hovering
          style={{ cursor: "pointer", color: isHovered ? "blue" : "black" }} // Optional styling
        />
        <p id='jj2' style={{ visibility: isHovered ? "visible" : "hidden" }}>
          Back to dashboard
        </p>
      <h2  style={{paddingRight:"590px"}}>Order Management</h2>
      </div>

      {/* Table to display orders */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Main Image</th>
            <th>Price</th>
            <th>Receiver Name</th>
            <th>Receiver Phone</th>
            <th>Receiver Address</th>
            <th>Quantity</th>
            <th>Payment Mode</th>
            <th>Status</th>
            <th>Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each order */}
          {orders.map((order) => (
            <tr key={order.order_id}>
              {" "}
              {/* You can use order_id for a unique key */}
              <td>{order.title}</td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${order.main_image}`}
                  alt={order.title}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{order.price}</td>
              <td>{order.recievername}</td>
              <td>{order.recieverphone}</td>
              <td>{order.recieveraddress}</td>
              <td>{order.quantity}</td>
              <td>{order.paymentMode}</td>
              {/* Status field with Cancel button */}
              <td>
                <span>{order.status}</span>
                {order.status !== "Cancelled" && (
                  <button onClick={() => handleCancelOrder(order.order_id)}>
                    Cancel Order
                  </button>
                )}
              </td>
              {/* Delivery Date field with input to change date */}
              <td>
                <input
                  type="date"
                  value={order.delivery_date || ""}
                  onChange={(e) =>
                    handleDeliveryDateChange(order.order_id, e.target.value)
                  }
                  min={today} // Setting today's date as the minimum allowed date
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagementPage;
