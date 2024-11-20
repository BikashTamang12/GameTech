import React, { useEffect, useState } from 'react';
import './CanceldOrders.css';

const CanceledOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders data from backend
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost/backend/api/fetchCanceledOders.php"); // Replace with your backend endpoint
      const data = await response.json();
      console.log(data);
      setOrders(data.filter(order => order.customer_status === 'Canceled')); // Only fetch canceled orders
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  // UseEffect to fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-manage">
      <h2>Orders Canceled List</h2>
      
      {/* Table to display orders */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Main Image</th>
            <th>Price</th>
            <th>Receiver Name</th>
            <th>Receiver Phone</th>
            <th>Customer Status</th> {/* Moved to last */}
          </tr>
        </thead>
        <tbody>
          {/* Render each order */}
          {orders.map(order => (
            <tr key={order.order_id}> {/* Use order_id for a unique key */}
              <td>{order.title}</td>
              <td>
                <img 
                  src={`data:image/jpeg;base64,${order.main_image}`} 
                  alt={order.title} 
                  style={{ width: '50px', height: '50px' }} 
                />
              </td>
              <td>{order.price}</td>
              <td>{order.recievername}</td> {/* Display receiver name */}
              <td>{order.recieverphone}</td> {/* Display receiver phone */}
              <td className="customer-status">{order.customer_status}</td> {/* Moved to last */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CanceledOrders;
