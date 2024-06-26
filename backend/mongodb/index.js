const express = require("express");
const mongoose = require("mongoose");
const assemblymodel = require("./models/tonboassembly.js");
const assemblyRoute = require("./routes/assembly.route.js");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/assembly", assemblyRoute);

mongoose
  .connect(
    "mongodb+srv://ragesh:uIjfHy56wCCZML3b@backenddb.aoivxx8.mongodb.net/Tonbo-DB?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection Failed");
  });
