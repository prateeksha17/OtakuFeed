import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

// Configuring CORS middleware
app.use(cors({
  origin: ["https://otaku-feed-front.vercel.app"],
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true
}));

app.options("",cors());
app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Handling preflight requests

app.options('/*', (_, res) => {
    res.sendStatus(200);
});

const CONNECTION_URL = 'mongodb+srv://prateekshapandey8177:everything_sucks@cluster0.oj4pf3v.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch(err => console.log(err.message));

export default app;
