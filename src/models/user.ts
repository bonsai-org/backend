import { Schema, model } from 'mongoose';
import { IUser } from "../types/schemas"

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  salt: { type: String, required: true },
  profilePhoto: { type: String },
  bio: { type: String },
  bonsai: [{ type: String, required: true }],
}, {
  timestamps: true,
})

export const userModel = model<IUser>('User', userSchema);
