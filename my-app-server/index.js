const express = require("express");
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());

require("./config/mongodb")();

app
    .use("/user", require("./routes/user"))
    .use("/post", require("./routes/post"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));