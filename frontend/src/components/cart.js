import React, { useState, useEffect } from 'react';
import './css/cart.css';
import CartItem from './cartItem';

const Cart = () => {
  const authToken = localStorage.getItem('authToken');
  const [cart, setCart] = useState([]); // Ensures it's always initialized as an array
  const [cartError, setCartError] = useState('');
  const [cartTwo, setCartTwo] = useState([]); // Ensures it's always initialized as an array
  const [cartTwoError, setCartTwoError] = useState('');
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    fetchCart();
    fetchAllCart();
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${window.location.origin}/carttwo/name`, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user name.');
      }

      const data = await response.json();
      setUserName(data.name || 'User');
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch(`${window.location.origin}/create/cart`, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      });
      if (!response.ok) { // Handle other non-200 statuses
        setCartError('No item Found');
        setCart([]); // Ensure it's an empty array
      } else {
        const data = await response.json();
        if (Array.isArray(data)) {
          setCart(data);
        } else {
          setCartError('Invalid cart data.');
          setCart([]); // Ensure it's an empty array
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartError('An error occurred while fetching the cart. Please try again later.');
      setCart([]); // Ensure it's an empty array
    }
  };

  const fetchAllCart = async () => {
    try {
      const response = await fetch(`${window.location.origin}/carttwo/allcart`, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      });

      if (!response.ok) {
        setCartTwoError('No Item Found');
        setCartTwo([]); // Ensure it's an empty array
      } else {
        const data = await response.json();
        if (Array.isArray(data)) {
          setCartTwo(data);
        } else {
          setCartTwoError('Invalid data for all carts.');
          setCartTwo([]); // Ensure it's an empty array
        }
      }
    } catch (error) {
      console.error('Error fetching all carts:', error);
      setCartTwoError('An error occurred while fetching all carts. Please try again later.');
      setCartTwo([]); // Ensure it's an empty array
    }
  };

  return (
    <>
      <div className="cart_main">
        <div className="text" style={{ color: '#002142' }}>
          Hello {userName}
        </div>
      </div>
      <div className="container">
        <hr />
      </div>
      {cartError ? (
        <div className="text-center mt-4">
          <h3>{cartError}</h3> {/* Display the error message */}
        </div>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="container d-flex flex-column justify-content-center align-items-center">
            <CartItem
              pay={true}
              userId={item.userId}
              itemId={item.itemId}
              name={item.itemName}
              bidder={item.highestBidder}
              price={item.highestBid}
              bidActive={item.bidActive}
            />
          </div>
        ))
      )}

      <div className="container">
        <hr />
      </div>
      {cartTwoError ? (
        <div className="text-center mt-4">
          <h3>{cartTwoError}</h3> {/* Display the error message */}
        </div>
      ) : (
        cartTwo.map((item, index) => (
          <div key={index} className="container d-flex flex-column justify-content-center align-items-center">
            <CartItem
              pay={false}
              name={item.name}
              price={item.amount}
            />
          </div>
        ))
      )}
    </>
  );
};

export default Cart;
