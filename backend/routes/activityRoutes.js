import express from 'express';
import {
  getActivitiesByCity,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activityController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/city/:cityId', getActivitiesByCity);
router.get('/:id', getActivityById);
router.post('/', authenticateToken, createActivity);
router.put('/:id', authenticateToken, updateActivity);
router.delete('/:id', authenticateToken, deleteActivity);

export default router;
