import { Router } from 'express';
import { register, verifyOtp, resetPassword, login, getUserInfo } from '../controllers/authController'; // Named imports
import auth from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', auth, resetPassword);
router.post('/login', login);
router.get('/user', auth, getUserInfo);

export default router;
