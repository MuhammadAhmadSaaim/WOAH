import React, { useState,useEffect } from 'react';
import './css/card.css';
import { redirect, useNavigate } from "react-router-dom";

const Card = ({ name, price, description, image,bidActive }) => {
  const [amount,setAmount]=useState();
  const [bidder,setBidder]=useState("");
  const [bid,setBid]=useState();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open and close the modal
  const openModal = () => {
    if (authToken == null) {
      navigate('/login');
    } else {
      if(bidActive){
        setIsModalOpen(true);
      }
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //placing bid
  const handlebid=async()=>{
    const response=await fetch('http://localhost:5000/bid/bidding',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token':authToken,
        },
        body: JSON.stringify({ name:name,price:price, description:description,amount:amount }),
      });
      const data=await response.json();
      console.log(data);
      closeModal();
      window.location.reload();
  }
  //getting highest bidder
  useEffect(() => {
    highestBidder(); 
  }, []);

  const highestBidder=async()=>{
    const response=await fetch('http://localhost:5000/bid/highestBidder',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name:name,price:price, description:description }),
    });
    const data=await response.json();
    setBidder(data.highestBidder);
    setBid(data.amount);
  }

  return (
    <>
      <div className="cardproduct my-3">
          <img className="card-img" src={`/images/${image}`} alt="Card Image" />
        <div className="card-info">
          <p className="text-title">{name.length > 15 ? name.substring(0, 12) : name}</p>
          <p className="text-body">{description.length > 20 ? description.substring(0, 20) : description}</p>
        </div>
        <div className="card-footer">
        <span className="text-title">Rs.{price}</span>
        <div className="card-button" onClick={openModal}>
          <svg className="svg-icon" viewBox="0 0 20 20">
            <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
            <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
            <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
          </svg>
        </div>
      </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="custom-modal" onClick={closeModal} style={{ zIndex: 1 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Place Your Bid</h2>
            <h5>{name}</h5>
            <input
              className="modal_input"
              type="number"
              placeholder={`Minimum bid: Rs ${price+1}`}
              min={price+1} 
              onChange={(e)=>{setAmount(e.target.value)}}
              required
            />
            <p className='my-2'>Highest bidder: <span style={{ color: "red" }}>{bidder}</span></p>
            <p>Amount: <span style={{ color: "red" }}>Rs.{bid}</span></p>
            <div className="my-3">
              <button className="modal_btn mx-2" onClick={handlebid}>Place Bid</button>
              <button className="modal_btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
