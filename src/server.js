const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const fees = require("../src/controllers/feeController.js");
const customerfees = require("../src/controllers/customerFeesController.js");
const errors = require("../src/helpers/errorHandler.js");

app.use(cors({ origin: "http://localhost:3001" })); // Default = CORS-enabled for all origins Access-Control-Allow-Origin: *!
app.use(express.json()); // middleware for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use("/fees", fees); // middleware for listening to routes
app.use("/", customerfees);
app.use(errors.errorHandler); // middleware for error responses

// MongoDB connection, success and error event responses
const uri =
  "mongodb+srv://lanisterpay:lanisterpay@lanister-pay.tqsyj.mongodb.net/lanisterpay?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to mongo at ${uri}`));

app.listen(3000);
