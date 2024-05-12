import React, { useState, useEffect } from 'react';
import './css/profile.css';

const Profile = () => {
  const authToken = localStorage.getItem('authToken');
  const [items, setItems] = useState([]);
  const [itemsBought, setItemsBought] = useState([]);
  const [userName, setUserName] = useState('User');
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [selectedItemForFeedback, setSelectedItemForFeedback] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    fetchUserName();
    fetchItems();
    fetchItemsBought();
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

  const fetchItems = async () => {
    try {
      const response = await fetch(`${window.location.origin}/create/cart`, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch items.');
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchItemsBought = async () => {
    try {
      const response = await fetch(`${window.location.origin}/carttwo/allcart`, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch items bought.');
      }

      const data = await response.json();
      setItemsBought(data);
    } catch (error) {
      console.error('Error fetching items bought:', error);
    }
  };

  const stopBid = async (itemId) => {
    try {
      const response = await fetch(`${window.location.origin}/auction/stop/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to stop bid for the item.');
      }

      // Refresh items after stopping bid
      fetchItems();
      fetchItemsBought(); // Refresh items bought as well
    } catch (error) {
      console.error('Error stopping bid:', error);
    }
  };

  const openFeedbackModal = (item) => {
    setSelectedItemForFeedback(item);
    setFeedbackModalVisible(true);
  };

  const submitFeedback = () => {
    // Here you can handle the submission of feedback
    console.log("Feedback submitted:", feedbackText);
    setFeedbackModalVisible(false);
    // You can send the feedback to the server here if needed
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Hi {userName},</h2>
        <p>Welcome to your profile page.</p>
      </div>
      <div className="profile-section">
        <h3>Items Auctioned:</h3>
        {items.length > 0 ? (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <p>{item.itemName}</p>
                <p>Highest Bidder: {item.highestBidder}</p>
                <p>Highest Bid: Rs. {item.highestBid}</p>
                {item.biddingStopped ? (
                  <p>Bidding stopped</p>
                ) : (
                  <button className="stopBidBtn" onClick={() => stopBid(item.itemId)}>Stop Bid</button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items auctioned yet.</p>
        )}
      </div>
      <div className="profile-section">
        <h3>Items Bought:</h3>
        {itemsBought.length > 0 ? (
          <ul>
            {itemsBought.map((item, index) => (
              <li key={index}>
                <p>{item.name}</p>
                <p>Amount: Rs. {item.amount}</p>
                <button onClick={() => openFeedbackModal(item)}>Give Feedback</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items bought yet.</p>
        )}
      </div>

      {feedbackModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setFeedbackModalVisible(false)}>&times;</span>
            <h2>Feedback</h2>
            <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Enter your feedback"></textarea>
            <button onClick={submitFeedback}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
