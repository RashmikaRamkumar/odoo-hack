import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    costIndexINR: {
      type: Number,
      required: true,
      description: 'Cost index in rupees (daily budget recommendation)',
    },
    popularity: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model('City', citySchema);
