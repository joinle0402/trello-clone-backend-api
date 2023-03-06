import { boardController } from '@/controllers/board.controller';
import { validate } from '@/middlewares/validate.middleware';
import { createBoardValidator } from '@/validators/board.validator';
import { Router } from 'express';

export const boardRouter = Router();

boardRouter.get('/', boardController.findAll);
boardRouter.get('/:boardId', boardController.findOne);
boardRouter.post('/create', validate(createBoardValidator), boardController.create);
boardRouter.put('/:boardId', boardController.updateById);
boardRouter.delete('/', boardController.deleteAll);
