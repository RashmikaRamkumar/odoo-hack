import express from 'express';
import {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  addStopToTrip,
  deleteStop,
  addActivityToStop,
  removeActivityFromStop,
} from '../controllers/tripController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAllTrips);
router.post('/', authenticateToken, createTrip);
router.get('/:id', authenticateToken, getTripById);
router.put('/:id', authenticateToken, updateTrip);
router.delete('/:id', authenticateToken, deleteTrip);

router.post('/:tripId/stops', authenticateToken, addStopToTrip);
router.delete('/:tripId/stops/:stopId', authenticateToken, deleteStop);

router.post('/:tripId/stops/:stopId/activities/:activityId', authenticateToken, addActivityToStop);
router.delete('/:tripId/stops/:stopId/activities/:activityId', authenticateToken, removeActivityFromStop);

export default router;
