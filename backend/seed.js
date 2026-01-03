import mongoose from 'mongoose';
import dotenv from 'dotenv';
import City from './models/City.js';
import Activity from './models/Activity.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🔄 Clearing existing data...');
    await City.deleteMany({});
    await Activity.deleteMany({});

    console.log('📍 Seeding cities...');
    const cities = await City.insertMany([
      {
        name: 'Paris',
        country: 'France',
        region: 'Europe',
        costIndexINR: 4500,
        popularity: 95,
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
        description: 'The City of Light, known for its art, fashion, and cuisine',
        coordinates: { latitude: 48.8566, longitude: 2.3522 },
      },
      {
        name: 'Tokyo',
        country: 'Japan',
        region: 'Asia',
        costIndexINR: 5500,
        popularity: 92,
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
        description: 'A blend of traditional culture and modern technology',
        coordinates: { latitude: 35.6762, longitude: 139.6503 },
      },
      {
        name: 'New York',
        country: 'USA',
        region: 'North America',
        costIndexINR: 5800,
        popularity: 94,
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
        description: 'The city that never sleeps, hub of culture and commerce',
        coordinates: { latitude: 40.7128, longitude: -74.006 },
      },
      {
        name: 'Bali',
        country: 'Indonesia',
        region: 'Asia',
        costIndexINR: 2000,
        popularity: 88,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        description: 'Tropical paradise with stunning beaches and temples',
        coordinates: { latitude: -8.6705, longitude: 115.2126 },
      },
      {
        name: 'Barcelona',
        country: 'Spain',
        region: 'Europe',
        costIndexINR: 3500,
        popularity: 90,
        image: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800',
        description: 'Gaudi architecture, beaches, and vibrant nightlife',
        coordinates: { latitude: 41.3851, longitude: 2.1734 },
      },
      {
        name: 'Dubai',
        country: 'UAE',
        region: 'Middle East',
        costIndexINR: 4200,
        popularity: 87,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
        description: 'Luxury, modern architecture, and desert adventures',
        coordinates: { latitude: 25.2048, longitude: 55.2708 },
      },
      {
        name: 'Rome',
        country: 'Italy',
        region: 'Europe',
        costIndexINR: 3200,
        popularity: 91,
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
        description: 'Ancient history, art, and authentic Italian cuisine',
        coordinates: { latitude: 41.9028, longitude: 12.4964 },
      },
      {
        name: 'Sydney',
        country: 'Australia',
        region: 'Oceania',
        costIndexINR: 4800,
        popularity: 85,
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
        description: 'Iconic harbor, beaches, and outdoor lifestyle',
        coordinates: { latitude: -33.8688, longitude: 151.2093 },
      },
    ]);

    console.log('🎯 Seeding activities...');
    await Activity.insertMany([
      {
        name: 'Eiffel Tower Visit',
        cityId: cities[0]._id,
        category: 'Sightseeing',
        duration: 2,
        costINR: 2000,
        description: 'Visit the iconic Eiffel Tower and enjoy panoramic views',
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600',
        rating: 4.8,
      },
      {
        name: 'Seine River Cruise',
        cityId: cities[0]._id,
        category: 'Sightseeing',
        duration: 1.5,
        costINR: 1800,
        description: 'Romantic cruise along the Seine River',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600',
        rating: 4.7,
      },
      {
        name: 'Tokyo Food Tour',
        cityId: cities[1]._id,
        category: 'Food',
        duration: 3,
        costINR: 5000,
        description: 'Explore authentic Japanese cuisine in local neighborhoods',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
        rating: 4.9,
      },
      {
        name: 'Shibuya Crossing Experience',
        cityId: cities[1]._id,
        category: 'Sightseeing',
        duration: 1,
        costINR: 0,
        description: "Experience the world's busiest pedestrian crossing",
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600',
        rating: 4.6,
      },
      {
        name: 'Statue of Liberty Tour',
        cityId: cities[2]._id,
        category: 'Sightseeing',
        duration: 3,
        costINR: 3000,
        description: 'Visit Lady Liberty and Ellis Island',
        image: 'https://images.unsplash.com/photo-1569850579122-0b4e4c4e64b7?w=600',
        rating: 4.7,
      },
      {
        name: 'Broadway Show',
        cityId: cities[2]._id,
        category: 'Entertainment',
        duration: 2.5,
        costINR: 8000,
        description: 'Enjoy a world-class Broadway musical',
        image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600',
        rating: 4.8,
      },
      {
        name: 'Ubud Rice Terrace Trek',
        cityId: cities[3]._id,
        category: 'Adventure',
        duration: 4,
        costINR: 2500,
        description: 'Hike through stunning rice paddies',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600',
        rating: 4.7,
      },
      {
        name: 'Beach Sunset & Dinner',
        cityId: cities[3]._id,
        category: 'Food',
        duration: 3,
        costINR: 3500,
        description: 'Beachside dining with spectacular sunset views',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
        rating: 4.9,
      },
      {
        name: 'Sagrada Familia Tour',
        cityId: cities[4]._id,
        category: 'Sightseeing',
        duration: 2,
        costINR: 2500,
        description: "Visit Gaudi's masterpiece basilica",
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600',
        rating: 4.8,
      },
      {
        name: 'Tapas Crawl',
        cityId: cities[4]._id,
        category: 'Food',
        duration: 3,
        costINR: 4000,
        description: 'Taste authentic Spanish tapas across multiple bars',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
        rating: 4.7,
      },
    ]);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
