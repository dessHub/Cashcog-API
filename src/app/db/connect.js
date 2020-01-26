import mongoose from 'mongoose';
 import dotenv from 'dotenv';
 const { MongoMemoryServer } = require('mongodb-memory-server');
 
 const mongod = new MongoMemoryServer();
 
 dotenv.config();

const connectToDb = async () => {

    let dbURL = process.env.MONGODB_URI
    const testUri = await mongod.getConnectionString();
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };
 
    try {
        if (process.env.NODE_ENV === 'test') {
            /**
             * Connect to the in-memory database.
             */
            await mongoose.connect(testUri, mongooseOpts);
        } else {
            await mongoose.connect(dbURL, mongooseOpts);
        }
        console.log('Connected to mongo!!!');
    }
    catch (err) {
        console.log('Could not connect to MongoDB', err);
    }
}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

export default connectToDb;