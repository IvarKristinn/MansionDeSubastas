const EventEmitter = require('events');
const Schema = require("mongoose").Schema;
const { Customer, AuctionBid } = require("../data/db");

class CustomerService extends EventEmitter {
    constructor() {
        super();
        this.events = {
            GET_ALL_CUSTOMERS: 'GET_ALL_CUSTOMERS',
            GET_CUSTOMER_BY_ID: 'GET_CUSTOMER_BY_ID',
            GET_CUSTOMER_AUCTION_BIDS: 'GET_CUSTOMER_AUCTION_BIDS',
            CREATE_CUSTOMER: 'CREATE_CUSTOMER'
        };
    }
    getAllCustomers() {
        // Your implementation goes here
        // Should emit a GET_ALL_CUSTOMERS event when the data is available
        Customer.find({}, (err, customers) => {
            if(err) {
                if(err.reason === undefined) {
                    this.emit(this.events.GET_ALL_CUSTOMERS, err.reason);
                } else {
                    this.emit(this.events.GET_ALL_CUSTOMERS);
                }
            }
            this.emit(this.events.GET_ALL_CUSTOMERS, customers);
        });
    };

    getCustomerById(id) {
        // Your implementation goes here
        // Should emit a GET_CUSTOMER_BY_ID event when the data is available
        Customer.findById(id, (err, customers) => {
            if(err) {
                if(err.reason === undefined) {
                    this.emit(this.events.GET_CUSTOMER_BY_ID, err.reason);
                } else {
                    this.emit(this.events.GET_CUSTOMER_BY_ID);
                }
            }
            this.emit(this.events.GET_CUSTOMER_BY_ID, customers);
        });
    };

    getCustomerAuctionBids(_customerId) {
        // Your implementation goes here
        // Should emit a GET_CUSTOMER_AUCTION_BIDS event when the data is available
        AuctionBid.find({ 'customerId': _customerId }, (err, bids) => {
            if(err) {
                if(err.reason === undefined) {
                    this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS, err.reason);
                } else {
                    this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS);
                }
            }
            this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS, bids);
        });
    };

    createCustomer(customer) {
        // Your implementation goes here
        // Should emit a CREATE_CUSTOMER event when the data is available
        Customer.create(customer, err => {
            if(err) {
                if(err.reason === -1) {
                    this.emit(this.events.CREATE_CUSTOMER, err.reason);
                } else {
                    this.emit(this.events.CREATE_CUSTOMER);
                }
            }
            this.emit(this.events.CREATE_CUSTOMER);
        });
    };
};

module.exports = CustomerService;
