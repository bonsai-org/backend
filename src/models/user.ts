import { Schema, model } from 'mongoose';
import { IUser } from "../types/schemas"

const Types = Schema.Types

const userSchema = new Schema<IUser>({
  username: { type: Types.String, required: true },
  password: { type: Types.String, required: true },
  email: { type: Types.String, required: true },
  salt: { type: Types.String, required: true },
  profilePhoto: { type: Types.String },
  bio: { type: Types.String, maxlength: 400 },
  bonsai: [{ type: Types.ObjectId, ref: 'Bonsai' }],
  UUID: { type: Types.UUID, required: true }
}, {
  timestamps: true,
})

export const userModel = model<IUser>('User', userSchema);
