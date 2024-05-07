import React, { useState, useEffect } from 'react';
import './css/cart.css';
import CartItem from './cartItem';

const Cart = () => {
  const authToken = localStorage.getItem('authToken');
  const [cart, setCart] = useState([]);
  const [cartError, setCartError] = useState('');
  const [cartTwo, setCartTwo] = useState([]);
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

      if (response.status === 404) {
        setCartError('No items found in the cart.');
        setCart([]);
      } else {
        const data = await response.json();
        if (data.length === 0) {
          setCartError('No items found in the cart.');
          setCart([]);
        } else {
          setCart(data);
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartError('An error occurred while fetching the cart. Please try again later.');
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

      if (response.status === 404) {
        setCartTwoError('No items found in the cart.');
        setCartTwo([]);
      } else {
        const data = await response.json();
        if (data.length === 0) {
          setCartTwoError('No items found in the cart.');
          setCartTwo([]);
        } else {
          setCartTwo(data);
        }
      }
    } catch (error) {
      console.error('Error fetching all carts:', error);
      setCartTwoError('An error occurred while fetching all carts. Please try again later.');
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
      ) : cart.length === 0 ? (
        <div className="text-center mt-4">
          <h3>No items found in the cart.</h3> {/* Display when no items */}
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
      ) : cartTwo.length === 0 ? (
        <div className="text-center mt-4">
          <h3>No items found in the second cart.</h3> {/* Display when no items */}
        </div>
      ) : (
        cartTwo.map((item, index) => (
          <div key={index} className="container d-flex flex-column justify-content-center align-items-center">
            <CartItem pay={false} name={item.name} price={item.amount} />
          </div>
        ))
      )}
    </>
  );
};

export default Cart;
