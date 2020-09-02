const express = require("express");
const app = express();
const port = 3000;
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
 const mongodburl = "mongodb://localhost/capstone";

mongoose
  .connect(mongodburl)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err));

app.use(bodyparser.json());
app.use("/shops",require("./routes/laundryshop"));
app.use("/user",require("./routes/customer"));
app.listen(port,()=>{
	console.log(`server running on port ${port}`);
})