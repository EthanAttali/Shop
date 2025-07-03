import { Router } from "express";
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
// router.put('/update', userController.updateUser);
router.put('/update-info', userController.updateUser)

export default router;