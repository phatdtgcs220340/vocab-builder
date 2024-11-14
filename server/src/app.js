import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.API_GATEWAY_URL,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));

app.get('/', async (req, res) => {
    res.send('Hello from User Service');
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Vocab Builder DB Connected'))
    .catch(err => console.log(err));


app.listen(4001, () => {
    console.log('Server running on port 4001');
});