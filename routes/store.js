const express=require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");
const Item=require('../models/item');

//for multer
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDirectory = path.resolve(__dirname, '../frontend/public/images');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true }); 
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });
//create a item to sell
router.post("/createitem", fetchUser,upload.single('image'), async (req, res) => {
  const imageName = req.file.filename;

    const { name, price, description } = req.body;
  
    try {
      const existingItem = await Item.findOne({
        name: name,
        price: price,
        description: description,
      });
  
      if (existingItem) {
        return res
          .status(409)
          .json({ error: "Item already exists." });
      }
  
      const newItem = await Item.create({
        userId: req.user.id,
        name,
        price,
        description,
        image:imageName,
      }); 
  
      res.status(201).json(newItem);
    } catch (err) {
      console.error("Error creating item:", err);
      res.status(500).json({ error: "Internal server error." });
    }
});

//get all the items in the store
router.get("/allitems", async (req, res) => {
  try {
    const items = await Item.find();

    //when there are no items
    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found." });
    }

    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});
//delete all the items
router.delete("/delete", async (req, res) => {
  try {
    const result = await Item.deleteMany({}); // Deletes all items from the collection

    if (result.deletedCount === 0) {
      // If there were no items to delete
      return res.status(404).json({ message: "No items to delete." });
    }

    res.status(200).json({ message: `${result.deletedCount} items deleted.` });
  } catch (err) {
    console.error("Error deleting items:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});


//cart functionalities

router.get('/cart', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await Item.find({ userId });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: 'No items found.' });
    }

    // Default values to be used when there's no highest bidder
    const defaultValues = {
      itemId: 'NaN',
      userId: 'NaN',
      itemName: 'NaN',
      highestBidder: 'NaN',
      highestBid: 0,
    };

    // Fetch the highest bidder data for each item
    const highestBidderPromises = items.map(async (item) => {
      const { id, name, price, description,bidActive } = item;
      const response = await fetch('http://localhost:5000/bid/highestBidder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, description }),
      });

      if (!response.ok) {
        console.warn(`Failed to fetch highest bidder for ${name}: ${response.statusText}`);
        return {
          ...defaultValues,
          bidActive:bidActive,
          itemId: id, // At least set the itemId
          itemName: name,
        }; // Return default values with the given itemName
      }

      const highestBidderData = await response.json();

      return {
        bidActive:bidActive,
        itemId: id,
        userId: highestBidderData.highestBidderId || defaultValues.userId,
        itemName: name,
        highestBidder: highestBidderData.highestBidder || defaultValues.highestBidder,
        highestBid: highestBidderData.amount || defaultValues.highestBid,
      };
    });

    // Wait for all fetch operations to complete
    const results = await Promise.all(highestBidderPromises);

    // Return the final results with default values for missing data
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching items or highest bidder:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

//search item by name

router.post("/search", async (req, res) => {
  try {
    
    const items = await Item.find({
      name: { $regex: new RegExp(req.body.name, 'i') }, // 'i' for case-insensitive
    });

    //when there are no items
    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found."});
    }

    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});
module.exports = router;