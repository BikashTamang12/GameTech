import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../Components_CSS/ByNowDetails.css';
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaymentIcon from '@mui/icons-material/Payment';

const ByNowDetails = () => {
  const location = useLocation();

  const { product_id, title, price, main_image } = location.state.product || {};
  
  const navigate = useNavigate();
 
  
  
  

  const [reciever, setReciever] = useState({
    recievername: "",
    recieverphone: "",
    recieveraddress: "",
    quantity: 1, // Default quantity
    paymentMode: "Cash on Delivery", // Default payment mode
    totalPrice: price, // Set default total price based on product price
  });

  const [error, setErrors] = useState({});

  // Update total price whenever quantity changes
  useEffect(() => {
    setReciever((prevState) => ({
      ...prevState,
      totalPrice: price * prevState.quantity,
    }));
  }, [reciever.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReciever({
      ...reciever,
      [name]: name === "quantity" ? Math.max(1, parseInt(value)) || 1 : value,
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (
      !reciever.recievername ||
      !/^[A-Za-z\s]+$/.test(reciever.recievername)
    ) {
      setErrors({ message: "Please provide a valid name." });
      return;
    }
    if (!reciever.recieverphone || !/^\d{10}$/.test(reciever.recieverphone)) {
      setErrors({ message: "Please provide a valid 10-digit phone number." });
      return;
    }
    if (!reciever.recieveraddress) {
      setErrors({ message: "Address is required." });
      return;
    }
    const customerId = localStorage.getItem("customerId");

    // Prepare order data
    const orderData = {
      product_id,
      title,
      price: reciever.totalPrice, // Send total price to backend
      quantity: reciever.quantity,
      main_image, // Pass base64 image directly
      recievername: reciever.recievername,
      recieverphone: reciever.recieverphone,
      recieveraddress: reciever.recieveraddress,
      paymentMode: reciever.paymentMode,
      custId: customerId
    };

    try {
      // Send data to the backend
      const response = await fetch(
        "http://localhost/backend/api/PlaceOreder.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        alert("Order successfully placed!");
        navigate("/");
      } else {
        setErrors({ message: result.message || "Failed to place order." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({
        message:
          "An error occurred while placing your order. Please try again.",
      });
    }
  };

 const mainImage = `data:image/jpeg;base64,${main_image}`;

  return (
    <div className="buy-details-page">
       
      <fieldset className="buy-customer-details">
      <div className="reciever-location">
    
        <div id="buy-heading">
          <p id="heading-buy1">Provide The Receiver Details</p>
        </div>

        {/* Product Details */}
        
          <div className="reciever-productimage">
            <img src={mainImage} alt={title} id="product-buy-image" />
          </div>
          <div className="a">
          <p className="reciever-product-title">{title}</p>
          <p id="reciver-product-price">Price per unit: Rs. {price}</p>
          <p id="reciver-product-total-price">Total Price: Rs. {reciever.totalPrice}</p>
       
</div>
{error.message && (
            <span className="reciever-error-message">{error.message}</span>
          )}
        {/* Receiver Details */}
        <div className="reciever-name">
          <PersonIcon></PersonIcon>
        
        
          <input
            type="text"
            id="reciever-name-input"
            name="recievername"
            value={reciever.recievername}
            onChange={handleChange}
            placeholder="Enter reciever name"
          />
        </div>

        <div className="reciever-phone">
         <ContactPhoneIcon></ContactPhoneIcon>
          <input
            type="phone"
            id="reciever-phone-input"
            name="recieverphone"
            value={reciever.recieverphone}
            onChange={handleChange}
            placeholder="Enter the reciever phone"
          />
        </div>

        <div className="reciever-address">
         <HomeIcon></HomeIcon>
          <input
            type="text"
            id="reciever-address-input"
            name="recieveraddress"
            value={reciever.recieveraddress}
            onChange={handleChange}
            placeholder="Enter the reciever address"
          />
        </div>

        {/* Quantity */}
        <div className="reciever-quantity">
         <ProductionQuantityLimitsIcon></ProductionQuantityLimitsIcon>
          <input
            type="number"
            id="reciever-quantity-input"
            name="quantity"
            value={reciever.quantity}
            min="1"
            max="5"
            onChange={handleChange}
          />
        </div>

        {/* Payment Mode */}
        <div className="reciever-paymentMode">
         <PaymentIcon></PaymentIcon>
          <select
            id="reciever-payment-ModeSelect"
            name="paymentMode"
            value={reciever.paymentMode}
            onChange={handleChange}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="submit-Order">
          <button id="submit-Order-Button" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
        </div>
      </fieldset>
    
    </div>
  );
};

export default ByNowDetails;
