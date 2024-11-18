import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from 'cors'
import router from '../api/routes/vocab-builder.route.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URI,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));

app.use('/api', router);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Vocab Builder DB Connected'))
    .catch(err => console.log(err));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});