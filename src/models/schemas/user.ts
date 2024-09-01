import { Schema, model } from 'mongoose';
import { IUser } from '../../types/schemas';

const UserSchema = new Schema<IUser>(
  {
    username: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    profilePhoto: { type: Schema.Types.String },
    bio: { type: Schema.Types.String, maxlength: 400 },
    bonsai: [{ type: Schema.Types.ObjectId, ref: 'Bonsai' }],
    UUID: { type: Schema.Types.String, required: true },
    refreshToken: { type: Schema.Types.Number, required: true }
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUser>('User', UserSchema);
