import express from 'express';
import mongoose from 'mongoose';
import configs from '@/configs/configs';
import { boardRouter } from '@/routes/board.route';

mongoose
    .connect(configs.database.url)
    .then(() => console.log('Successfully connected to the database'))
    .then(() => {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/api/v1/boards', boardRouter);

        app.listen(configs.server.port, () => {
            console.log(`server started at http://localhost:${configs.server.port}`);
        });
    })
    .catch(error => {
        console.log({ error });
        process.exit(1);
    });
