import { Schema, model, Document, Model } from 'mongoose';
import timestamp = require('mongoose-timestamp');

export interface IAuthor extends Document {
  name: string;
  born: string;
  biography: string;
}

const AuthorSchema: Schema = new Schema({
  name: { type: String, required: true },
  born: { type: String, required: true },
  biography: { type: String, required: true },
});
AuthorSchema.plugin(timestamp);

export const Author: Model<IAuthor> = model<IAuthor>('Author', AuthorSchema);
