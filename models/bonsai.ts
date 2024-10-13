import { Schema, model } from 'mongoose';
import { IBonsai } from './types';

const BonsaiSchema = new Schema<IBonsai>(
  {
    photoNames: {
      type: [{ type: Schema.Types.String, required: true }],
      required: true,
      validate: {
        validator: function (v) {
          return v != null && v.length > 0;
        },
        message: 'Bonsai photoNames array must have at least one element'
      }
    },
    user: { type: Schema.Types.String, required: true },
    bonsaiChapters: [
      { type: Schema.Types.ObjectId, ref: 'BonsaiChapter', required: true },
    ],
    hardiness_zone: {
      type: Schema.Types.String,
      maxLength: 200,
      required: true,
    },
    geoLocation: { type: Schema.Types.String, required: true },
    height: { type: Schema.Types.Number, maxLength: 200 },
    width: { type: Schema.Types.Number, maxLength: 200 },
    nebari: { type: Schema.Types.Number, maxLength: 200 }, // visible/ surface roots of bonsai
    style: { type: Schema.Types.String, maxLength: 200 },
    species: { type: Schema.Types.String, maxLength: 200, required: true },
    uploaded: { type: Schema.Types.Boolean, default: false, required: true },
    privateHash: { type: Schema.Types.String, required: true, unique: true },
    publicHash: { type: Schema.Types.String, required: true, unique: true },
  },
  { timestamps: true },
);

export const BonsaiModel = model('Bonsai', BonsaiSchema);
