import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import userRoutes from './routes/user';
import productRoutes from './routes/product';
import categoryRoutes from './routes/category';
import orderRoutes from './routes/order';

const app = express();
const corsHandler = cors();

/*********** Middleware ********/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(corsHandler);
app.options('*', corsHandler);

const { PORT = 3000, API_URL, MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connection Successfully'))
  .catch((error) => console.error(`Database Connection Failed: ${error}`));

/************ Routes **********/
app.use(`${API_URL}/users  `, userRoutes);
app.use(`${API_URL}/products`, productRoutes);
app.use(`${API_URL}/categories`, categoryRoutes);
app.use(`${API_URL}/orders`, orderRoutes);

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}${API_URL}`)
);
