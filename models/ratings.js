const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: false,
        },
        itemId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        feedback: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Item = mongoose.model("Rating", itemSchema);
module.exports = Item;
