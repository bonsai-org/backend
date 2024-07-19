import { Schema, model, Types } from 'mongoose';
import { BonsaiChapter } from "../types/schemas"

const BonsaiChapterSchema = new Schema<BonsaiChapter>({
  photoUrls: [{ type: Schema.Types.String, maxLength: 200, required: true }],
  bonsai: { type: Schema.Types.ObjectId, ref: "Bonsai", required: true },
  date: { type: Schema.Types.Date, default: Date.now, required: true },
  caption: { type: Schema.Types.String, maxLength: 400, required: true },
},
  { timestamps: true });

module.exports = model('BonsaiChapterSchema', BonsaiChapterSchema);