import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Ensure that global mongoose cache is set up properly
let globalWithMongoose = global as typeof global & { mongoose: MongooseConnection };

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
}

let cached = globalWithMongoose.mongoose;

export const connectToDatabase = async (): Promise<Mongoose> => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URL) {
        throw new Error('MONGODB_URL is not set');
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, { dbName: 'imagineai', bufferCommands: false });
    }

    cached.conn = await cached.promise;

    return cached.conn;
}




{/*
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URL) {
        throw new Error('MONGODB_URL is not set');
    }

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { dbName: 'imagineai', bufferCommands: false});

    cached.conn = await cached.promise;

    return cached.conn;
}
*/}