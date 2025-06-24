// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}

let cached = (global).mongoose;

if (!cached) {
    cached = (global).mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
    if (cached.conn) {
        console.log("✅ Using cached DB connection");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("🌐 Connecting to MongoDB URI...");
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                bufferCommands: false,
                dbName: "shopnow", // optional but recommended
            })
            .then((mongoose) => {
                console.log("✅ MongoDB connected");
                return mongoose;
            })
            .catch((err) => {
                console.error("❌ MongoDB connection error:", err);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
