import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import expressJWT from 'express-jwt';
import 'dotenv/config';
import 'colors';

/**************** Routes Import ***************/
import userRoutes from './src/routes/user';
import productRoutes from './src/routes/product';
import categoryRoutes from './src/routes/category';
import orderRoutes from './src/routes/order';

import connectDB from './src/config/db.config';
import errorHandler from './src/middlewares/errorHandler';
import verifyToken from './src/middlewares/verifyToken';

const app = express();
const {
  PORT = 3000,
  API_URL,
  NODE_ENV = 'development',
  MONGODB_URI,
  SECRET_KEY,
} = process.env;
const corsHandler = cors();

/**************** Middleware Usage ******************/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan(
    // eslint-disable-next-line max-len
    '":method :url HTTP/:http-version" :status :res[content-length] :remote-addr - :remote-user [:date[clf]]'
      .green.italic.bold,
    {
      skip: (req, res) => NODE_ENV === 'production' && res.statusCode < 400,
    }
  )
);
app.use(corsHandler);
app.options('*', corsHandler);
app.use(verifyToken());
app.use('/public', express.static(__dirname + '/public'));

connectDB(MONGODB_URI);

/************ Routes Usage **********/
app.use(`${API_URL}/users`, userRoutes);
app.use(`${API_URL}/products`, productRoutes);
app.use(`${API_URL}/categories`, categoryRoutes);
app.use(`${API_URL}/orders`, orderRoutes);

app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${NODE_ENV} mode at http://localhost:${PORT}${API_URL}`
      .yellow.bold
  )
);

process.on('unhandledRejection', (error) => {
  console.log(`${error.name}: ${error.message}`.bgRed.black);
  server.close(() => process.exit(1));
});
