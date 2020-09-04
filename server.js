require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const app = express();
const port = process.env.port||3000;
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
 const mongodburl = "mongodb://localhost/capstone";

mongoose
  .connect(mongodburl)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err));



app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));
app.use("/shops",require("./routes/laundryshop"));
app.use("/user",require("./routes/customer"));
app.use("/admin",require("./routes/admin"));
app.use("/book",require("./routes/pickup"));
app.listen(port,()=>{
	console.log(`server running on port ${port}`);
})