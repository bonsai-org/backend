import { Schema, model } from 'mongoose';
import { IBonsai } from '../../types/schemas';

const BonsaiSchema = new Schema<IBonsai>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bonsaiChapters: [
      { type: Schema.Types.ObjectId, ref: 'BonsaiChapter', required: true },
    ],
    hardiness_zone: {
      type: Schema.Types.String,
      maxLength: 200,
      required: true,
    },
    height: { type: Schema.Types.Number, maxLength: 200 },
    width: { type: Schema.Types.Number, maxLength: 200 },
    nebari: { type: Schema.Types.Number, maxLength: 200 }, // visible/ surface roots of bonsai
    style: { type: Schema.Types.String, maxLength: 200 },
    species: { type: Schema.Types.String, maxLength: 200, required: true },
  },
  { timestamps: true },
);

export const BonsaiModel = model('Bonsai', BonsaiSchema);
