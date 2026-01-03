import Activity from '../models/Activity.js';

export const getActivitiesByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const activities = await Activity.find({ cityId }).populate('cityId');
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('cityId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createActivity = async (req, res) => {
  try {
    const { name, cityId, category, duration, costINR, description, image, rating } = req.body;

    const activity = new Activity({
      name,
      cityId,
      category,
      duration,
      costINR,
      description,
      image,
      rating,
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('cityId');

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
