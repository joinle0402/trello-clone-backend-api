import { boardController } from '@/controllers/board.controller';
import { validate } from '@/middlewares/validate.middleware';
import { createBoardValidator } from '@/validators/board.validator';
import { Router } from 'express';

export const boardRouter = Router();

boardRouter.get('/', boardController.findAll);
boardRouter.post('/create', validate(createBoardValidator), boardController.create);
boardRouter.delete('/', boardController.deleteAll);
