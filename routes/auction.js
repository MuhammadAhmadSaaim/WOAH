const express=require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Bid=require('../models/bid');
const Item = require("../models/item");
const User = require("../models/user");

//place a bid
router.post("/bidding", fetchUser, async (req, res) => {
    const { name,price,description, amount } = req.body;
  
    try {
      // Fetch the item by itemId
      const item = await Item.findOne({
        name: name,
        price: price,
        description: description,
      });
      if (!item) {
        return res.status(404).json({ error: "Item not found." }); // Item not found
      }
      // Check if the bid amount is greater than the item's price
      if (amount <= item.price) {
        return res
          .status(400)
          .json({ error: "Bid amount must be greater than the current item price." });
      }
  
      // If the bid amount is valid, create the new bid
      const newBid = await Bid.create({
        userId: req.user.id,
        itemId: item.id,
        amount: amount,
      });
      res.status(201).json(newBid); // Bid placed successfully
    } catch (err) {
      console.error("Error placing bid:", err);
      res.status(500).json({ error: "Internal server error." });
    }
});

//find highest bid

router.post("/highestBidder", async (req, res) => {
  const { name,price,description } = req.body;
  //finding the item yo
  const item = await Item.findOne({
    name: name,
    price: price,
    description: description,
  });
  
  const itemId=item.id;

  try {
    
    const highestBid = await Bid.findOne({ itemId }).sort({ amount: -1 });

    if (!highestBid) {
      return res.status(404).json({ error: "No bids found for this item." });
    }

    // Find the user who placed the highest bid
    const highestBidder = await User.findById(highestBid.userId);

    if (!highestBidder) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ highestBidderId:highestBid.userId,highestBidder: highestBidder.name,amount:highestBid.amount });
  } catch (err) {
    console.error("Error fetching highest bidder:", err); // Log the error
    res.status(500).json({ error: "Internal server error." }); // Return 500 for unexpected errors
  }
});
  

module.exports = router;