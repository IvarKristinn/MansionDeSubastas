// Here the web service should be setup and routes declared
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5500;


const artistService = require("./services/artistService");
const artService = require('./services/artService');
const auctionService = require("./services/auctionService");
const customerService = require("./services/customerService");


app.use(bodyParser.json());

// ********** ARTS **************
/*
/api/arts[GET] - get all arts
*/

app.get("/api/arts", (req, res) => {
  const _artService = new artService();
  _artService.on(_artService.events.GET_ALL_ARTS, result => {
    if(result === 1) {
      return res.status(404).send();
    } else if (result === -1) {
      return res.status(500).send();
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
  const artId = req.params.id;
  _artService.on(_artService.events.GET_ART_BY_ID, result => {
    if(result === 1) {
      return res.status(404).send();
    } else if (result === -1) {
      return res.status(500).send();
    } else {
      return res.status(200).json(result);
    }
  });
  _artService.getArtById(artId);
});

/*
/api/arts[POST] - Creates a new art
*/
app.post("/api/arts", (req, res) => {
    const body = req.body;
    const _artService = new artService();
    _artService.on(_artService.events.CREATE_ART, result => {
        if(result == -1) {
            return res.status(500).send()
        } else {
            return res.status(201).send();
        }
    });
    _artService.createArt(body);
});


// ********** ARTISTS **************
/*
/api/artists[GET] - get all artists
*/
app.get("/api/artists", (req, res) => {
  const _artistService = new artistService();
  _artistService.on(_artistService.events.GET_ALL_ARTISTS, result => {
    if(result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).json(result);
    }
  });
  _artistService.getAllArtists();
});

/*
/api/artists/:id[GET] - get artists by an id
*/
app.get("/api/artists/:id", (req, res) => {
  const _artistService = new artistService();
  const artistId = req.params.id;
  _artistService.on(_artistService.events.GET_ARTIST_BY_ID, result => {
    if(result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).json(result);
    }
  });
  _artistService.getArtistById(artistId);
});

/*
/api/artists[POST] - Creates a new artist
*/
// TODO: Implement
app.post("/api/artists", (req, res) => {
    const body = req.body;
    return res.status(201).json({ "Hello": "This is POST artists" });
});

// ********** CUSTOMERS **************
/*
/api/customers[GET] - get all customers
*/
// TODO: Implement
app.get("/api/customers", (req, res) => {
    return res.json({ "Hello": "This is GET all customers"});
});

/*
/api/customers/:id[GET] - get customer by an id
*/
// TODO: Implement
app.get("/api/customers/:id", (req, res) => {
    return res.json({ "Hello": "This is GET cutomer by id"});
});

/*
/api/customers[POST] - Creates a new customer
*/
// TODO: Implement
app.post("/api/customers", (req, res) => {
    const body = req.body;
    return res.status(201).json({ "Hello": "This is POST new customer" });
});

/*
/api/customers/:id/auction-bids[GET] - get all auction bids associated with a customer
*/
// TODO: Implement
app.get("/api/customers/:id/auction-bids", (req, res) => {
    return res.json({ "Hello": "This is GET all auction bids by customer id"});
});


// ********** AUCTIONS **************
/*
/api/auctions[GET] - get all auctions
*/
// TODO: Implement
app.get("/api/auctions", (req, res) => {
    return res.json({ "Hello": "This is GET all auctions"});
});

/*
/api/auctions/:id[GET] - gets an auction by id
*/
// TODO: Implement
app.get("/api/auctions/:id", (req, res) => {
    return res.json({ "Hello": "This is GET auction by ID"});
});

/*
/api/auctions/:id/winner[GET] - Gets the winner of the auction. If the auction is not
finished the web service should return a status code 409 (Conflict), otherwise it
should return the customer which holds the highest bid. If the auction had no bids, it
should return a status code 200 (OK) with the message: ‘This auction had no bids.’.
*/
// TODO: Implement
app.get("/api/auctions/:id/winner", (req, res) => {
    return res.json({ "Hello": "This is GET winner of auction by auction ID"});
});

/*
/api/auctions [POST] - Create a new auction (see how model should look like in
Model section). The art id provided within the body must be a valid art id with its
property isAuctionItem set to true. If the isAuctionItem is set to false, the web
service should return a status code 412 (Precondition failed).
*/
// TODO: Implement
app.post("/api/auctions", (req, res) => {
    const body = req.body;
    return res.status(201).json({ "Hello": "This is POST new auction" });
});

/*
/api/auctions/:id/bids [GET] - Gets all auction bids associated with an auction
*/
// TODO: Implement
app.get("/api/auctions/:id/bids", (req, res) => {
    return res.json({ "Hello": "This is GET all bids on auctions by auction ID"});
});

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
// TODO: Implement
app.post("/api/auctions/:id/bids", (req, res) => {
    const body = req.body;
    return res.status(201).json({ "Hello": "This is POST new bid by auction ID" });
});

//To close the connection
//connection.close();

// listens to port with factoral function
app.listen(port, () => {
  console.log("server is listening to port " + port);
});
