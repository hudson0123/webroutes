import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

async function testConnection() {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.error("Connection failed:", error.message);
    } finally {
        await client.close();
    }
}

testConnection();
