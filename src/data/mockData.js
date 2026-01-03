export const cities = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    costIndex: 4,
    popularity: 95,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    description: 'The City of Light, known for its art, fashion, and cuisine'
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    costIndex: 5,
    popularity: 92,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    description: 'A blend of traditional culture and modern technology'
  },
  {
    id: '3',
    name: 'New York',
    country: 'USA',
    region: 'North America',
    costIndex: 5,
    popularity: 94,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    description: 'The city that never sleeps, hub of culture and commerce'
  },
  {
    id: '4',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    costIndex: 2,
    popularity: 88,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    description: 'Tropical paradise with stunning beaches and temples'
  },
  {
    id: '5',
    name: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    costIndex: 3,
    popularity: 90,
    image: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800',
    description: 'Gaudi architecture, beaches, and vibrant nightlife'
  },
  {
    id: '6',
    name: 'Dubai',
    country: 'UAE',
    region: 'Middle East',
    costIndex: 4,
    popularity: 87,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    description: 'Luxury, modern architecture, and desert adventures'
  },
  {
    id: '7',
    name: 'Rome',
    country: 'Italy',
    region: 'Europe',
    costIndex: 3,
    popularity: 91,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    description: 'Ancient history, art, and authentic Italian cuisine'
  },
  {
    id: '8',
    name: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    costIndex: 4,
    popularity: 85,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    description: 'Iconic harbor, beaches, and outdoor lifestyle'
  }
];

export const activities = [
  {
    id: '1',
    name: 'Eiffel Tower Visit',
    cityId: '1',
    category: 'Sightseeing',
    duration: 2,
    cost: 30,
    description: 'Visit the iconic Eiffel Tower and enjoy panoramic views',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600'
  },
  {
    id: '2',
    name: 'Seine River Cruise',
    cityId: '1',
    category: 'Sightseeing',
    duration: 1.5,
    cost: 25,
    description: 'Romantic cruise along the Seine River',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600'
  },
  {
    id: '3',
    name: 'Tokyo Food Tour',
    cityId: '2',
    category: 'Food',
    duration: 3,
    cost: 80,
    description: 'Explore authentic Japanese cuisine in local neighborhoods',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600'
  },
  {
    id: '4',
    name: 'Shibuya Crossing Experience',
    cityId: '2',
    category: 'Sightseeing',
    duration: 1,
    cost: 0,
    description: 'Experience the world\'s busiest pedestrian crossing',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600'
  },
  {
    id: '5',
    name: 'Statue of Liberty Tour',
    cityId: '3',
    category: 'Sightseeing',
    duration: 3,
    cost: 40,
    description: 'Visit Lady Liberty and Ellis Island',
    image: 'https://images.unsplash.com/photo-1569850579122-0b4e4c4e64b7?w=600'
  },
  {
    id: '6',
    name: 'Broadway Show',
    cityId: '3',
    category: 'Entertainment',
    duration: 2.5,
    cost: 120,
    description: 'Enjoy a world-class Broadway musical',
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600'
  },
  {
    id: '7',
    name: 'Ubud Rice Terrace Trek',
    cityId: '4',
    category: 'Adventure',
    duration: 4,
    cost: 35,
    description: 'Hike through stunning rice paddies',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600'
  },
  {
    id: '8',
    name: 'Beach Sunset & Dinner',
    cityId: '4',
    category: 'Food',
    duration: 3,
    cost: 50,
    description: 'Beachside dining with spectacular sunset views',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600'
  },
  {
    id: '9',
    name: 'Sagrada Familia Tour',
    cityId: '5',
    category: 'Sightseeing',
    duration: 2,
    cost: 35,
    description: 'Visit Gaudi\'s masterpiece basilica',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600'
  },
  {
    id: '10',
    name: 'Tapas Crawl',
    cityId: '5',
    category: 'Food',
    duration: 3,
    cost: 60,
    description: 'Taste authentic Spanish tapas across multiple bars',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600'
  }
];

export const popularDestinations = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Iceland',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Prague',
    country: 'Czech Republic',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800',
    rating: 4.6
  }
];
