import { Schema, model, Document, Model } from 'mongoose';
import timestamp = require('mongoose-timestamp');

export interface IArticle extends Document {
  authordId: string;
  title: string;
  body: string;
  date: string;
  genre: string;
}

const AritcleSchema: Schema = new Schema({
  authorId: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: String, required: true },
  genre: { type: String, required: true },
});
AritcleSchema.plugin(timestamp);

export const Article: Model<IArticle> = model<IArticle>('Article', AritcleSchema);
