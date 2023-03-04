import { cardController } from '@/controllers/card.controller';
import { validate } from '@/middlewares/validate.middleware';
import { createCardValidator } from '@/validators/card.validator';
import { Router } from 'express';

export const cardRouter = Router();

cardRouter.get('/', cardController.findAll);
cardRouter.post('/create', validate(createCardValidator), cardController.create);
cardRouter.delete('/', cardController.deleteAll);
