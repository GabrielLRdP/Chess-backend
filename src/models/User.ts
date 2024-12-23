import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  hash: string;
  salt: string;
  token: string;
}

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  token: { type: String, required: false },
});

export const User = mongoose.model<IUser>('User', UserSchema);
