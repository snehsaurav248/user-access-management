// import 'dotenv/config';
import app from './app';
import AppDataSource from './config/database';
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully.');
    console.log('JWT_SECRET:', process.env.JWT_SECRET);


    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Database connection failed:', error);
  });
