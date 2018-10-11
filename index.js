// Here the web service should be setup and routes declared
const artistService = require("./services/artistService");
const artService = require("./services/artService");
const auctionService = require("./services/auctionService");
const customerService = require("./services/customerService");

const express = require("express");
const bodyParser = require("body-parser");

const port = 5500;
const app = express();







// listens to port with factoral function
app.listen(port, () => {
  console.log("server is listening to port " + port);
});