import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Product from './components/product';
import Login from './components/login';
import CreateItem from './components/createItem';
import Profile from './components/profile'; 
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Cart from './components/cart';
import Payment from './components/payment';

const App = () => {
  return (
    <>
      
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/shop" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/item" element={<CreateItem />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
