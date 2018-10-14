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
app.post("/api/artists", (req, res) => {
    const body = req.body;
    const _artistService = new artistService();
    _artistService.on(_artistService.events.CREATE_ARTIST, result => {
        if(result == -1) {
            return res.status(500).send()
        } else {
            return res.status(201).send();
        }
    });
    _artistService.createArtist(body);
});

// ********** CUSTOMERS **************
/*
/api/customers[GET] - get all customers
*/
app.get("/api/customers", (req, res) => {
    const _customerService = new customerService();
    _customerService.on(_customerService.events.GET_ALL_CUSTOMERS, result => {
      if(result === undefined) {
        return res.status(404).send();
      } else if (result === null) {
        return res.status(500).send();
      } else {
        return res.status(200).json(result);
      }
    });
    _customerService.getAllCustomers();
});

/*
/api/customers/:id[GET] - get customer by an id
*/
app.get("/api/customers/:id", (req, res) => {
    const _customerService = new customerService();
    const customerId = req.params.id;
    _customerService.on(_customerService.events.GET_CUSTOMER_BY_ID, result => {
      if(result === undefined) {
        return res.status(404).send();
      } else if (result === null) {
        return res.status(500).send();
      } else {
        return res.status(200).json(result);
      }
    });
    _customerService.getCustomerById(customerId);
});

/*
/api/customers[POST] - Creates a new customer
*/
app.post("/api/customers", (req, res) => {
    const body = req.body;
    const _customerService = new customerService();
    _customerService.on(_customerService.events.CREATE_CUSTOMER, result => {
        if(result == -1) {
            return res.status(500).send()
        } else {
            return res.status(201).send();
        }
    });
    _customerService.createCustomer(body);
});

/*
/api/customers/:id/auction-bids[GET] - get all auction bids associated with a customer
*/
app.get("/api/customers/:id/auction-bids", (req, res) => {
    const _customerService = new customerService();
    const customerId = req.params.id;
    _customerService.on(_customerService.events.GET_CUSTOMER_AUCTION_BIDS, result => {
      if(result === undefined) {
        return res.status(404).send();
      } else if (result === null) {
        return res.status(500).send();
      } else {
        return res.status(200).json(result);
      }
    });
    _customerService.getCustomerAuctionBids(customerId);
});


// ********** AUCTIONS **************
/*
/api/auctions[GET] - get all auctions
*/
app.get("/api/auctions", (req, res) => {
    const _auctionService = new auctionService();
    _auctionService.on(_auctionService.events.GET_ALL_AUCTIONS, result => {
      if(result === undefined) {
        return res.status(404).send();
      } else if (result === null) {
        return res.status(500).send();
      } else {
        return res.status(200).json(result);
      }
    });
    _auctionService.getAllAuctions();
});

/*
/api/auctions/:id[GET] - gets an auction by id
*/
app.get("/api/auctions/:id", (req, res) => {
    const _auctionService = new auctionService();
    const auctionId = req.params.id;
    _auctionService.on(_auctionService.events.GET_AUCTION_BY_ID, result => {
      if(result === undefined) {
        return res.status(404).send();
      } else if (result === null) {
        return res.status(500).send();
      } else {
        return res.status(200).json(result);
      }
    });
    _auctionService.getAuctionById(auctionId);
});

/*
/api/auctions/:id/winner[GET] - Gets the winner of the auction. If the auction is not
finished the web service should return a status code 409 (Conflict), otherwise it
should return the customer which holds the highest bid. If the auction had no bids, it
should return a status code 200 (OK) with the message: ‘This auction had no bids.’.
*/
// TODO: Implement
app.get("/api/auctions/:id/winner", (req, res) => {
    const _auctionService = new auctionService();
    const _customerService = new customerService();
    const auctionId = req.params.id;

    _customerService.on(_customerService.events.GET_CUSTOMER_BY_ID, result => {
      if(result === undefined) {
        return res.status(200).json({ 'message': 'This auction had no bids'});
      } else if (result === null) {
        return res.status(500).send();
      } else {
        return res.status(200).json(result);
      }
    });

    _auctionService.on(_auctionService.events.GET_AUCTION_WINNER, result => {
        if(result === undefined) {
          return res.status(404).send();
        } else if (result === null) {
            return res.status(500).send();

        } else if (Date.now() < Date.parse(result.endDate)) {
            return res.status(409).send()
        } else {
            console.log(result);
            _customerService.getCustomerById(result.auctionWinner);
        }
    });

    _auctionService.getAuctionWinner(auctionId);
});

/*
/api/auctions [POST] - Create a new auction (see how model should look like in
Model section). The art id provided within the body must be a valid art id with its
property isAuctionItem set to true. If the isAuctionItem is set to false, the web
service should return a status code 412 (Precondition failed).
*/
app.post("/api/auctions", (req, res) => {
    const body = req.body;
    const _artService = new artService();
    const _auctionService = new auctionService();
    const artId = body.artId;

    _artService.on(_artService.events.GET_ART_BY_ID, result => {
        if(result === 1) {
            return res.status(404).send();
        } else if (result === -1) {
            return res.status(500).send();
        } else if (result.isAuctionItem === false) {
            return res.status(412).send();
        }
    });

    _auctionService.on(_auctionService.events.CREATE_AUCTION, result => {
        if(result === -1) {
            return res.status(500).send()
        } else {
            return res.status(201).send();
        }
    })

    _artService.getArtById(artId);
    _auctionService.createAuction(body);
});

/*
/api/auctions/:id/bids [GET] - Gets all auction bids associated with an auction
*/
app.get("/api/auctions/:id/bids", (req, res) => {
    const auctionId = req.params.id;
    const _auctionService = new auctionService();

    _auctionService.on(_auctionService.events.GET_AUCTION_BIDS_WITHIN_AUCTION, result => {
        if(result === undefined) {
            return res.status(404).send();
        } else if (result === null) {
            return res.status(500).send();
        } else {
            return res.status(200).json(result);
        }
    });
    _auctionService.getAuctionBidsWithinAuction(auctionId);
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
    const _auctionService = new auctionService();
    const auctionId = req.params.id;
    let minPrice;
    let customerId;

    _auctionService.on(_auctionService.events.GET_AUCTION_BY_ID, result => {
      if(result === undefined) {
            return res.status(404).send();
        } else if (result === null) {
            return res.status(500).send();
        } else if(Date.now() > Date.parse(result.endDate)) {
            return res.status(403).send();
        } else {
            this.minPrice = result.minimumPrice;
        }
    });

    _auctionService.on(_auctionService.events.GET_AUCTION_BIDS_WITHIN_AUCTION, result => {
        if(result === undefined) {
            return res.status(404).send();
        } else if (result === null) {
            return res.status(500).send();
        } else {
            let highestBid = _auctionService.findHighestBid(result);
            if(highestBid.price > body.price || body.price < this.minPrice) {
                return res.status(412).send();
            }
        }
    });

    _auctionService.on(_auctionService.events.PLACE_NEW_BID, result => {
        if(result == -1) {
            return res.status(500).send()
        } else {
            return res.status(201).send();
        }
    });


    _auctionService.getAuctionById(auctionId);
    _auctionService.getAuctionBidsWithinAuction(auctionId);
    _auctionService.placeNewBid(auctionId, body.customerId, body.price)

});

//To close the connection
//connection.close();

// listens to port with factoral function
app.listen(port, () => {
  console.log("server is listening to port " + port);
});
