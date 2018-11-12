EventEmitter = require('events');
const Schema = require("mongoose").Schema;
const { Auction, AuctionBid } = require("../data/db");

class AuctionService extends EventEmitter {
	constructor() {
		super();
		this.events = {
			GET_ALL_AUCTIONS: 'GET_ALL_AUCTIONS',
			GET_AUCTION_BY_ID: 'GET_AUCTION_BY_ID',
			GET_AUCTION_WINNER: 'GET_AUCTION_WINNER',
			CREATE_AUCTION: 'CREATE_AUCTION',
			GET_AUCTION_BIDS_WITHIN_AUCTION: 'GET_AUCTION_BIDS_WITHIN_AUCTION',
			PLACE_NEW_BID: 'PLACE_NEW_BID'
		};
	}

	getAllAuctions() {
		// Your implementation goes here
        // Should emit a GET_ALL_AUCTIONS event when the data is available
		Auction.find({}, (err, auctions) => {
            if(err) {
                if(err.reason === undefined) {
                    this.emit(this.events.GET_ALL_AUCTIONS, 1);
                } else {
                    this.emit(this.events.GET_ALL_AUCTIONS);
                }
             }
            this.emit(this.events.GET_ALL_AUCTIONS, auctions);
        });
	};

	getAuctionById(id) {
		// Your implementation goes here
        // Should emit a GET_AUCTION_BY_ID event when the data is available
		Auction.findById(id, (err, auction) => {
            if(err) {
                if(err.reason === undefined) {
                    this.emit(this.events.GET_AUCTION_BY_ID, 1);
                } else {
                    this.emit(this.events.GET_AUCTION_BY_ID);
                }
            }
            this.emit(this.events.GET_AUCTION_BY_ID, auction);
        });
	};

	getAuctionWinner(auctionId) {
		// Your implementation goes here
        // Should emit a GET_AUCTION_WINNER event when the data is available
		Auction.findById(auctionId, (err, auction) => {
            if(err) {
                if(err.reason === undefined) {
                    this.emit(this.events.GET_AUCTION_WINNER, 1);
                } else {
                    this.emit(this.events.GET_AUCTION_WINNER);
                }
            }
            this.emit(this.events.GET_AUCTION_WINNER, auction);
        });
	};

	createAuction(auction) {
		// Your implementation goes here
        // Should emit a CREATE_AUCTION event when the data is available
		Auction.create(auction, err => {
            if(err) {
                if(err.reason === -1) {
                    this.emit(this.events.CREATE_AUCTION, err.reason);
                } else {
                    this.emit(this.events.CREATE_AUCTION);
                }
            }
            this.emit(this.events.CREATE_AUCTION);
        });
	};

	getAuctionBidsWithinAuction(_auctionId) {
		// Your implementation goes here
        // Should emit a GET_AUCTION_BIDS_WITHIN_AUCTION event when the data is available
		AuctionBid.find({ 'auctionId': _auctionId }, (err, bids) => {
            if(err) {
                if(err.reason === undefined) {
                    this.emit(this.events.GET_AUCTION_BIDS_WITHIN_AUCTION, 1);
                } else {
                    this.emit(this.events.GET_AUCTION_BIDS_WITHIN_AUCTION);
                }
             }
            this.emit(this.events.GET_AUCTION_BIDS_WITHIN_AUCTION, bids);
        });
	};

	placeNewBid(auctionId, customerId, price) {
		// Your implementation goes here
        // Should emit a PLACE_NEW_BID event when the data is available
		AuctionBid.create({"customerId": customerId, "price": price}, err => {
            if(err) {
                if(err.reason === -1) {
                    this.emit(this.events.PLACE_NEW_BID, err.reason);
                } else {
                    this.emit(this.events.PLACE_NEW_BID);
                }
            }
        });

		Auction.updateOne({'_id': auctionId}, { 'auctionWinner': customerId}, (err, res) =>{
			if(err) {
				if(err.reason === -1) {
                    this.emit(this.events.PLACE_NEW_BID, err.reason);
                } else {
                    this.emit(this.events.PLACE_NEW_BID);
                }
			}
			this.emit(this.events.PLACE_NEW_BID);
		});
	};

	findHighestBid(bidList) {
		if (bidList == []) {
			return null;
		}

		let highestItem;

		let price = 0;

		bidList.forEach(item => {
			if(price < item.price) {
				highestItem = item;
				price = item.price;
			}
		});
		return highestItem;
	};
};

module.exports = AuctionService;
