import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  age: String,
});

export const User = mongoose.model('User', UserSchema);
