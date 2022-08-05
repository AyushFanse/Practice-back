const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_images: [
        {
            cover: { type: Buffer, required: true },
            thumbnail: { type: Buffer, required: true },
            primary: { type: Boolean, required: true },
        },
    ],
    kit_type: {
        type: String,
        required: true,
        enum: ["Home Kit", "Away Kit"],
    },
    product_name: {
        type: String,
        required: true,
        maxLength: 35,
    },
    avl_quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    reviews: [
        {
            user_id: { type: String },
            user_name: { type: String },
            review: { type: String },
        },
    ],
});

const Product = mongoose.model("Product", productSchema, "Product");
module.exports = Product;
