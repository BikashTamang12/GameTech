import React, { useEffect, useState } from 'react';
import '../Components_CSS/CanceldOrders.css';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate } from 'react-router-dom';

const CanceledOrders = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [orders, setOrders] = useState([]);
const navigate=useNavigate();

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

  const backhome= () =>{
 navigate('/adminPage');
  }


  return (
    <div className="order-manage">

<div id='arrow1'>
  
<ArrowCircleLeftIcon
        id="arrow"
        onClick={backhome}
        onMouseEnter={() => setIsHovered(true)} // Show text on hover
        onMouseLeave={() => setIsHovered(false)} // Hide text when not hovering
        style={{ cursor: "pointer", color: isHovered ? "blue" : "black" }} // Optional styling
      />
      <div className='backnav'>
      <p id="jj" style={{ visibility: isHovered ? "visible" : "hidden" }}>
        Back to dashboard
      </p>
      </div>

      <h2 id='j'>Orders Canceled List</h2>

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
