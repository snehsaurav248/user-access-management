// src/routes/requestRoutes.ts
import { Router } from 'express';
import {
  submitRequest,
  getPendingRequests,
  updateRequestStatus,
} from '../controllers/requestController';

import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware('Employees'), submitRequest);
router.get('/', authMiddleware(['Manager', 'Admin']), getPendingRequests);
router.patch('/:id', authMiddleware(['Manager', 'Admin']), updateRequestStatus);

export default router;
