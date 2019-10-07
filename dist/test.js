"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorModel_1 = require("./models/AuthorModel");
const newAuthor = new AuthorModel_1.Author({
    name: 'Eddie Englund',
    born: 20011222,
    biography: 'this is jus ta test',
});
exports.default = newAuthor;
