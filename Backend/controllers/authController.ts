import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User'; 
import sendEmail from '../utils/sendEmail';

// Type definitions for request body
interface RegisterBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contactMode: string;
}

interface VerifyOtpBody {
    email: string;
    otp: string;
}

interface ResetPasswordBody {
    currentPassword: string;
    newPassword: string;
}

interface LoginBody {
    email: string;
    password: string;
}

// Extending Request to include user
interface AuthenticatedRequest extends Request {
    user?: { userId: string };
}

// Register
export const register = async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, password, contactMode } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: 'User with this email already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactMode,
            otp,
            otpExpires,
        });

        await user.save();

        console.log('User saved successfully:', user);

        try {
            await sendEmail(email, 'Verification OTP', `Your OTP for registration is: ${otp}`);
            res.status(201).json({ message: 'User registered. Please check your email for OTP.' });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            res.status(201).json({ message: 'User registered but failed to send OTP email. Please contact support.' });
        }
    } catch (error: any) {
        console.error('Registration error:', error);
        if (error.code === 11000) {
            res.status(400).json({ message: 'User with this email already exists' });
            return;
        }
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Verify OTP
export const verifyOtp = async (req: Request<{}, {}, VerifyOtpBody>, res: Response): Promise<void> => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        if (user.otp !== otp || user.otpExpires && user.otpExpires < new Date()) {
            res.status(400).json({ message: 'Invalid or expired OTP' });
            return;
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(200).json({ message: 'OTP verified successfully', token });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Server error during OTP verification' });
    }
};

// Reset Password
export const resetPassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'User not authenticated' });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Current password is incorrect' });
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Server error during password reset' });
    }
};

// Login
export const login = async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        if (!user.isVerified) {
            res.status(400).json({ message: 'Please verify your email first' });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Get User Info
export const getUserInfo = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.userId).select('-password -otp -otpExpires');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Get user info error:', error);
        res.status(500).json({ message: 'Server error while fetching user info' });
    }
};
