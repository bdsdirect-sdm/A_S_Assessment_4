import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './route/userRouter';
import sequelize from './config/db';

const app = express();
const PORT = process.env.PORT || 5000;
app.use('/uploads', express.static('uploads'))
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', userRoutes);

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized\n\n ');
  })
  .catch((err:any) => {
    console.error('Database synchronization failed:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
