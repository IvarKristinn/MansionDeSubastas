EventEmitter = require('events');
const Schema = require("mongoose").Schema;
const { Art, Auction, AuctionBid, Customer } = require("../data/db");

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
		Auction.find({}, (err, allAuctions) => {
			if(err) {
				if(err.reason === undefined) {
					this.emit(this.events.GET_ALL_AUCTIONS, err.reason);	
				} else {
					this.emit(this.events.GET_ALL_AUCTIONS);
				}
			}
			this.emit(this.events.GET_ALL_AUCTIONS, allAuctions);
		});
	};

	getAuctionById(id) {
		// Your implementation goes here
		// Should emit a GET_AUCTION_BY_ID event when the data is available
		Auction.findById(id, (err, auction) => {
			if(err) {
				if(err.reason === undefined) {
					this.emit(this.events.GET_AUCTION_BY_ID, err.reason);
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
	};

	createAuction(auction) {
		// Your implementation goes here
        // Should emit a CREATE_AUCTION event when the data is available
	};

	getAuctionBidsWithinAuction(auctionId) {
		// Your implementation goes here
        // Should emit a GET_AUCTION_BIDS_WITHIN_AUCTION event when the data is available
	};

	placeNewBid(auctionId, customerId, price) {
		// Your implementation goes here
        // Should emit a PLACE_NEW_BID event when the data is available
	};
};

module.exports = AuctionService;
