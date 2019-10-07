import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import { init as db } from './utils/init';
import dotenv from 'dotenv';
import newUser from './test';
dotenv.config();

const app = express();

app.use(
  '/',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

db();
newUser.save();
const PORT: number | string = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${process.env.PORT || 3000}`));
