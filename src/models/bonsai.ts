import {Schema, model, Types} from 'mongoose';

interface Bonsai {
    user: Types.ObjectId;
    bonsaiChapters: Types.ObjectId[];
    hardiness_zone: string;
    height: number;
    width: number;
    nebari: number;
    style: string;
    species: string;
}

const BonsaiSchema = new Schema<Bonsai>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bonsaiChapters: [{ type: Schema.Types.ObjectId, ref: 'BonsaiChapter', required: true }],
  hardiness_zone: { type: String, maxLength: 200, required: true },
  height: { type: Number, maxLength: 200 },
  width: { type:Number, maxLength: 200 },
  nebari: { type: Number, maxLength: 200 }, // visible/ surface roots of bonsai
  style: { type: String, maxLength: 200 },
  species: { type: String, maxLength: 200, required: true }
},{timestamps: true});

module.exports = model('BonsaiChapter', BonsaiSchema);