"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const timestamp = require("mongoose-timestamp");
const AritcleSchema = new mongoose_1.Schema({
    authorId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: String, required: true },
    genre: { type: String, required: true },
});
AritcleSchema.plugin(timestamp);
exports.Article = mongoose_1.model('Article', AritcleSchema);
