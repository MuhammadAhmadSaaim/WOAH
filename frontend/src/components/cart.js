import React, { useState, useEffect } from 'react';
import './css/cart.css';
import CartItem from './cartItem';

const Cart = () => {
  const authToken = localStorage.getItem('authToken');
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const [carttwo, setCarttwo] = useState([]);
  const [errortwo, setErrortwo] = useState('');
  const [name, setName] = useState('User');

  useEffect(() => {
    fetchData();
    fetchAllCart();
    fetchName();
  }, []);

  const fetchName=async()=>{
    const response = await fetch(`${window.location.origin}/carttwo/name`, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      });
      const data = await response.json();
      setName(data);
  }
  const fetchData = async () => {
    try {
      const response = await fetch(`${window.location.origin}/create/cart`, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      });

      if (response.status === 404) {
        setError('No items found in the cart.');
        setCart([]);
        return;
      }

      const data = await response.json();
      console.log(data);
      if (Array.isArray(data) && data.length === 0) {
        setError('Your cart is empty.');
        setCart([]);
      } else {
        setCart(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('An error occurred while fetching the cart. Please try again later.');
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
        setErrortwo('No items found in the cart.');
        setCarttwo([]);
        return;
      }

      const data = await response.json();
      console.log(data);
      if (Array.isArray(data) && data.length === 0) {
        setErrortwo('Your cart is empty.');
        setCarttwo([]);
      } else {
        setCarttwo(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setErrortwo('An error occurred while fetching the cart. Please try again later.');
    }
  };

  return (
    <>
      <div className="cart_main">
        <div className="text" style={{ color: '#002142' }}>
          Hello {name}
        </div>
      </div>
      <div className="container">
        <hr />
      </div>
      {error ? (
        <div className="text-center mt-4">
          <h3>{error}</h3> {/* Display the error message */}
        </div>
      ) : (
        cart.map((element, index) => (
          <div key={index} className="container d-flex flex-column justify-content-center align-items-center">
            <CartItem pay={true} userId={element.userId} itemId={element.itemId} name={element.itemName} bidder={element.highestBidder} price={element.highestBid} bidActive={element.bidActive} />
          </div>
        ))
      )}
      <div className="container">
        <hr />
      </div>
      {errortwo?(
        <div className="text-center mt-4">
        <h3>{error}</h3> {/* Display the error message */}
      </div>
      ):
      (carttwo.map((element,index)=>(
        <div key={index} className="container d-flex flex-column justify-content-center align-items-center">
        <CartItem pay={false} name={element.name} price={element.amount} />
      </div>
      ))
    )}
    </>
  );
};

export default Cart;
