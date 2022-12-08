import express, { Router } from 'express';
import controller from '../controllers/user';

const router = express.Router();

//router.get('/get/users', controller.getAllUsers);
router.post('/signup', controller.signUpUser);
router.post('/login', controller.loginAsUser);

export default router;
