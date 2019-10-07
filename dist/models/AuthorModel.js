"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const timestamp = require("mongoose-timestamp");
const AuthorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    born: { type: String, required: true },
    biography: { type: String, required: true },
});
AuthorSchema.plugin(timestamp);
exports.Author = mongoose_1.model('Author', AuthorSchema);
