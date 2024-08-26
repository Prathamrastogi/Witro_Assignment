import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Could not connect to MongoDB Atlas', err);
    }
};

export default connectToDatabase;
