import express from 'express';
import mongoose from 'mongoose';
import configs from '@/configs/configs';
import { boardRouter } from '@/routes/board.route';
import { columnRouter } from '@/routes/column.route';
import { cardRouter } from '@/routes/card.route';

mongoose
    .connect(configs.database.url)
    .then(connection => {
        console.log('Successfully connected to the database');
    })
    .then(() => {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/api/v1/boards', boardRouter);
        app.use('/api/v1/columns', columnRouter);
        app.use('/api/v1/cards', cardRouter);

        app.listen(configs.server.port, () => {
            console.log(`server started at http://localhost:${configs.server.port}`);
        });
    })
    .catch(error => {
        console.log({ error });
        process.exit(1);
    });
