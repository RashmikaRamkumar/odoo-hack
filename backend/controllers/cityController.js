import City from '../models/City.js';

export const getAllCities = async (req, res) => {
  try {
    const { region, search } = req.query;
    let query = {};

    if (region) {
      query.region = region;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ];
    }

    const cities = await City.find(query).sort({ popularity: -1 });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCity = async (req, res) => {
  try {
    const { name, country, region, costIndexINR, popularity, image, description, coordinates } = req.body;

    const city = new City({
      name,
      country,
      region,
      costIndexINR,
      popularity,
      image,
      description,
      coordinates,
    });

    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
