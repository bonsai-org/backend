import { Schema, model } from 'mongoose';
import { IBonsaiChapter } from './types';

const BonsaiChapterSchema = new Schema<IBonsaiChapter>(
  {
    photoUrls: [{ type: Schema.Types.String, maxLength: 200, required: true }],
    bonsai: { type: Schema.Types.ObjectId, ref: 'Bonsai', required: true },
    date: { type: Schema.Types.Date, default: Date.now, required: true },
    caption: { type: Schema.Types.String, maxLength: 400, required: true },
  },
  { timestamps: true },
);

export const BonsaiChapterModel = model('BonsaiChapter', BonsaiChapterSchema);
