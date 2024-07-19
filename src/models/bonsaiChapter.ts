import {Schema, model, Types} from 'mongoose';

interface BonsaiChapter {
    photoUrl: string[];
    bonsai: Types.ObjectId;
    date: Date;
    caption: string;
}

const BonsaiChapterSchema = new Schema<BonsaiChapter>({
    photoUrl: [{ type: Schema.Types.String, maxLength: 200, required: true }],
    bonsai: { type: Schema.Types.ObjectId, ref: "Bonsai", required: true },
    date: { type: Schema.Types.Date, default: Date.now, required: true },
    caption: { type: Schema.Types.String, maxLength: 400, required: true },
  },
{timestamps: true});

module.exports = model('BonsaiChapterSchema', BonsaiChapterSchema);