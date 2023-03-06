import { columnController } from '@/controllers/column.controller';
import { validate } from '@/middlewares/validate.middleware';
import { createColumnValidator } from '@/validators/column.validator';
import { Router } from 'express';

export const columnRouter = Router();

columnRouter.get('/', columnController.findAll);
columnRouter.post('/create', validate(createColumnValidator), columnController.create);
columnRouter.put('/:columnId', columnController.updateById);
columnRouter.delete('/', columnController.deleteAll);
columnRouter.delete('/:columnId', columnController.deleteById);
