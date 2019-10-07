"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const AuthorModel_1 = require("../models/AuthorModel");
const ArticleModel_1 = require("../models/ArticleModel");
const ArticleType = new graphql_1.GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        body: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLString },
        genre: { type: graphql_1.GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return AuthorModel_1.Author.findById(parent.authorId);
            },
        },
    }),
});
const AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        born: { type: graphql_1.GraphQLInt },
        biography: { type: graphql_1.GraphQLString },
        articles: {
            type: new graphql_1.GraphQLList(ArticleType),
            resolve(parent, args) {
                return ArticleModel_1.Article.find({ authorId: parent.id });
            },
        },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        article: {
            type: ArticleType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
            resolve(parent, args) {
                return ArticleModel_1.Article.findById(args.id);
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
            resolve(parent, args) {
                return AuthorModel_1.Author.findById(args.id);
            },
        },
        authors: {
            type: new graphql_1.GraphQLList(AuthorType),
            resolve() {
                return AuthorModel_1.Author.find({});
            },
        },
        articles: {
            type: new graphql_1.GraphQLList(AuthorType),
            resolve() {
                return ArticleModel_1.Article.find({});
            },
        },
    },
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        newArticle: {
            type: ArticleType,
            args: {
                authorId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                body: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                date: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                genre: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            async resolve(parent, args) {
                const newArticle = await new ArticleModel_1.Article({
                    authorId: args.authorId,
                    title: args.title,
                    body: args.body,
                    date: args.date,
                    genre: args.genre,
                });
                return newArticle.save();
            },
        },
        newAuthor: {
            type: AuthorType,
            args: {
                name: { type: graphql_1.GraphQLString },
                born: { type: graphql_1.GraphQLInt },
                biography: { type: graphql_1.GraphQLString },
            },
            async resolve(parent, args) {
                const newAuthor = new AuthorModel_1.Author({
                    name: args.name,
                    born: args.born,
                    biography: args.biography,
                });
                return newAuthor.save();
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
