import { Router } from 'express';
import { DutyController } from '../controllers/DutyController';

const router = Router();
const dutyController = new DutyController();

router.get('/duties', dutyController.getAllDuties);
router.get('/duties/:id', dutyController.getDutyById);
router.post('/duties', dutyController.createDuty);
router.put('/duties/:id', dutyController.updateDuty);
router.delete('/duties/:id', dutyController.deleteDuty);

export default router;
