import mongoose from 'mongoose';

export default class DatabaseClient {
    async connect(): Promise<void> {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI is not set in .env');
        }
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    }

    async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}
