require('dotenv').config();
const mongoose = require("mongoose");

const connectDb = () => {
    mongoose.connect(
        process.env.MONGODB_URL
    )
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log(err));
}

module.exports = connectDb;
