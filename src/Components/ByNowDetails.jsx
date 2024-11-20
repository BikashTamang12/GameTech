import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ByNowDetails.css";

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
    <div className="mainbody">
      <fieldset className="revieverfeildset">
        <div id="headingbuy">
          <p id="headingbuy1">Provide The Receiver Details</p>
        </div>

        {/* Product Details */}
        <div className="productDetails">
          <div className="productimage786">
            <img src={mainImage} alt={title} className="productImage" />
          </div>
          <h2>{title}</h2>
          <p>Price per unit: Rs. {price}</p>
          <p>Total Price: Rs. {reciever.totalPrice}</p>
        </div>

        {/* Receiver Details */}
        <div className="recievername">
          {error.message && (
            <span className="error-message">{error.message}</span>
          )}
          <label htmlFor="recievername1" id="recievername1">
            Receiver Name
          </label>
          <input
            type="text"
            id="recievername2"
            name="recievername"
            value={reciever.recievername}
            onChange={handleChange}
          />
        </div>

        <div className="recieverphone">
          <label htmlFor="recieverphone1" id="recieverphone1">
            Phone
          </label>
          <input
            type="phone"
            id="recieverphone2"
            name="recieverphone"
            value={reciever.recieverphone}
            onChange={handleChange}
          />
        </div>

        <div className="recieveraddress">
          <label htmlFor="recieveraddress" id="recieveraddress1">
            Address
          </label>
          <input
            type="text"
            id="recieveraddress2"
            name="recieveraddress"
            value={reciever.recieveraddress}
            onChange={handleChange}
          />
        </div>

        {/* Quantity */}
        <div className="quantity">
          <label htmlFor="quantity" id="quantitylabel">
            Quantity
          </label>
          <input
            type="number"
            id="quantityinput"
            name="quantity"
            value={reciever.quantity}
            min="1"
            max="5"
            onChange={handleChange}
          />
        </div>

        {/* Payment Mode */}
        <div className="paymentMode">
          <label htmlFor="paymentMode" id="paymentModelabel">
            Payment Mode
          </label>
          <select
            id="paymentModeSelect"
            name="paymentMode"
            value={reciever.paymentMode}
            onChange={handleChange}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="submitOrder">
          <button id="submitOrderBtn" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default ByNowDetails;
