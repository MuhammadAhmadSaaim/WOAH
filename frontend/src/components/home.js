import React from 'react';
import './css/home.css';
import myImage from './bid.png'; 
import Footer from './footer';
import { useNavigate  } from 'react-router-dom';

const Home = () => {
    const navigate=useNavigate();
    const toShop=()=>{
        navigate('/shop');
    }
  return (
    <>
        <div className="container">
            <span className="woah" >WOAH Auction Site</span>
        </div>
        <div className="container-fluid sec">
            <div>
                <img className="image" src={myImage}/>
            </div>
            <div className='outerhome' >
                <h1 className='innerhome'>Bidding</h1>
                <span className='textofspan'>To list an item for bidding, first ensure you have an account. If you don't, register on our website. If you already have an account, log in and navigate to the "Shop" page. There, click on "Sell an Item" to begin the process. Follow the on-screen instructions to add your item's information, including its name, description, and starting bid price. Once you've filled in all the details, submit your item. After that, your item will be listed for bidding.</span><br/>
                <button className='shopbtn mt-2' onClick={toShop}>Shop</button>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Home