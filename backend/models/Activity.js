import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true,
    },
    category: {
      type: String,
      enum: ['Sightseeing', 'Food', 'Adventure', 'Entertainment', 'Shopping', 'Sports'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      description: 'Duration in hours',
    },
    costINR: {
      type: Number,
      required: true,
      description: 'Cost in Indian Rupees',
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Activity', activitySchema);
