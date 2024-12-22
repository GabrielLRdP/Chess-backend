import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: String,
  hash: String,
  salt: String,
  token: String,
});

export const User = mongoose.model('User', UserSchema);
