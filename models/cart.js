const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        itemId: {
            type: String,
            required: true,
        },
        name:{
            type:String,
            required:true,
        },
        amount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;