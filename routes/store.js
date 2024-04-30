const express=require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Item=require('../models/item');

//item validations
const itemValidationRules = [
    body("name").isString().withMessage("Name must be a string"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("description").isString().withMessage("Description must be a string"),
];

//create a item to sell
router.post("/createitem", fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    const { name, price, description, image } = req.body;
  
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
        image,
      });
  
      res.status(201).json(newItem);
    } catch (err) {
      console.error("Error creating item:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  });
  
module.exports = router;