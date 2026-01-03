import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    stops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stop',
      },
    ],
    totalBudgetINR: {
      type: Number,
      default: 0,
      description: 'Total budget in Indian Rupees',
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['Planning', 'Active', 'Completed'],
      default: 'Planning',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Trip', tripSchema);
