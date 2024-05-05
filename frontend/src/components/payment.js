import React from 'react';
import './css/payment.css';

const Payment = () => {
  return (
    <div className="payment-container">
      <h2 className="payment-title">Secure Checkout</h2>
      <form className="payment-form">
        <div className="input-group">
          <label htmlFor="cardholder-name" className="input-label">
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardholder-name"
            className="input-field"
            placeholder="John Doe"
          />
        </div>

        <div className="input-group">
          <label htmlFor="card-number" className="input-label">
            Card Number
          </label>
          <input
            type="text"
            id="card-number"
            className="input-field"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="input-group">
          <label htmlFor="expiry-date" className="input-label">
            Expiry Date (MM/YY) / CVV
          </label>
          <div className="split">
            <input
              type="text"
              id="expiry-date"
              className="input-field"
              placeholder="MM/YY"
            />
            <input
              type="text"
              id="cvv"
              className="input-field"
              placeholder="CVV"
            />
          </div>
        </div>

        <button className="checkout-button">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Payment;
