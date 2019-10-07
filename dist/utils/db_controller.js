"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logger_1 = require("@ayana/logger");
const logger = logger_1.Logger.get('Controller');
class DB {
    constructor() {
        this._db = mongoose_1.connection;
        this._db.on('open', this.connected);
        this._db.on('error', this.error);
        this._db.on('disconnected', this.disconnected);
    }
    connected() {
        logger.info('Connected to database');
    }
    async connect() {
        await mongoose_1.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4,
            useCreateIndex: true,
        });
    }
    disconnected() {
        logger.warn('Disconnected from database');
    }
    error(error) {
        logger.error('Database error', error);
    }
}
exports.DB = DB;
