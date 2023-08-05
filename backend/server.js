// https://youtu.be/GyzC-30Bqfc
// https://youtu.be/NzROCbkvIE0 
// app.js or server.js
// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const User = require('./routes/user');

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db.js';
import User from './routes/user.js';
import Transaction from './routes/transaction.js';
import Registrant from './routes/registrant.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;
connectDB();

const app = express();


app.use(cors());


app.use(express.json());

app.use(User);
app.use(Transaction);

app.use(Registrant);
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
