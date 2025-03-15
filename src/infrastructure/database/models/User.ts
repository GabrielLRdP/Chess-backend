import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  id?: string;
  userName: string;
  hash: string;
  salt: string;
}

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
