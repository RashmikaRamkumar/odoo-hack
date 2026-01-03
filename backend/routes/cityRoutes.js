import express from 'express';
import {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
} from '../controllers/cityController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllCities);
router.get('/:id', getCityById);
router.post('/', authenticateToken, createCity);
router.put('/:id', authenticateToken, updateCity);
router.delete('/:id', authenticateToken, deleteCity);

export default router;
