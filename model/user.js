const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            minLength: 4,
        },
        cart: [
            {
                shirt_id: {
                    type: String,
                },
                shirt_title: {
                    type: String,
                },
                quantity: {
                    type: Number,
                },
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema, "User");
module.exports = User;
