const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: false
        },
        itemId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Bid = mongoose.model('bid', bidSchema);
module.exports = Bid;