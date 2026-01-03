import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: '',
    },
    preferences: {
      currency: {
        type: String,
        default: 'INR',
      },
      language: {
        type: String,
        default: 'en',
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
