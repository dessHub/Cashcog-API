import express from "express";
import 'dotenv/config';
import logger from 'morgan';
import bodyParser from "body-parser";
import helmet from "helmet";
import cron from 'node-cron';
import cors from 'cors';
import connectToDb, { clearDatabase } from './db/connect';
import router from './routes';
import { listenToNewExpense } from './utils';


const app = express();

connectToDb();

// Fetch and creates new expense every 12 hours
cron.schedule('* */12 * * *', () => {
  listenToNewExpense();
})

app.use(cors())
app.use(helmet())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.use("*", (req, res) => res.send("This is expenses management API, refer to readme on how to use."));

module.exports = app;
