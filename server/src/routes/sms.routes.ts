import { Router } from "express";
import * as smsController from '../controllers/sms.controller';

const router = Router();

router.get('/send-code', smsController.sendCode);
router.post('/check-code', smsController.checkCode)
export default router;