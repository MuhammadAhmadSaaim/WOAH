const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
