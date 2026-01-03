import Trip from '../models/Trip.js';
import Stop from '../models/Stop.js';

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.userId })
      .populate('stops')
      .sort({ createdAt: -1 });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate({
      path: 'stops',
      populate: {
        path: 'cityId activities',
      },
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (trip.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTrip = async (req, res) => {
  try {
    const { name, description, startDate, endDate, totalBudgetINR } = req.body;

    const trip = new Trip({
      name,
      description,
      userId: req.userId,
      startDate,
      endDate,
      totalBudgetINR,
    });

    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('stops');

    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Stop.deleteMany({ tripId: req.params.id });
    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addStopToTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { city, country, cityId, startDate, endDate } = req.body;

    const trip = await Trip.findById(tripId);
    if (trip.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const stop = new Stop({
      tripId,
      city,
      country,
      cityId,
      startDate,
      endDate,
    });

    await stop.save();
    trip.stops.push(stop._id);
    await trip.save();

    res.status(201).json(stop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStop = async (req, res) => {
  try {
    const { tripId, stopId } = req.params;

    const trip = await Trip.findById(tripId);
    if (trip.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Stop.findByIdAndDelete(stopId);
    trip.stops = trip.stops.filter((s) => s.toString() !== stopId);
    await trip.save();

    res.status(200).json({ message: 'Stop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addActivityToStop = async (req, res) => {
  try {
    const { tripId, stopId, activityId } = req.params;

    const trip = await Trip.findById(tripId);
    if (trip.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const stop = await Stop.findById(stopId);
    if (!stop.activities.includes(activityId)) {
      stop.activities.push(activityId);
      await stop.save();
    }

    const updatedStop = await Stop.findById(stopId).populate('activities');
    res.status(200).json(updatedStop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeActivityFromStop = async (req, res) => {
  try {
    const { tripId, stopId, activityId } = req.params;

    const trip = await Trip.findById(tripId);
    if (trip.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const stop = await Stop.findById(stopId);
    stop.activities = stop.activities.filter((a) => a.toString() !== activityId);
    await stop.save();

    const updatedStop = await Stop.findById(stopId).populate('activities');
    res.status(200).json(updatedStop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
