import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { Author as AuthorModel, IAuthor } from '../models/AuthorModel';
import { Article as ArticleModel, IArticle } from '../models/ArticleModel';

const ArticleType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    date: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return AuthorModel.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    born: { type: GraphQLInt },
    biography: { type: GraphQLString },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return ArticleModel.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    article: {
      type: ArticleType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return ArticleModel.findById(args.id);
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return AuthorModel.findById(args.id);
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return AuthorModel.find({});
      },
    },

    articles: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return ArticleModel.find({});
      },
    },
  },
});

const Mutation: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    newArticle: {
      type: ArticleType,
      args: {
        authorId: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const newArticle: IArticle = await new ArticleModel({
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
        name: { type: GraphQLString },
        born: { type: GraphQLInt },
        biography: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const newAuthor: IAuthor = new AuthorModel({
          name: args.name,
          born: args.born,
          biography: args.biography,
        });
        return newAuthor.save();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
