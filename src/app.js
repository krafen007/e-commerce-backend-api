import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import cartRoute from './routes/cartRoute.js';
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import errorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware.js';
import ApiErrorHandler from './utils/ApiErrorHandler.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
if (process.env.NODE_DEV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/users', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);

// Handle undefined routes (404 Not Found)
app.use((req, res, next) => {
    next(new ApiErrorHandler(`The route ${req.originalUrl} does not exist`, 404));
});

// Error Handler
app.use(errorHandlerMiddleware);

export default app;
