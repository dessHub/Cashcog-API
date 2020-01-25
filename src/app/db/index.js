import mongoose from 'mongoose';
 import dotenv from 'dotenv';
 
 dotenv.config();

const connectToDb = () => {

    let dbHost = process.env.DATABASE_HOST;
    let dbPort = process.env.DATABASE_PORT;
    let dbName = process.env.DATABASE;
    if (process.env.NODE_ENV !== 'test') {
        dbName = process.env.TEST_DATABASE;
    }
    
    try {
        mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
            useNewUrlParser: true,
            useFindAndModify: false
        });
        console.log('Connected to mongo!!!');
    }
    catch (err) {
        console.log('Could not connect to MongoDB');
    }
}

export default connectToDb;