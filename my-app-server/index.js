const express = require("express");
const session=require("express-session");
const app=express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());

app.use(session({
    secret:'your-secret-key',
    resave:false,
    saveUninitialized:true
}));

require("./config/mongodb")();

app.use("/post",require("./routes/post"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));