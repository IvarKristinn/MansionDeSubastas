const EventEmitter = require('events');
const Schema = require("mongoose").Schema;
const { Art, Artist } = require("../data/db");

class ArtService extends EventEmitter {
    constructor() {
        super();
        this.events = {
            GET_ALL_ARTS: 'GET_ALL_ARTS',
            GET_ART_BY_ID: 'GET_ART_BY_ID',
            CREATE_ART: 'CREATE_ART'
        };
    }

    getAllArts() {
        // Your implementation goes here
        // Should emit a GET_ALL_ARTS event when the data is available
        Art.find({}, (err, arts) => {
            if(err) {
                if(err.reason === undefined) {
                    this.emit(this.events.GET_ALL_ARTS, err.reason);
                } else {
                    this.emit(this.events.GET_ALL_ARTS);
                }
             }
            this.emit(this.events.GET_ALL_ARTS, arts);
        });
    };

    getArtById(id) {
        // Your implementation goes here
        // Should emit a GET_ART_BY_ID event when the data is available
        Art.findById(id, (err, arts) => {
            if(err) {
                if(err.reason === undefined) {
                    this.emit(this.events.GET_ART_BY_ID, err.reason);
                } else {
                    this.emit(this.events.GET_ART_BY_ID);
                }
            }
            this.emit(this.events.GET_ART_BY_ID, arts);
        });
    };

    createArt(art) {
        // Your implementation goes here
        // Should emit a CREATE_ART event when the data is available
        Art.create(art, (err, arts) => {
            if(err) {
                if(err.reason === -1) {
                    this.emit(this.events.CREATE_ART, err.reason);
                } else {
                    this.emit(this.events.CREATE_ART);
                }
            }
            this.emit(this.events.CREATE_ART, arts);
        });
    };
};

module.exports = ArtService;
