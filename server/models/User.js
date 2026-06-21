const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    password: {
        type: String,
        required: true,
    },

    profileImage: {
        type: String,
        default: "",
    },

    role: {
        type: String,
        default: "user",
    }


});
module.exports = mongoose.model("User", userSchema);