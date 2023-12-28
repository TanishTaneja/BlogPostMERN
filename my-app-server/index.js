const express = require("express");
const app=express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());

require("./config/mongodb")();

app.use("/post",require("./routes/post"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));