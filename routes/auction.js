const express=require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Bid=require('../models/bid');
const Item = require("../models/item");
const User = require("../models/user");

//place a bid
router.post("/bidding", fetchUser, async (req, res) => {
    const { itemId, amount } = req.body;
  
    try {
      // Fetch the item by itemId
      const item = await Item.findById(itemId);
  
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
        itemId: itemId,
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
  const { itemId } = req.body; // Extract itemId from the request body
  
  if (!itemId) {
    return res.status(400).json({ error: "ItemId is required." }); // Return 400 if itemId is not provided
  }

  try {
    // Find the highest bid for the given item
    const highestBid = await Bid.findOne({ itemId }).sort({ amount: -1 });

    if (!highestBid) {
      return res.status(404).json({ error: "No bids found for this item." }); // Return 404 if no bids are found
    }

    // Find the user who placed the highest bid
    const highestBidder = await User.findById(highestBid.userId);

    if (!highestBidder) {
      return res.status(404).json({ error: "User not found." }); // Return 404 if the user is not found
    }

    // Return the highest bidder's name or other relevant details
    res.json({ highestBidder: highestBidder.name }); // Adjust to return relevant user information
  } catch (err) {
    console.error("Error fetching highest bidder:", err); // Log the error
    res.status(500).json({ error: "Internal server error." }); // Return 500 for unexpected errors
  }
});
  

module.exports = router;