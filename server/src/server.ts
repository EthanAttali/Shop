import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/products.routes';

const app = express();
app.use(express.json());

const corsParameters = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}

app.use(cors(corsParameters))
// app.use(express.static(path.resolve(__dirname, "client/build")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true }))
app.use(cookieParser())

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));