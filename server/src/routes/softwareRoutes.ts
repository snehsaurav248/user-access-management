import { Router } from 'express';
import { createSoftware, getSoftwareList } from '../controllers/softwareController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Only Admin can create software
router.post('/', authMiddleware(['Admin', 'Manager', 'Employee']), createSoftware);

// Anyone authenticated can get software list
router.get('/', authMiddleware(), getSoftwareList);

export default router;
