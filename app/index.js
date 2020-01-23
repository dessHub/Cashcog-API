import express from "express";
import 'dotenv/config';
import logger from 'morgan';
import bodyParser from "body-parser";
import helmet from "helmet";


const app = express();

app.use(helmet())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("*", (req, res) => res.send("This is expenses management API, refer to readme on how to use."));

module.exports = app;
