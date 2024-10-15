import { Schema, model } from 'mongoose';
import { IBonsaiChapter } from './types';

const BonsaiChapterSchema = new Schema<IBonsaiChapter>(
  {
    bonsai: { type: Schema.Types.ObjectId, ref: 'Bonsai', required: true },
    date: { type: Schema.Types.Date, default: Date.now, required: true },
    caption: { type: Schema.Types.String, maxLength: 400, required: true },
    bonsaiPrivateHash: { type: Schema.Types.String, required: true },
    bonsaiPublicHash: { type: Schema.Types.String, required: true },
    bonsaiChapterPrivateHash: { type: Schema.Types.String, required: true },
    bonsaiChapterPublicHash: { type: Schema.Types.String, required: true },
    photoNames: {
      type: [{ type: Schema.Types.String, required: true }],
      required: true,
      validate: {
        validator: function (v) {
          return v != null && v.length > 0;
        },
        message: 'Bonsai Chapter photos array must have at least one element'
      }
    },
  },
  { timestamps: true },
);

export const BonsaiChapterModel = model('BonsaiChapter', BonsaiChapterSchema);
