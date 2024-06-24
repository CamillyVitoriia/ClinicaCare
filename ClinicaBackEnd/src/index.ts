import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

const app = express();

mongoose.connect('mongodb+srv://kelvenFontes:kelven@clinicacare.uym1kev.mongodb.net/')
  .then(() => {
    const port = 3000;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    app.use(express.json());
    app.use(router);

  })
  .catch(() => console.log('erro ao se conectar ao mongoDB'));


