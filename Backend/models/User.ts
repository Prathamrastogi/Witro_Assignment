import { Schema, model, Document } from 'mongoose';

// Define an interface for the User document
interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contactMode: 'email' | 'phone';
    otp?: string;
    otpExpires?: Date;
    isVerified: boolean;
}

// Create a Mongoose schema based on the IUser interface
const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactMode: { type: String, enum: ['email', 'phone'], default: 'email' },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
});

// Export the model with the IUser interface
const User = model<IUser>('User', userSchema);
export default User;
