// Here the web service should be setup and routes declared
const express = require("express");
const bodyParser = require("body-parser");

const artistService = require("./services/artistService");
const artService = require('./services/artService');
const auctionService = require("./services/auctionService");
const customerService = require("./services/customerService");
const port = 5500;

const app = express();
app.use(bodyParser.json());

// ********** ARTS **************
/*
/api/arts[GET] - get all arts
*/

app.get("/api/arts", (req, res) => {
  const _artService = new artService();
  _artService.on(_artService.events.GET_ALL_ARTS, result => {
    if(result === -1) {
      return res.status(500).send();
    } else if (result === null) {
      return res.status(404).send();
    } else {
      return res.status(200).json(result);
    }
  });
  _artService.getAllArts();
});

/*
/api/arts/:id[GET] - get an art by id
*/
app.get("/api/arts/:id", (req, res) => {
  const _artService = new artService();
  const id = req.params.id;
  _artService.on(_artService.events.GET_ART_BY_ID, result => {
    if(result === -1) {
      return res.status(500).send();
    } else if (result === null) {
      return res.status(404).send();
    } else {
      return res.status(200).json(result);
    }
  });
  _artService.getArtById();
});

/*
/api/arts[POST] - Creates a new art
*/


// ********** ARTISTS **************
/*
/api/artists[GET] - get all artists
*/

/*
/api/artists/:id[GET] - get artists by an id
*/

/*
/api/artists[POST] - Creates a new artist
*/


// ********** CUSTOMERS **************
/*
/api/customers[GET] - get all customers
*/

/*
/api/customers/:id[GET] - get customer by an id
*/

/*
/api/customers[POST] - Creates a new customer
*/

/*
/api/customers/:id/auction-bids[GET] - get all auction bids associated with a customer
*/



// ********** AUCTIONS **************
/*
/api/auctions[GET] - get all auctions
*/

/*
/api/auctions/:id[GET] - gets an auction by id
*/

/*
/api/auctions/:id/winner[GET] - Gets the winner of the auction. If the auction is not
finished the web service should return a status code 409 (Conflict), otherwise it
should return the customer which holds the highest bid. If the auction had no bids, it
should return a status code 200 (OK) with the message: ‘This auction had no bids.’.
*/

/*
/api/auctions [POST] - Create a new auction (see how model should look like in
Model section). The art id provided within the body must be a valid art id with its
property isAuctionItem set to true. If the isAuctionItem is set to false, the web
service should return a status code 412 (Precondition failed).
*/

/*
/api/auctions/:id/bids [GET] - Gets all auction bids associated with an auction
*/

/*
/api/auctions/:id/bids [POST] - Creates a new auction bid (see how model should
look like in Model section). Auction bids must be higher than the minimum price and
must also be higher than the current highest bid. If the auction bid price is lower than
the minimum price or current highest bid, the web service should return a status code
412 (Precondition failed). If the auction has already passed its end date, the web
service should return a status code 403 (Forbidden). As a side-effect the
auctionWinner property in the Auction schema should be updated to the latest
highest bidder.
*/

//To close the connection
//connection.close();

// listens to port with factoral function
app.listen(port, () => {
  console.log("server is listening to port " + port);
});