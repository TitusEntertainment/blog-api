"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("@ayana/logger");
const logger = logger_1.Logger.get('db');
exports.init = () => {
    mongoose_1.default.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 10,
        connectTimeoutMS: 10000,
        family: 4,
    });
    mongoose_1.default.Promise = global.Promise;
    mongoose_1.default.connection.on('connected', () => {
        logger.info('Client has connected to database');
    });
    mongoose_1.default.connection.on('err', err => {
        logger.error(err);
    });
    mongoose_1.default.connection.on('disconnected', () => {
        logger.warn('Disconnected from database');
    });
};
