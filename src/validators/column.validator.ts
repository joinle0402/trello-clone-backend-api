import { Column } from '@/models/column.model';
import { checkSchema, ValidationChain } from 'express-validator';

export const createColumnValidator: ValidationChain[] = checkSchema({
    title: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Column title is required',
            bail: true,
        },
        custom: {
            options: (value, { req }) => {
                return Column.find({
                    title: value,
                    boardId: req.body.boardId,
                }).then(board => {
                    if (board.length > 0) {
                        return Promise.reject('Column title already in use');
                    }
                });
            },
        },
    },
    board: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Board id is required',
        },
    },
});
