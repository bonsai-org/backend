import { Schema, model } from 'mongoose';
import { IBonsaiChapter } from './types';

const BonsaiChapterSchema = new Schema<IBonsaiChapter>(
  {
    bonsai: { type: Schema.Types.ObjectId, ref: 'Bonsai', required: true },
    date: { type: Schema.Types.Date, default: Date.now, required: true },
    caption: { type: Schema.Types.String, maxLength: 400, required: true },
    sequencePosition: { type: Schema.Types.Number, required: true },
    photoName: { type: Schema.Types.String, required: true },
    bonsaiPrivateHash: { type: Schema.Types.String, required: true },
    bonsaiPublicHash: { type: Schema.Types.String, required: true },
  },
  { timestamps: true },
);

export const BonsaiChapterModel = model('BonsaiChapter', BonsaiChapterSchema);
